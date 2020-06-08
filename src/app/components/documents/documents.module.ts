import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFileUploaderModule } from 'angular-file-uploader';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

// Routes
import { DOCUMENTS_ROUTES } from './documents.routes';

// Components
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentRegisterComponent } from './document-register/document-register.component';

@NgModule({
	declarations:[
		DocumentListComponent,
		DocumentRegisterComponent,
	],
	imports:[
		AngularFileUploaderModule,
		CommonModule,
		FormsModule,
		HttpClientModule,
		NgxPaginationModule,

		DOCUMENTS_ROUTES,
	]
})
export class DocumentsModule {}