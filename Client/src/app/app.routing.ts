/**
 * Created by matth on 2017-09-25.
 */
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { WorkHomeComponent } from './work/work-home.component';
import { MyWorkHomeComponent } from './mywork/my-work-home.component';
import {AuthGuard} from './auth-guard';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'availablework', component: WorkHomeComponent, canActivate: [AuthGuard] },
  { path: 'mywork', component: MyWorkHomeComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] }
];
export const routing = RouterModule.forRoot(appRoutes);
