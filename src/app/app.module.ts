// Imports necesarios
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RecaptchaModule } from 'ng-recaptcha';
import * as $ from 'jquery';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/users/login/login.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import { PasswordEditComponent } from './components/users/password-edit/password-edit.component';
import { UserRegisterComponent } from './components/users/user-register/user-register.component';
import { DocumentListComponent } from './components/documents/document-list/document-list.component';
import { DocumentRegisterComponent } from './components/documents/document-register/document-register.component';
import { UserRequestComponent } from './components/users/user-request/user-request.component';
import { FolderListComponent } from './components/folders/folder-list/folder-list.component';
import { FolderRegisterComponent } from './components/folders/folder-register/folder-register.component';
import { FolderEditComponent } from './components/folders/folder-edit/folder-edit.component';

import { UserService } from './services/user.service';
import { IdentityGuard } from './services/identity.guard';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		UserListComponent,
		UserEditComponent,
		PasswordEditComponent,
		UserRegisterComponent,
		DocumentListComponent,
		DocumentRegisterComponent,
		UserRequestComponent,
		FolderListComponent,
		FolderRegisterComponent,
		FolderEditComponent
	],
	imports: [
		BrowserModule,
		routing,
		FormsModule,
		HttpClientModule,
		NgxPaginationModule,
		AngularFileUploaderModule,
		RecaptchaModule.forRoot()
	],
	providers: [
		appRoutingProviders,
		{provide: LocationStrategy, useClass: HashLocationStrategy},
		IdentityGuard,
		UserService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
