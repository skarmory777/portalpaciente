import { TitleCasePipe } from '@angular/common';

export const titleCasePipe = (texto: string): string => {
  const titleCasePipe = new TitleCasePipe();
  return titleCasePipe.transform(texto);
};
