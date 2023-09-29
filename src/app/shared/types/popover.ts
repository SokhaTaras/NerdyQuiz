import { BUTTON_TYPE } from '@a-shared/enums/shared-components';

export type PopoverItem = {
  text: string;
  type: BUTTON_TYPE;
  action: Function;
};
