import { Router, RouterModule } from '@angular/router';

// Components
import { PasswordEditComponent } from './password-edit/password-edit.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRegisterComponent } from './user-register/user-register.component';

// Guards
import { IdentityGuard } from '../../guards/guards.index';

const usersRoutes = [
	{ path: 'listar', component: UserListComponent },
	{ path: 'registrar', component: UserRegisterComponent },
	{ path: 'editar/:id', component: UserEditComponent },
	{ path: 'change/password/:id', component: PasswordEditComponent },
]
export const USERS_ROUTES = RouterModule.forChild( usersRoutes );