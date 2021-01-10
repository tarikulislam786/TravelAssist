import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { TouristPlacesComponent } from './tourist-places/tourist-places.component';
import { TouristPlaceComponent } from './tourist-places/tourist-place/tourist-place.component';

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  //{ path: '', redirectTo: '/items', pathMatch: 'full' },
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]
  },
  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent }]
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'tourist-places', component: TouristPlacesComponent, canActivate: [AuthGuard] },
  { path: 'tourist-places/item', component: TouristPlaceComponent, canActivate: [AuthGuard] },

  
  /* {
     path: 'item', children: [
       { path: '', component: ItemComponent, canActivate: [AuthGuard] },
       { path: 'edit/:id', component: ItemComponent, canActivate: [AuthGuard] }
     ]
   },*/
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'adminpanel', component: AdminPanelComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
