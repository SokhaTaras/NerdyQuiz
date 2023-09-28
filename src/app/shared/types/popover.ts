import { BUTTON_TYPE } from '@a-shared/enums/shared-components';

// export type Popover = PopoverItem[];

export type PopoverItem = {
  text: string;
  type: BUTTON_TYPE;
  method: Function;
  context?: any;
};
