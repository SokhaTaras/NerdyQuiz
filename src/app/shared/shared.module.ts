import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InputComponent } from './components/input/input.component';
import { ModalFooterComponent } from './components/modal-footer/modal-footer.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@NgModule({
  declarations: [
    InputComponent,
    ModalFooterComponent,
    ErrorMessageComponent,
    DropdownComponent
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
    NzDropDownModule
  ],
  exports: [
    InputComponent,
    ModalFooterComponent,
    ErrorMessageComponent,
    DropdownComponent
  ]
})
export class SharedModule {}
