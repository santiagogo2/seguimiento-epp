// Imports necesarios
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { NgxPaginationModule } from 'ngx-pagination';
import { RecaptchaModule } from 'ng-recaptcha';
import * as $ from 'jquery';

// Internal modules
import { DocumentsModule } from './components/documents/documents.module';
import { FoldersModule } from './components/folders/folders.module';
import { UsersModule } from './components/users/users.module';

// Components
import { AppComponent } from './app.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { FoldersComponent } from './components/folders/folders.component';
import { LoginComponent } from './components/login/login.component';
import { RequestComponent } from './components/request/request.component';
import { UsersComponent } from './components/users/users.component';

import { UserService } from './services/services.index';
import { IdentityGuard } from './guards/guards.index';

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
		routing,
		FormsModule,
		HttpClientModule,
		NgxPaginationModule,
		RecaptchaModule.forRoot(),

		DocumentsModule,
		FoldersModule,
		UsersModule,
	],
	providers: [
		appRoutingProviders,
		IdentityGuard,
		UserService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
