import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css'],
	providers: [UserService]
})
export class UserListComponent implements OnInit {
	public page_title: string;
	public token: string;
	public identity: any;
	public status: string;
	public errorCode: number;
	public errorMessage: string;
	public deleteStatus: string;
	public deleteMessage: string;
	public users: any[];
	public actualPage: number;
	public itemsPerPage: number;

	constructor(
		private _userService: UserService,
		private _router: Router
	) {
		this.page_title = 'Lista de Usuarios'
		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
		this.actualPage = 1;
		this.itemsPerPage = 20;
	}

	ngOnInit() {
		this.list();
	}

	list(){
		this.status = undefined;
		this.errorCode = undefined;
		this.errorMessage = undefined;
		if(this.identity.role != 'ROLE_SUPER_ADMIN') this._router.navigate(['inicio']);
		this._userService.list(this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.status = 'success';
					this.users = response.users;
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

	deleteUser(id){
		this.deleteStatus = undefined;
		this.deleteMessage = undefined;
		this._userService.deleteUser(id, this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.deleteStatus = 'success';
					this.deleteMessage = response.message;
					this.list();
				} else{
					this.deleteStatus = 'error';
					this.errorMessage = response.message;
				}
			},
			error => {
				console.log(<any>error);
				this.deleteStatus = 'error';
				this.deleteMessage = error.error.message;	
			}
		);
	}

	pageChange(event){
		this.actualPage = event;
	}
}
