import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringFormat',
})
export class StringFormatPipe implements PipeTransform {
  transform(value: string, ...replacements: any): string {
    if (value) {
      for (let i = 0; i < replacements.length; i++) {
        value = value.replace(
          new RegExp('\\{' + i + '\\}', 'g'),
          replacements[i] || ''
        );
      }
    }
    return value || '';
  }
}
