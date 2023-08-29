import { Pipe, PipeTransform } from '@angular/core';

import { TranslationsService } from '../../services/translation/translations.service';

@Pipe({
  name: 'translateJson'
})
export class TranslateJsonPipe implements PipeTransform {
  constructor(private translation: TranslationsService) {}

  transform(key: string): string {
    return this.translation.getText(key);
  }
}
