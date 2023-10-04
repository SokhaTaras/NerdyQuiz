import { Component, Input, OnInit } from '@angular/core';
import { POPOVER_ITEM_TYPE } from '@a-shared/enums/shared-components';

@Component({
  selector: 'quiz-app-popover-item',
  templateUrl: './popover-item.component.html'
})
export class PopoverItemComponent implements OnInit {
  @Input() type: POPOVER_ITEM_TYPE;

  dynamicClass: string;

  ngOnInit(): void {
    this.setType();
  }

  private setType(): void {
    switch (this.type) {
      case POPOVER_ITEM_TYPE.PRIMARY:
        this.dynamicClass = 'bg-indigo-600/20 rounded-t-[10px]';
        break;
      case POPOVER_ITEM_TYPE.SECONDARY:
        this.dynamicClass = 'bg-transparent border-2 border-primary';
        break;
      case POPOVER_ITEM_TYPE.ERROR:
        this.dynamicClass = 'rounded-b-[10px] text-red-600';
        break;
    }
  }
}
