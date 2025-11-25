import {Routes} from '@angular/router';
import {LoginComponent} from '../components/login/login.component';
import {MatrixResultComponent} from '../components/matrix-result/matrix-result.component';

export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'matrix', component: MatrixResultComponent},
];
