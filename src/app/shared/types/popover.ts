import { POPOVER_ITEM_TYPE, SVG_TYPE } from '@a-shared/enums/shared-components';

export type PopoverItem = {
  text: string;
  type: POPOVER_ITEM_TYPE;
  icon: SVG_TYPE;
  action: Function;
};
