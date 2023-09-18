import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuizDetailsComponent } from './components/quiz-details/quiz-details.component';
import { PrePlayComponent } from './components/pre-play/pre-play.component';
import { ResultComponent } from './components/result/result.component';

const routes: Routes = [
  {
    path: 'details/:id',
    component: QuizDetailsComponent
  },
  {
    path: 'play/:id',
    component: PrePlayComponent
  },
  {
    path: 'result/:id',
    component: ResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class QuizzesRoutingModule {}
