import {Pipe, PipeTransform} from '@angular/core';
import {Keg} from './keg.model';

@Pipe({
  name: "abv",
  pure: false
})

export class AbvPipe implements PipeTransform {
  transform(input: Keg[], filter) {
    if (filter === "l2h") {
      input.sort(function(a, b) {
        return a.price - b.price;
      });
    } else if (filter === "h2l") {
      input.sort(function(a, b) {
        return b.price - a.price;
      });
    }

    return input;
  }
}
