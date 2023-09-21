import { BUTTON_TYPE } from '@a-shared/enums/shared-components';
import { ButtonConfig } from '@a-shared/types/popover';

export function createButtonConfig(
  text: string,
  type: BUTTON_TYPE,
  method: Function,
  context: any
): ButtonConfig {
  return {
    text,
    type,
    method: method.bind(context)
  };
}
