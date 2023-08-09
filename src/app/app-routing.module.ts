import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [{
 path: '',
 component: MainComponent,
 children:[
   {
     path: '',
     pathMatch: "full",
     redirectTo: 'home'
   },
   {
     path: 'home',
     component: HomeComponent
   }
 ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
