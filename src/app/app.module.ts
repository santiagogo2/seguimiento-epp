// Imports necesarios
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { APP_ROUTING } from './app.routing';
import { RecaptchaModule } from 'ng-recaptcha';
import * as $ from 'jquery';

// Components
import { AppComponent } from './app.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { DocumentsModule } from './components/documents/documents.module';
import { FoldersComponent } from './components/folders/folders.component';
import { LoginComponent } from './components/login/login.component';
import { RequestComponent } from './components/request/request.component';
import { UsersComponent } from './components/users/users.component';

import { UserService } from './services/services.index';

@NgModule({
	declarations: [
		AppComponent,
		DocumentsComponent,
		FoldersComponent,
		LoginComponent,
		RequestComponent,
		UsersComponent,
	],
	imports: [
		BrowserModule,
		APP_ROUTING,
		FormsModule,
		HttpClientModule,
		RecaptchaModule,
		DocumentsModule
	],
	providers: [
		UserService
	],
	bootstrap: [AppComponent]
})
export class AppModule {}