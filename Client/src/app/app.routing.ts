/**
 * Created by matth on 2017-09-25.
 */
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {AuthGuard} from "./auth-guard";

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  { path: '', component: HomeComponent, canActivate:[AuthGuard] }
];
export const routing = RouterModule.forRoot(appRoutes);
