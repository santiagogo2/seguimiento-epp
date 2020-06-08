import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

// Routes
import { USERS_ROUTES } from './users.routes';

// Components
import { PasswordEditComponent } from './password-edit/password-edit.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRegisterComponent } from './user-register/user-register.component';

@NgModule({
	declarations:[
		PasswordEditComponent,
		UserEditComponent,
		UserListComponent,
		UserRegisterComponent,
	],
	imports:[
		CommonModule,
		FormsModule,
		HttpClientModule,
		NgxPaginationModule,

		USERS_ROUTES,
	]
})
export class UsersModule {}