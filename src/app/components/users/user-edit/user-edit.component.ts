import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/services.index';

@Component({
	selector: 'app-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.css'],
	providers: [UserService]
})
export class UserEditComponent implements OnInit {
	public page_title: string;
	public token: string;
	public identity: any;
	public user: any;
	public userId: number;
	public status: string;
	public errorCode: number;
	public errorMessage: string;
	public successMessage: string;

	constructor(
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.page_title = 'Editar el usuario: ';
		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

	ngOnInit() {
		this.getUser();
	}

	getUser(){
		this._route.params.subscribe(
			params => {
				// Obtener el id de la url
				this.userId = +params['id'];

				// Obtener los datos del usuario
				this._userService.getUser(this.userId, this.token).subscribe(
					response => {
						if(response.status == 'success'){
							this.user = response.user;
						} else{
							this.status = 'error';
							this.errorCode = response.error;
							this.errorMessage = response.message;
						}
					},
					error => {
						this.status = 'error';
						this.errorCode = error.error.code;
						this.errorMessage = error.error.message;
						if(error.status && error.status == 500) this.errorCode = 500;
						console.log(<any>error);
					}
				);
			}
		);
	}

	onSubmit(){
		this.user.user_type = +this.user.user_type;
		this._userService.updateUser(this.user, this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.status = 'success';
					this.successMessage = response.message;
				} else{
					this.status = 'error';
					this.errorCode = response.code;
					this.errorMessage = response.message;
				}
			},
			error => {
				console.log(<any>error);
				this.status = 'error';
				this.errorCode = error.error.code;
				this.errorMessage = error.error.message;
				if(error.status && error.status == 500) this.errorCode = 500;
			}
		);
	}

}
