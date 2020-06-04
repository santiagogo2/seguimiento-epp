import { Component, OnInit } from '@angular/core';
import { Email } from '../../../models/email';
import { UserService } from '../../../services/user.service';

@Component({
	selector: 'app-user-request',
	templateUrl: './user-request.component.html',
	styleUrls: ['./user-request.component.css'],
	providers: [UserService]
})
export class UserRequestComponent implements OnInit {
	public page_title: string;
	public emailParams: Email;
	public status: string;
	public errorCode: number;
	public errorMessage: string;
	public successMessage: string;
	public flag: number;

	constructor(
		private _userService: UserService
	) {
		this.page_title = 'Solicitar Acceso o Recordar Contraseña';
		this.emailParams = new Email(null,'','','','');
	}

	ngOnInit() {
	}

	onSubmit(form){
		this.flag = 1;
		this._userService.sendEmail(this.emailParams).subscribe(
			response => {
				if(response.status == 'success'){
					this.flag = 2;
					this.status = 'success';
					this.successMessage = response.message;
					form.reset();
				}
			},
			error => {				
				this.status = 'error';
				this.errorCode = error.error.code;
				this.errorMessage = error.error.message;
				if(error.status && error.status == 500) this.errorCode = 500;
				this.flag = 2;
				console.log(<any>error);
			}
		);
	}

}
