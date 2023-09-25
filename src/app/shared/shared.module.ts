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
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { InputComponent } from './components/input/input.component';
import { ModalFooterComponent } from './components/modal-footer/modal-footer.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { TranslateJsonPipe } from './pipes/translate-json/translate-json.pipe';
import { ButtonComponent } from './components/button/button.component';
import { LoaderComponent } from './components/loader/loader.component';
import { BaseQuizComponent } from './components/base-quiz/base-quiz.component';
import { SelectComponent } from './components/select/select.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';

@NgModule({
  declarations: [
    InputComponent,
    ModalFooterComponent,
    ErrorMessageComponent,
    ConfirmModalComponent,
    RadioButtonComponent,
    TranslateJsonPipe,
    ButtonComponent,
    LoaderComponent,
    BaseQuizComponent,
    TranslateJsonPipe,
    SelectComponent,
    ProgressBarComponent
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
    NzIconModule,
    NzSelectModule
  ],
  exports: [
    InputComponent,
    ModalFooterComponent,
    ErrorMessageComponent,
    RadioButtonComponent,
    TranslateJsonPipe,
    ButtonComponent,
    LoaderComponent,
    TranslateJsonPipe,
    SelectComponent,
    ProgressBarComponent
  ]
})
export class SharedModule {}
