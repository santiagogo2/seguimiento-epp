// Imports necesarios para el funcionamiento del servicio
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { global } from '../global';

@Injectable()
export class UserService{
	public url: string;
	public token: string;
	public identity: any;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	signup(user, gettoken=null): Observable<any>{
		if(gettoken != null){
			user.gettoken = 'true';
		}

		let json = JSON.stringify(user);
		let params = "json=" + json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + 'login', params, {headers:headers});
	}

	list(token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get(this.url + 'users', {headers:headers});
	}

	getUser(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get(this.url + 'users/' + id, {headers: headers});
	}

	newUser(user, token): Observable<any>{
		let json = JSON.stringify(user);
		let params = "json=" + json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.post(this.url + 'users', params, {headers:headers});
	}

	updateUser(user, token): Observable<any>{
		let json = JSON.stringify(user);
		let params = "json=" + json;
		let id = user.id;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.put(this.url + 'users/' + id, params, {headers:headers});
	}

	updatePassword(id, token, user): Observable<any>{
		let json = JSON.stringify(user);
		let params = "json=" + json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.put(this.url + 'users/update/password/' + id, params, {headers:headers});
	}

	deleteUser(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.delete(this.url + 'users/' + id, {headers:headers});
	}

	getToken(){
		let token = localStorage.getItem('CDUtoken');

		if(token && token != 'undefined'){
			this.token = token;
		} else{
			this.token = null;
		}
		return this.token;
	}

	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('CDUidentity'));

		if(identity && identity != 'undefined'){
			this.identity = identity;
		} else{
			this.identity = null;
		}
		return this.identity;
	}

	sendEmail(emailParams): Observable<any>{
		let json = JSON.stringify(emailParams);
		let params = "json=" + json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + 'documents/sendemail/send', params, {headers:headers});
	}
}