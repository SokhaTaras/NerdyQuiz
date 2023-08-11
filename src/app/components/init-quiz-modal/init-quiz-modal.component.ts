import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'quiz-app-init-quiz-modal',
  templateUrl: './init-quiz-modal.component.html',
  styleUrls: ['./init-quiz-modal.component.scss'],
})
export class InitQuizModalComponent implements OnInit {
  initQuizForm: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.initQuizForm = this.fb.group({
      title: new FormControl(''),
      theme: new FormControl(''),
    });
  }

  handleCancel() {}
  handleOk() {
    this.router.navigate(['quiz-details-page']);
  }
}
