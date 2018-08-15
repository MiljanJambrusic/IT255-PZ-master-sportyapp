import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterdan'
})
export class FilterdanPipe implements PipeTransform {

  transform(items: any[], value: number, label: string): any[] {
    if (!items) return [];
    if (!value) return items;
    if (value == 0 || value == null) return [];
    return items.filter(e =>e[label].indexOf(value) > -1);

  }

}
