import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { IncomeRecord } from '../../models/incomeRecord';
import { IncomeRecordService, UserService } from '../../services/services.index';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	providers: [
		UserService,
		IncomeRecordService
	]
})
export class LoginComponent implements OnInit {
	public page_title: string;
	public user: User;
	public incomeRecord: IncomeRecord;
	public status: string;
	public token: string;
	public identity: any;
	public errorCode: number;
	public errorMessage: string;
	public flag: number;
	public captchaFlag: boolean;

	constructor(
		private _userService: UserService,
		private _incomeRecordService: IncomeRecordService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.page_title = "Login";
		this.user = new User(1,'',0,'','','','');
		this.incomeRecord = new IncomeRecord(1,'',null);
		this.captchaFlag = false; // Al validar el sitio se debe cambiar a false
		this.identity = this._userService.getIdentity();
	}

	ngOnInit() {
		// Se ejecuta siempre que se inicia el componente pero unicamente cierra sesión cuando le llega el parametro por el url
		this.logout();
		if(this.identity) {
			this._router.navigate(['/inicio']);
		}
	}

	onSubmit(form){
		this.flag = 1;
		this.errorCode = undefined;
		this.status = undefined;
		this._userService.signup(this.user).subscribe(
			response => {
				if(response.status == 'success'){
					this.token = response.token;
					// Datos del usuario
					this._userService.signup(this.user, true).subscribe(
						response => {
							if(response.status == 'success'){
								this.identity = response.identity;
								this.incomeRecord.user = this.identity.user_alias;
								this._incomeRecordService.newIncomeRecord(this.incomeRecord).subscribe(
									response => {
										if(response.status == 'success'){
											this.flag = 2;

											//Persistir los datos del usuario identificado
											localStorage.setItem('token', this.token);
											localStorage.setItem('identity', JSON.stringify(this.identity));
											let expirationTime = (12*60*60*1000) + new Date().getTime();
											localStorage.setItem('expiration', expirationTime.toString());

											form.reset();
											this._router.navigate(['/documentos/listar-documentos']);
										} else{
											this.status = 'error';
											this.errorCode = response.code;
											this.errorMessage = response.message;											
										}
									},
									error => {
										form.reset();
										this.flag = 2;
										this.status = 'error';
										this.errorCode = error.error.code;
										this.errorMessage = error.error.message;
										if(error.status && error.status == 500) this.errorCode = 500;
										console.log(<any>error);
									}
								);
							} else{
								this.status = 'error';
								this.errorCode = response.code;
								this.errorMessage = response.message;
							}
						},
						error => {
							form.reset();
							this.flag = 2;
							this.status = 'error';
							this.errorCode = error.error.code;
							this.errorMessage = error.error.message;
							if(error.status && error.status == 500) this.errorCode = 500;
							console.log(<any>error);
						}
					);
				} else{
					this.status = 'error';
					this.errorCode = response.code;
					this.errorMessage = response.message;
				}					
			},
			error => {
				form.reset();
				this.flag = 2;
				this.status = 'error';
				this.errorCode = error.error.code;
				this.errorMessage = error.error.message;
				if(error.status && error.status == 500) this.errorCode = 500;
				if(error.statusText && error.statusText == 'Unknown Error'){
					this.errorCode = 503;
					this.errorMessage = 'Ha ocurrido un problema con el servidor. Porfavor comuniquese con el Soporte Técnico o intentelo mas tarde.'
				}				
				console.log(<any>error);
			}
		);
	}

	logout(){
		this._route.params.subscribe(params => {
			let logout = +params['sure'];

			if(logout == 1){
				localStorage.removeItem('token');
				localStorage.removeItem('identity');
				localStorage.removeItem('expiration');

				//Eliminar las variables token e identity
				this.token = null;
				this.identity = null;

				//Redirección al inicio
				this._router.navigate(['login']);
			}
		});
	}

	resolved(captchaResponse: string) {
		this.captchaFlag = true;
        //console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
}
