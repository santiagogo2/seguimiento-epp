// Imports necesarios para el funcionamiento del servicio
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { global } from '../global';

@Injectable()
export class DocumentsService{
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
		return this._http.get(this.url + 'documents', {headers:headers});
	}

	getDocument(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get(this.url + 'documents/' + id, {headers: headers});
	}

	getDocumentByWord(word, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get(this.url + 'documents/search/word/' + word, {headers: headers});
	}

	getDocumentByFolder(folder, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get(this.url + 'documents/search/folder/' + folder, {headers:headers});
	}

	newDocument(document, token): Observable<any>{
		let json = JSON.stringify(document);
		let params = "json=" + json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.post(this.url + 'documents', params, {headers:headers});
	}

	deleteDocument(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.delete(this.url + 'documents/' + id, {headers:headers});
	}

	deleteFile(filename, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.delete(this.url + 'documents/delete-file/' + filename, {headers:headers});
	}
}