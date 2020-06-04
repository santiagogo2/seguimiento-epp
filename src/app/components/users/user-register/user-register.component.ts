import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
	selector: 'app-user-register',
	templateUrl: './user-register.component.html',
	styleUrls: ['./user-register.component.css'],
	providers: [UserService]
})
export class UserRegisterComponent implements OnInit {
	public page_title: string;
	public token: string;
	public identity: any;
	public user: User;
	public status: string;
	public errorCode: number;
	public errorMessage: string;
	public successMessage: string;
	public passwordConfirmation: string;

	constructor(
		private _userService: UserService,
	) {
		this.page_title = 'Agregar un nuevo usuario';
		this.user = new User(1,'',null,'','','','');
		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

	ngOnInit() {
	}

	onSubmit(form){
		this.user.user_type = +this.user.user_type;
		this._userService.newUser(this.user, this.token).subscribe(
			response => {
				if(response.status == 'success'){
					form.reset();
					this.status = 'success';
					this.successMessage = response.message;
				} else{
					this.status = 'error';
					this.errorCode = response.code;
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
}
