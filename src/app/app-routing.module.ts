import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { HomeComponent } from './home/home.component';
import { ProjectcomponentComponent } from './projectcomponent/projectcomponent.component';
import { ResourcecomponentComponent } from './resourcecomponent/resourcecomponent.component';

const routes: Routes = [
  { path: '', redirectTo:'/project', pathMatch: 'full'},
 // { path: 'home', component: HomeComponent },
  { path: 'project', component: ProjectcomponentComponent },
  { path: 'resource', component: ResourcecomponentComponent },
  { path: 'resource/:id', component: ResourcecomponentComponent },
];  

@NgModule({   
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
