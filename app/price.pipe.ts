import {Pipe, PipeTransform} from '@angular/core';
import {Keg} from './keg.model';

@Pipe({
  name: "price",
  pure: false
})

export class PricePipe implements PipeTransform {
  transform(input: Keg[], filterBy, filter) {
    if (filterBy === "name" || filterBy === "brewery") {
      if (filter === "l2h") {
        input.sort(function(a, b) {
          return (a[filterBy] > b[filterBy]) ? -1 : (a[filterBy] < b[filterBy]) ? 1 : 0;
        });
      } else if (filter === "h2l") {
        input.sort(function(a, b) {
          return (a[filterBy] < b[filterBy]) ? -1 : (a[filterBy] > b[filterBy]) ? 1 : 0;
        });
      }
    } else if (filterBy === "alcoholContent" || filterBy === "price") {
      if (filter === "l2h") {
        input.sort(function(a, b) {
          return a[filterBy] - b[filterBy];
        });
      } else if (filter === "h2l") {
        input.sort(function(a, b) {
          return b[filterBy] - a[filterBy];
        });
      }
    }

    return input;
  }
}
