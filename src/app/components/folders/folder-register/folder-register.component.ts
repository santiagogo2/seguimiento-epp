import { Component, OnInit } from '@angular/core';
import { Folder } from '../../../models/folder';
import { FolderService, UserService } from '../../../services/services.index';

@Component({
	selector: 'app-folder-register',
	templateUrl: './folder-register.component.html',
	styleUrls: ['./folder-register.component.css'],
	providers: [
		UserService,
		FolderService
	]
})
export class FolderRegisterComponent implements OnInit {
	public page_title: string;
	public token: string;
	public identity: any;
	public folder: Folder;
	public status: string;
	public errorCode: number;
	public errorMessage: string;
	public successMessage: string;
	public preFolders: any[];

	constructor(
		private _userService: UserService,
		private _folderService: FolderService
	) {
		this.page_title = 'Crear Carpeta';
		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
		this.folder = new Folder(1,'',null);
	}

	ngOnInit() {
		this.folderList();
	}

	onSubmit(form){
		this.folder.name = this.folder.name.toUpperCase();
		this._folderService.newFolder(this.token, this.folder).subscribe(
			response => {
				if(response.status == 'success'){
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
				console.log(<any>error);
			}
		);
	}

	folderList(){
		this._folderService.list(this.token).subscribe(
			response => {
				this.preFolders = response.folders;
			},
			error => {
				console.log(<any>error);
			}
		);
	}

}
