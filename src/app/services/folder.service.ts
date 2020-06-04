// Imports necesarios para el funcionamiento del servicio
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class FolderService{
	public url: string;
	public token: string;
	public identity: any;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	list(token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get(this.url + 'folder', {headers:headers});
	}

	getFolder(token, id): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get(this.url + 'folder/' + id, {headers:headers});
	}

	getFolderByFolderId(token, folder_id=null): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get(this.url + 'folder/get-folder-by-folder-id/' + folder_id, {headers:headers});
	}

	newFolder(token, folder): Observable<any>{
		let json = JSON.stringify(folder);
		let params = 'json=' + json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.post(this.url + 'folder', params, {headers:headers});
	}

	editFolder(token, folder, id): Observable<any>{
		let json = JSON.stringify(folder);
		let params = 'json=' + json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.put(this.url + 'folder/' + id, params, {headers:headers});
	}

	deleteFolder(token, id): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.delete(this.url + 'folder/' + id, {headers:headers});
	}
}