import {Pipe, PipeTransform} from '@angular/core';
import {Keg} from './keg.model';

@Pipe({
  name: "price",
  pure: false
})

export class PricePipe implements PipeTransform {
  transform(input: Keg[], filterBy, filter) {
    if (filterBy === "price") {
      if (filter === "l2h") {
        input.sort(function(a, b) {
          return a.price - b.price;
        });
      } else if (filter === "h2l") {
        input.sort(function(a, b) {
          return b.price - a.price;
        });
      }
    } else if (filterBy === "abv") {
      if (filter === "l2h") {
        input.sort(function(a, b) {
          return a.alcoholContent - b.alcoholContent;
        });
      } else if (filter === "h2l") {
        input.sort(function(a, b) {
          return b.alcoholContent - a.alcoholContent;
        });
      }
    }

    return input;
  }
}
