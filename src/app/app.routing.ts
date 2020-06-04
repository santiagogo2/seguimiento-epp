// Import necesarios para el archivo de rutas
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes de Usuario
import { LoginComponent } from './components/users/login/login.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserRegisterComponent } from './components/users/user-register/user-register.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import { PasswordEditComponent } from './components/users/password-edit/password-edit.component';
import { UserRequestComponent } from './components/users/user-request/user-request.component';
// Componentes Documentos
import { DocumentListComponent } from './components/documents/document-list/document-list.component';
import { DocumentRegisterComponent } from './components/documents/document-register/document-register.component';
// Componentes Carpetas
import { FolderListComponent } from './components/folders/folder-list/folder-list.component';
import { FolderRegisterComponent } from './components/folders/folder-register/folder-register.component';
import { FolderEditComponent } from './components/folders/folder-edit/folder-edit.component';

import { IdentityGuard } from './services/identity.guard';

// Definir las rutas
const appRoutes: Routes = [
	{path: '', component: DocumentListComponent, canActivate: [IdentityGuard]},
	{path: 'login', component: LoginComponent},
	{path: 'logout/:sure', component: LoginComponent},
	{path: 'request/new-user', component: UserRequestComponent},
	{path: 'listar/usuarios', component: UserListComponent, canActivate: [IdentityGuard]},
	{path: 'registrar/usuario', component: UserRegisterComponent, canActivate: [IdentityGuard]},
	{path: 'editar/usuario/:id', component: UserEditComponent, canActivate: [IdentityGuard]},
	{path: 'change/password/:id', component: PasswordEditComponent, canActivate: [IdentityGuard]},

	{path: 'inicio', component: DocumentListComponent, canActivate: [IdentityGuard]},
	{path: 'documentos/listar-documentos', component: DocumentListComponent, canActivate: [IdentityGuard]},
	{path: 'documentos/cargar-documentos', component: DocumentRegisterComponent, canActivate: [IdentityGuard]},

	{path: 'carpetas/listar-carpetas', component: FolderListComponent, canActivate: [IdentityGuard]},
	{path: 'carpetas/nueva-carpeta', component: FolderRegisterComponent, canActivate: [IdentityGuard]},
	{path: 'carpetas/editar-carpeta/:id', component: FolderEditComponent, canActivate: [IdentityGuard]}
];

// Exportar la configuración
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);