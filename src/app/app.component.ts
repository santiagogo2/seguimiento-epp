import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from './services/services.index';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styles: [],
	providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
	public title: string;
	public token: string;
	public identity: any;

	constructor(
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute
	){
		this.title = "Cuarto de Datos";
	}

	ngOnInit(){
		this.loadUser();		
	}

	ngDoCheck(){
		this.loadUser();
	}

	loadUser(){
		let actualDate = new Date().getTime();
		let expiresDate = +localStorage.getItem('CDUexpiration');
		if( expiresDate && actualDate >= expiresDate ){
			localStorage.removeItem('CDUtoken');
			localStorage.removeItem('CDUidentity');
			localStorage.removeItem('CDUexpiration');

			this.token = null;
			this.identity = null;

			this._router.navigate(['login']);
		} else{
			this.token = this._userService.getToken();
			this.identity = this._userService.getIdentity();
		}
	}
}
