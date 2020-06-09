import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class IdentityGuard implements CanActivate{
	public identity: any;

	constructor(
		private _router: Router,
		private _userService: UserService
	){}

	canActivate(){
		let identity = this._userService.getIdentity();

		if (identity){
			return true;
		} else{
			this._router.navigate(['/login']);
			return false;
		}
	}
}