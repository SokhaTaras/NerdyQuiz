import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuizDetailsComponent } from '@a-quizzes/components/quiz-details/quiz-details.component';

const routes: Routes = [
  {
    path: '',
    component: QuizDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule {}
