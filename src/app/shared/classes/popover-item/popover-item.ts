import { POPOVER_ITEM_TYPE } from '@a-shared/enums/shared-components';
import { SVG_COLOR, SVG_TYPE } from '@a-shared/enums/svg';

export class PopoverItemClass {
  constructor(
    public text: string,
    public type: POPOVER_ITEM_TYPE,
    public icon: SVG_TYPE,
    public iconColor: SVG_COLOR,
    public action: Function
  ) {
    this.text = text;
    this.type = type;
    this.icon = icon;
    this.iconColor = iconColor;
    this.action = action;
  }
}
