import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class LoginGuard implements CanActivate{
	public identity: any;
	
	constructor(
		private _router: Router,
		private _userService: UserService
	){}

	canActivate(){
		let identity = this._userService.getIdentity();
		
		if (identity){
			this._router.navigate(['/inicio']);
			return false;
		} else{
			return true;
		}
	}
}