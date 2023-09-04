import { TranslateJsonPipe } from './translate-json.pipe';
import { TranslationsService } from '../../services/translation/translations.service';

describe('TranslateJsonPipe', () => {
  it('create an instance', () => {
    const pipe = new TranslateJsonPipe(new TranslationsService());
    expect(pipe).toBeTruthy();
  });
});
