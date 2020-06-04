import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { DocumentsService } from '../../../services/documents.service';
import { IncomeRecordService } from '../../../services/incomeRecord.service';
import { FolderService } from '../../../services/folder.service';
import { IncomeRecord } from '../../../models/incomeRecord';
import { global } from '../../../services/global';

@Component({
	selector: 'app-document-list',
	templateUrl: './document-list.component.html',
	styleUrls: ['./document-list.component.css'],
	providers: [
		UserService,
		DocumentsService,
		IncomeRecordService,
		FolderService
	]
})
export class DocumentListComponent implements OnInit {
	public page_title1: string;
	public page_title2: string;
	public token: string;
	public identity: any;
	public documents: any[];
	public status: string;
	public errorCode: number;
	public errorMessage: string;
	public actualPage: number;
	public itemsPerPage: number;
	public documentUrl: string;
	public searchBy: string;
	public idDocument: number;
	public panelShow: number;
	public inputWordDocument: string;
	public incomeRecord: IncomeRecord;
	public folders: any[];
	public flag: number;
	public foldersIn: any[]; 
	public folderFlag: number;
	public actualFolder: number;
	public idAnterior: number;
	public lastTitle: string;
	public breadcrumbs: any[];
	public breadString: string;

	constructor(
		private _userService: UserService,
		private _documentsService: DocumentsService,
		private _incomeRecordService: IncomeRecordService,
		private _folderService: FolderService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.page_title1 = 'Listado de Documentos Cargados';
		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
		this.documentUrl = global.urlFile;
		this.actualPage = 1;
		this.itemsPerPage = 20;
		this.incomeRecord = new IncomeRecord(1,'',null);
		this.flag = 1;
		this.folderFlag = 1;
		this.actualFolder = null;
		this.idAnterior = null;
		this.breadcrumbs = new Array();
	}

	ngOnInit() {
		this.folderList();
	}

	onSubmit(form){
		this.documents = undefined;
		this.status = undefined;
		this.errorCode = undefined;
		this.errorMessage = undefined;
		this.page_title2 = 'Documentos';
		this.panelShow = 1;
		this.folderFlag = 1;
		this.foldersIn = undefined;
		this.flag = 1;
		if(this.searchBy == 'id'){
			this._documentsService.getDocument(this.idDocument, this.token).subscribe(
				response => {
					if(response.status == 'success'){
						this.documents = response.document;
						this.flag = 2;
					}
				},
				error => {
					this.flag = 2;
					this.status = 'error';
					this.errorCode = error.error.code;
					this.errorMessage = error.error.message;
					if(error.status && error.status == 500) this.errorCode = 500;
					console.log(<any>error);
				}
			);
		} else if(this.searchBy == 'word'){			
			this.panelShow=0;
			this._documentsService.getDocumentByWord(this.inputWordDocument, this.token).subscribe(
				response => {
					if(response.status == 'success'){
						this.documents = response.documents;
						this.flag = 2;
					}
				},
				error => {
					this.flag = 2;
					this.status = 'error';
					this.errorCode = error.error.code;
					this.errorMessage = error.error.message;
					if(error.status && error.status == 500) this.errorCode = 500;
					console.log(<any>error);
				}
			);
		} else if(this.searchBy == 'all'){
			this.panelShow = 0;
			this.list();
		} else if(this.searchBy == 'folders'){
			this.panelShow = 2;
			this.folderList();
		}
	}

	list(){
		this.panelShow = 0;
		this.status = undefined;
		this.errorCode = undefined;
		this.errorMessage = undefined;
		this.flag = 1;
		this._documentsService.list(this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.documents = response.documents;
					this.flag = 2;
				}
			},
			error => {
				this.flag = 2;
				this.status = 'error';
				this.errorCode = error.error.code;
				this.errorMessage = error.error.message;
				if(error.status && error.status == 500) this.errorCode = 500;
				console.log(<any>error);
			}
		);
	}

	getFolderInFolder(id, name, index=null){
		this.status = undefined;
		this.errorCode = undefined;
		this.foldersIn = undefined;
		this.folderFlag = 1;
		this.panelShow = 0;
		this.flag = 1;
		if(index == null){
			this.pathBreadcrumbs(id, name);
		} else{
			this.reloadBreadcrumbs(index);
		}
		this.page_title2 = name;

		this._folderService.getFolderByFolderId(this.token, id).subscribe(
			response => {
				this.foldersIn = response.folders;
				this.folderFlag = 2;
				this.getDocumentsByFolder(id);
			},
			error => {
				this.folderFlag = 1;
				console.log(<any>error);
				this.getDocumentsByFolder(id);
			}
		);
	}

	getDocumentsByFolder(id){
		this.documents = undefined;
		this.status = undefined;
		this.errorCode = undefined;
		this.errorMessage = undefined;

		this._documentsService.getDocumentByFolder(id, this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.documents = response.documents;
					this.flag = 3;
				}
			},
			error => {
				this.flag = 3;
				if(this.folderFlag == 1){
					this.status = 'error';
					this.errorCode = error.error.code;
					this.errorMessage = error.error.message;
					if(error.status && error.status == 500) this.errorCode = 500;
					console.log(<any>error);
				}
			}
		);		
	}

	folderList(){
		this.flag = 1;
		this.panelShow = 2;
		this.status = undefined;
		this.errorCode = undefined;
		this.errorMessage = undefined;
		this.documents = undefined;
		this.page_title2 = 'HOME';
		this.lastTitle = this.page_title2;
		this.breadcrumbs = [];
		this._folderService.getFolderByFolderId(this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.folders = response.folders;
					this.flag = 2;
				}
			},
			error => {
				this.flag = 2;
				this.status = 'error';
				this.errorCode = error.error.code;
				this.errorMessage = error.error.message;
				if(error.status && error.status == 500) this.errorCode = 500;
				console.log(<any>error);
			}
		);
	}

	deleteDocument(document){
		this.status = undefined;
		this.errorCode = undefined;
		this.errorMessage = undefined;
		this._documentsService.deleteFile(document.document_name, this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this._documentsService.deleteDocument(document.id, this.token).subscribe(
						response => {
							if(response.status == 'success'){
								this.getDocumentsByFolder(document.folder_id);
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

	goToDocument(documentName){
		this.status = undefined;
		this.errorCode = undefined;
		let documentRoute = this.documentUrl + documentName;
		this.incomeRecord.user = this.identity.user_alias;
		this.incomeRecord.document_name = documentName;

		if(documentName != ''){
			this._incomeRecordService.newIncomeRecord(this.incomeRecord).subscribe(
				response => {
					if(response.status == 'success'){
						window.open(documentRoute);					
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
	}

	pathBreadcrumbs(id, name){
		let breadObject = {
			id:		id,
			name:	name
		}
		let breadArray = this.breadcrumbs;
		let breadString = '';
		breadArray.push(breadObject);

		this.breadcrumbs.forEach(function(element){
			breadString = breadString + ' > ' + element.name;
		});
	}

	reloadBreadcrumbs(index){
		let breadArray = [];
		for (let i=0; i < this.breadcrumbs.length; i++){
			console.log(this.breadcrumbs[i]);
			if(i <= index){
				breadArray.push(this.breadcrumbs[i]);
			}
		}
		this.breadcrumbs = breadArray;
	}

	pageChange(event){
		this.actualPage = event;
	}
}
