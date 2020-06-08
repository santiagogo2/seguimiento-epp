import { Routes, RouterModule } from '@angular/router';

// Components
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentRegisterComponent } from './document-register/document-register.component';

// Guards
import { IdentityGuard } from '../../guards/guards.index';

const documentsRoutes: Routes = [
	{ path: 'inicio', component: DocumentListComponent },
	{ path: 'documentos/listar-documentos', component: DocumentListComponent },
	{ path: 'documentos/cargar-documentos', component: DocumentRegisterComponent },
	{ path: '', redirectTo: '/inicio', pathMatch: 'full' },
]
export const DOCUMENTS_ROUTES = RouterModule.forChild( documentsRoutes );