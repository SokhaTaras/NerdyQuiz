import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzRadioModule } from 'ng-zorro-antd/radio';

import { InputComponent } from './components/input/input.component';
import { ModalFooterComponent } from './components/modal-footer/modal-footer.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { TranslateJsonPipe } from './pipes/translate-json/translate-json.pipe';
import { ButtonComponent } from './components/button/button.component';
import { LoaderComponent } from './components/loader/loader.component';
import { BaseQuizComponent } from './components/base-quiz/base-quiz.component';
// import { BaseQuizPageComponent } from './components/BaseQuizPageComponent/base-quiz-page.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [
    InputComponent,
    ModalFooterComponent,
    ErrorMessageComponent,
    DropdownComponent,
    ConfirmModalComponent,
    RadioButtonComponent,
    TranslateJsonPipe,
    ButtonComponent,
    LoaderComponent,
    BaseQuizComponent
    // BaseQuizPageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzModalModule,
    BrowserModule,
    BrowserAnimationsModule,
    NzDropDownModule,
    NzRadioModule,
    NzIconModule
  ],
  exports: [
    InputComponent,
    ModalFooterComponent,
    ErrorMessageComponent,
    DropdownComponent,
    RadioButtonComponent,
    TranslateJsonPipe,
    ButtonComponent,
    LoaderComponent
  ]
})
export class SharedModule {}

//import { Component, OnDestroy, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Subscription } from 'rxjs';
//
// import { QuizService } from '../../../quizzes/services/quiz/quiz.service';
// import { Quiz } from '../../../quizzes/interfaces/quiz';
// import { NavigateToService } from '../../services/navigate-to/navigate-to.service';
// import { BUTTON_TYPE } from '../../enums/buttonType';
//
// @Component({
//   selector: 'quiz-app-quiz-details',
//   template: ''
// })
// export class BaseQuizPageComponent implements OnInit, OnDestroy {
//   initialQuiz: Quiz;
//   id: string | null;
//   quizSubscription: Subscription;
//
//   protected readonly BUTTON_TYPE = BUTTON_TYPE;
//
//   constructor(
//     private quizService: QuizService,
//     private route: ActivatedRoute,
//     private navigateTo: NavigateToService
//   ) {}
//
//   ngOnInit(): void {
//     this.getCurrentQuizId();
//     this.currentQuizSubscribe();
//   }
//
//   goHome(): void {
//     this.navigateTo.navigateHome();
//   }
//
//   private getCurrentQuizId(): void {
//     this.id = this.route.snapshot.paramMap.get('id');
//   }
//
//   private currentQuizSubscribe(): void {
//     this.quizSubscription = this.quizService
//       .getQuizById(this.id)
//       .subscribe((currentQuiz) => {
//         this.initialQuiz = currentQuiz;
//       });
//   }
//
//   ngOnDestroy(): void {
//     this.quizSubscription.unsubscribe();
//   }
// }
