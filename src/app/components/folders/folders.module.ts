import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

// Routes
import { FOLDERS_ROUTES } from './folders.routes';

// Components
import { FolderEditComponent } from './folder-edit/folder-edit.component';
import { FolderListComponent } from './folder-list/folder-list.component';
import { FolderRegisterComponent } from './folder-register/folder-register.component';

@NgModule({
	declarations:[
		FolderEditComponent,
		FolderListComponent,
		FolderRegisterComponent,
	],
	imports:[
		CommonModule,
		FormsModule,
		HttpClientModule,
		NgxPaginationModule,
		FOLDERS_ROUTES,
	]
})
export class FoldersModule {}