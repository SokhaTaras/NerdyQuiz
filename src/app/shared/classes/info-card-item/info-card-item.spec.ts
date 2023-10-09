import { InfoCardItem } from './info-card-item';

describe('InfoCardItem', () => {
  it('should create an instance', () => {
    expect(new InfoCardItem('label', 'subLabel')).toBeTruthy();
  });
});
