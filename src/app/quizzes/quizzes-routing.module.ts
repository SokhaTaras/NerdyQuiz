import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuizDetailsComponent } from './components/quiz-details/quiz-details.component';

const routes: Routes = [
  {
    path: 'quiz/:id',
    loadChildren: () =>
      import('../quizzes/quizzes-routing.module').then(
        (m) => m.QuizzesRoutingModule
      )
  },
  { path: '', component: QuizDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class QuizzesRoutingModule {}
