/**
 * Created by matth on 2017-09-25.
 */
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent}
];
export const routing = RouterModule.forRoot(appRoutes);
