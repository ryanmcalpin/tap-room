import {Pipe, PipeTransform} from '@angular/core';
import {Keg} from './keg.model';

@Pipe({
  name: "price",
  pure: false
})

export class PricePipe implements PipeTransform {
  transform(input: Keg[]) {
    input.sort(function(a, b) {
      return a.price - b.price;
    });

    return input;
  }
}
