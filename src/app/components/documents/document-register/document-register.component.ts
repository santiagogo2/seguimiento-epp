import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { DocumentsService } from '../../../services/documents.service';
import { FolderService } from '../../../services/folder.service';
import { Document } from '../../../models/document';
import { global } from '../../../services/global';

@Component({
	selector: 'app-document-register',
	templateUrl: './document-register.component.html',
	styleUrls: ['./document-register.component.css'],
	providers: [
		UserService,
		DocumentsService,
		FolderService
	]
})
export class DocumentRegisterComponent implements OnInit {
	public page_title: string;
	public token: string;
	public identity: any;
	public document: Document;
	public documentLoad: boolean;
	public status: string;
	public errorCode: number;
	public errorMessage: string;
	public successMessage: string;
	public folders: any[];
	public afuConfig = {
	    multiple: false,
	    formatsAllowed:  ".pdf, .xlsx, .xlsm, .xlsb, .doc, .docx, .zip, .rar, .jpg, .dwg",
	    maxSize: "70",
	    uploadAPI:  {
			url: global.url + 'documents/upload-file',
			headers: {
	    		"Authorization" : this._userService.getToken()
			}
	    },
	    theme: "attachPin",
	    hideProgressBar: false,
	    hideResetBtn: true,
	    hideSelectBtn: false,
	    attachPinText: 'Seleccionar Archivo'
	};

	constructor(
		private _userService: UserService,
		private _documentsService: DocumentsService,
		private _folderService: FolderService
	) {
		this.page_title = 'Cargar Documentos';
		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
		this.document = new Document(1,'','',1,1);
		this.documentLoad = false;
	}

	ngOnInit() {
		this.folderList();
	}

	onSubmit(form){
		this._documentsService.newDocument(this.document, this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.status = 'success';
					this.successMessage = response.message;
					form.reset();
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

	fileUpload(datos){
		let inputSelected = $('.afu-attach-pin')[0];
		let data = JSON.parse(datos.response);
		inputSelected.classList.remove('correct');
		inputSelected.classList.remove('incorrect');
		this.documentLoad = false;

		if(data.status == 'success'){
			inputSelected.classList.add('correct');
			this.document.document_name = data.file;
			this.document.user_id = this.identity.sub;
			this.documentLoad = true;
		} else{
			inputSelected.classList.add('incorrect');
		}
	}

	folderList(){
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
}
