import { TranslateJsonPipe } from '@a-shared/pipes/translate-json/translate-json.pipe';
import { TranslationsService } from '@a-shared/services/translation/translations.service';

describe('TranslateJsonPipe', () => {
  it('create an instance', () => {
    const pipe = new TranslateJsonPipe(new TranslationsService());
    expect(pipe).toBeTruthy();
  });
});
