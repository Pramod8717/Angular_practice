import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortStatus'
})
export class SortStatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
