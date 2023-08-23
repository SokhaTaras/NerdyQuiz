import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'quiz-app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})
export class CheckBoxComponent implements OnInit {
  @Input() id: number;
  @Input() control: FormControl;

  isChecked: boolean;

  ngOnInit() {
    this.isChecked = this.control.value;
  }

  selectItem(item: boolean) {
    this.control.setValue(item);
  }
}
