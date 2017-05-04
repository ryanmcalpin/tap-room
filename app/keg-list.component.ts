import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Keg } from './keg.model';

@Component({
  selector: 'keg-list',
  template: `
  <div>
    <div class="row">
      <div class="col-xs-3">
        <h3>Sales</h3>
      </div>
      <div class="col-xs-2">
        <h3>Beer</h3>
      </div>
      <div class="col-xs-2">
        <h3>Brewery</h3>
      </div>
      <div class="col-xs-2">
        <h3 (click)="toggleSort('abv')" class="sortTitle">Alcohol % <span *ngIf="filterBy==='abv'" class="sortArrows">{{filterArrow}}</span></h3>
      </div>
      <div class="col-xs-3">
        <h3 (click)="toggleSort('price')" class="sortTitle">Price <span *ngIf="filterBy==='price'" class="sortArrows">{{filterArrow}}</span></h3>
      </div>
    </div>
  </div>
  <div *ngFor="let keg of childKegs | price:filterBy:filter" [class]="kickWarning(keg)">
    <div class="row">
      <div class="col-xs-3">
        <button (click)="sellPint(keg, 1)" class="btn-xs">PINT</button>
        <button (click)="sellPint(keg, 2)" class="btn-xs">GRUMBLER</button>
        <button (click)="sellPint(keg, 4)" class="btn-xs">GROWLER</button>
        ({{keg.pintsLeft}})
      </div>
      <div class="col-xs-2">
        <p>{{keg.name}}</p>
      </div>
      <div class="col-xs-2">
        <p>{{keg.brewery}}</p>
      </div>
      <div class="col-xs-2">
        <p [class]="abvStyle(keg)">{{keg.alcoholContent}}% ABV</p>
      </div>
      <div class="col-xs-2">
        <p [class]="priceStyle(keg)">\${{keg.price}} / pint</p>
      </div>
      <div class="col-xs-1">
        <button (click)="editButtonClick(keg)" class="btn-xs">EDIT</button>
      </div>
    </div>
  </div>
  `
})

export class KegListComponent {
  @Input() childKegs: Keg[];
  @Output() clickSender = new EventEmitter();

  filter: string = null;
  filterBy: string = null;
  filterArrow: string = null;

  sellPint(keg: Keg, amount: number) {
    keg.pintsLeft -= amount;
  }

  kickWarning(keg: Keg) {
    if (keg.pintsLeft <= 0) {
      return "bg-danger";
    } else if (keg.pintsLeft <= 10) {
      return "bg-warning";
    }
  }

  priceStyle(keg: Keg) {
    if (keg.price <= 2) {
      return "cheap";
    } else if (keg.price >= 5) {
      return "expensive";
    }
  }

  abvStyle(keg: Keg) {
    if (keg.alcoholContent >= 7) {
      return "bold";
    }
  }

  editButtonClick(keg: Keg) {
    this.clickSender.emit(keg);
  }

  toggleSort(sortBy) {
    this.filterBy = sortBy;

    if (this.filter === "h2l") {
      this.filter = "l2h";
      this.filterArrow = "\\/";
    } else {
      this.filter = "h2l";
      this.filterArrow = "/\\";
    }
  }
}
