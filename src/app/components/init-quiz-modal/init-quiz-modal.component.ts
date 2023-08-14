import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'quiz-app-init-quiz-modal',
  templateUrl: './init-quiz-modal.component.html',
})
export class InitQuizModalComponent implements OnInit {
  public initQuizForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.initQuizForm = this.fb.group({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      theme: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
  }
}
