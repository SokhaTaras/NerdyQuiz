import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuizDetailsComponent } from './components/quiz-details/quiz-details.component';
import { IntermediateComponent } from './components/intermediate/intermediate.component';

const routes: Routes = [
  { path: 'details', component: QuizDetailsComponent },
  {
    path: 'details/intermediate',
    component: IntermediateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class QuizzesRoutingModule {}
