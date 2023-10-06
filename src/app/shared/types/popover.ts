import { POPOVER_ITEM_TYPE } from '@a-shared/enums/shared-components';
import { SVG_COLOR, SVG_TYPE } from '@a-shared/enums/svg';

export type PopoverItem = {
  text: string;
  type: POPOVER_ITEM_TYPE;
  icon: SVG_TYPE;
  iconColor: SVG_COLOR;
  action: Function;
};
