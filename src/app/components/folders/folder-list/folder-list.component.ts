import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FolderService } from '../../../services/folder.service';

@Component({
	selector: 'app-folder-list',
	templateUrl: './folder-list.component.html',
	styleUrls: ['./folder-list.component.css'],
	providers: [
		UserService,
		FolderService
	]
})
export class FolderListComponent implements OnInit {
	public page_title: string;
	public token: string;
	public identity: any;
	public status: string;
	public errorCode: number;
	public errorMessage: string;
	public folders: any[];
	public actualPage: number;
	public itemsPerPage: number;

	constructor(
		private _userService: UserService,
		private _folderService: FolderService
	) {
		this.page_title = 'Lista de Carpetas';
		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
		this.actualPage = 1;
		this.itemsPerPage = 20;
	}

	ngOnInit() {
		this.list();
	}

	list(){
		this._folderService.list(this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.folders = response.folders;
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

	deleteFolder(id){
		this._folderService.deleteFolder(this.token, id).subscribe(
			response => {
				if(response.status == 'success'){
					this.list();
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

	pageChange(event){
		this.actualPage = event;
	}

	folderValidation(folder){
		if(folder.documents.length > 0) {
			return false;
		} else{
			console.log(folder.id, folder.name);
			for(let i=0; i < this.folders.length; i++){
				if(folder.id == this.folders[i].folder_id) {
					i = this.folders.length;
					return false;
				}
			}
			return true;
		}
	}
}
