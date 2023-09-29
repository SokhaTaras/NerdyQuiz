import { BUTTON_TYPE } from '@a-shared/enums/shared-components';

export class PopoverItemClass {
  constructor(
    public text: string,
    public type: BUTTON_TYPE,
    public action: Function
  ) {
    this.text = text;
    this.type = type;
    this.action = action;
  }
}
