import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { FolderService } from '../../../services/folder.service';

@Component({
	selector: 'app-folder-edit',
	templateUrl: './folder-edit.component.html',
	styleUrls: ['./folder-edit.component.css'],
	providers: [
		UserService,
		FolderService
	]
})
export class FolderEditComponent implements OnInit {
	public page_title: string;
	public token: string;
	public identity: string;
	public folder: any[];
	public folderId: number;
	public status: string;
	public errorCode: number;
	public errorMessage: string;
	public successMessage: string;
	public preFolders: any[];

	constructor(
		private _userService: UserService,
		private _folderService: FolderService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.page_title = 'Editar Carpeta';
		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

	ngOnInit() {
		this.folderList();
		this.getFolder();
	}

	onSubmit(){
		this.status = null;
		this.errorCode = null;
		this._folderService.editFolder(this.token, this.folder, this.folderId).subscribe(
			response => {
				if(response.status == 'success'){
					this.status = 'success';
					this.successMessage = response.message;
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

	getFolder(){
		this._route.params.subscribe(
			params => {
				// Obtener el id de la URL
				this.folderId = +params['id'];

				// Obtener los datos de la carpeta a editar
				this._folderService.getFolder(this.token, this.folderId).subscribe(
					response => {
						if(response.status == 'success'){
							this.folder = response.folder;
							this.errorCode = null;
						}
					},
					error => {
						this.folder = null;
						this.status = 'error';
						this.errorCode = error.error.code;
						this.errorMessage = error.error.message;
						if(error.status && error.status == 500) this.errorCode = 500;
						console.log(<any>error);
					}
				);
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
