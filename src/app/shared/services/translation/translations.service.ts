import { Injectable } from '@angular/core';

import * as en from '../../../../assets/translations/en.json';

@Injectable({
  providedIn: 'root'
})
export class TranslationsService {
  langEn = en;

  private findNestedValue(data: any, keys: string[]): any {
    if (keys.length === 0) {
      return data;
    }

    const currentKey = keys.shift();
    return this.findNestedValue(data[currentKey], keys);
  }

  getText(key: string): string {
    if (this.langEn) {
      const keys = key.split('.');
      const nestedValue = this.findNestedValue(this.langEn, keys);
      return nestedValue || key;
    } else {
      return '';
    }
  }
}
