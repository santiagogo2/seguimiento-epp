// Import necesarios para el archivo de rutas
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes de Usuario 
import { LoginComponent } from './components/login/login.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { FoldersComponent } from './components/folders/folders.component';
import { RequestComponent } from './components/request/request.component';
import { UsersComponent } from './components/users/users.component';

// Guards
import { IdentityGuard } from './guards/guards.index';

// Definir las rutas
const appRoutes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'logout/:sure', component: LoginComponent },
	{ path: 'request/new-user', component: RequestComponent },
	{
		path: '',
		component: DocumentsComponent,
		canActivate: [ IdentityGuard ],
		loadChildren: './components/documents/documents.module#DocumentsModule',
	},
	{
		path: 'carpetas',
		component: FoldersComponent,
		canActivate: [ IdentityGuard ],
		loadChildren: './components/folders/folders.module#FoldersModule',
	},
	{
		path: 'usuarios',
		component: UsersComponent,
		canActivate: [ IdentityGuard ],
		loadChildren: './components/users/users.module#UsersModule',
	},
];

// Exportar la configuración
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot( appRoutes, { useHash: true } );