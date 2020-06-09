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
import { IdentityGuard, LoginGuard } from './guards/guards.index';

// Definir las rutas
const appRoutes: Routes = [
	{ path: 'login', component: LoginComponent, canActivate: [ LoginGuard ] },
	{ path: 'logout/:sure', component: LoginComponent },
	{ path: 'request/new-user', component: RequestComponent },
	{
		path: '',
		component: DocumentsComponent,
		canActivate: [ IdentityGuard ],
		loadChildren: () => import('./components/documents/documents.module').then(m => m.DocumentsModule)
	},
	{
		path: 'carpetas',
		component: FoldersComponent,
		canActivate: [ IdentityGuard ],
		loadChildren: () => import('./components/folders/folders.module').then(m => m.FoldersModule)
	},
	{
		path: 'usuarios',
		component: UsersComponent,
		canActivate: [ IdentityGuard ],
		loadChildren: () => import('./components/users/users.module').then(m => m.UsersModule)
	},
	{ path: '**',  redirectTo: 'login', pathMatch: 'full'},
];

// Exportar la configuración
export const APP_ROUTING: ModuleWithProviders = RouterModule.forRoot( appRoutes, { useHash: true } );