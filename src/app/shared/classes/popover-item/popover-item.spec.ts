import { PopoverItemClass } from './popover-item';
import { BUTTON_TYPE } from '@a-shared/enums/shared-components';

describe('PopoverItem', () => {
  it('should create an instance', () => {
    expect(
      new PopoverItemClass('text', BUTTON_TYPE.PRIMARY, function () {})
    ).toBeTruthy();
  });
});
