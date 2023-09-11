import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home-routing.module').then((m) => m.HomeRoutingModule)
      },
      {
        path: 'quiz',
        loadChildren: () =>
          import('./quizzes/quizzes-routing.module').then(
            (m) => m.QuizzesRoutingModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
