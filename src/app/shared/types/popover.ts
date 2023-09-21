import { BUTTON_TYPE } from '@a-shared/enums/shared-components';

export type Popover = ButtonConfig[];

export type ButtonConfig = {
  text: string;
  type: BUTTON_TYPE;
  method: Function;
  context?: any;
};
