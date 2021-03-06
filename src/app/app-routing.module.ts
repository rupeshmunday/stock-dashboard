import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { SearchComponent } from './search/search.component';
import { UserProfileComponent } from './login/user-profile/user-profile.component';

const routes: Routes = [
  {path:'login' ,component:LoginComponent,children:[
    { path: 'loggedIn', component: UserProfileComponent, pathMatch:'full'}
]},
  {path:'register' ,component:RegistrationComponent},
  {path:'search' ,component:SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
