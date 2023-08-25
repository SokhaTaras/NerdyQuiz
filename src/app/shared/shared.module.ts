import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { InputComponent } from './components/input/input.component';
import { ModalFooterComponent } from './components/modal-footer/modal-footer.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { CheckBoxComponent } from './components/check-box/check-box.component';

@NgModule({
  declarations: [
    InputComponent,
    ModalFooterComponent,
    ErrorMessageComponent,
    DropdownComponent,
    ConfirmModalComponent,
    CheckBoxComponent
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
    NzCheckboxModule
  ],
  exports: [
    InputComponent,
    ModalFooterComponent,
    ErrorMessageComponent,
    DropdownComponent,
    CheckBoxComponent
  ]
})
export class SharedModule {}
