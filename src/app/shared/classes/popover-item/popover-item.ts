import { POPOVER_ITEM_TYPE, SVG_TYPE } from '@a-shared/enums/shared-components';

export class PopoverItemClass {
  constructor(
    public text: string,
    public type: POPOVER_ITEM_TYPE,
    public icon: SVG_TYPE,
    public action: Function
  ) {
    this.text = text;
    this.type = type;
    this.icon = icon;
    this.action = action;
  }
}
