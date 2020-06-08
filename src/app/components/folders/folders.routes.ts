import { Routes, RouterModule } from '@angular/router';

// Components
import { FolderEditComponent } from './folder-edit/folder-edit.component';
import { FolderListComponent } from './folder-list/folder-list.component';
import { FolderRegisterComponent } from './folder-register/folder-register.component';

// Guards
import { IdentityGuard } from '../../guards/guards.index';

const foldersRoutes = [
	{ path: 'listar-carpetas', component: FolderListComponent, canActivate: [IdentityGuard] },
	{ path: 'nueva-carpeta', component: FolderRegisterComponent, canActivate: [IdentityGuard] },
	{ path: 'editar-carpeta/:id', component: FolderEditComponent, canActivate: [IdentityGuard] },
]
export const FOLDERS_ROUTES = RouterModule.forChild( foldersRoutes );