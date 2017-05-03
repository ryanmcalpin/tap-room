import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
      <h1>Tap Room</h1>
      <h2>Beer List</h2>
      <button *ngIf="newBeer===false" (click)="addBeer()" class="btn-lg">TAP KEG</button>
      <div *ngIf="newBeer">
        <label>Beer</label>
        <input #newName><br>
        <label>Brewery</label>
        <input #newBrewery><br>
        <label>ABV</label>
        <input #newAlcoholContent type="number" step="0.1"><br>
        <label>Price</label>
        <input #newPrice type="number" step="0.25"><br>
        <button (click)="saveBeer(newName.value, newBrewery.value, newPrice.value, newAlcoholContent.value)" class="btn-sm">TAP KEG</button>
        <button (click)="cancel()" class="btn-sm">CANCEL</button>
      </div>
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
            <h3>Alcohol %</h3>
          </div>
          <div class="col-xs-3">
            <h3>Price</h3>
          </div>
        </div>
      </div>
      <div *ngFor="let keg of kegs" [class]="kickWarning(keg)">
        <div class="row">
          <div class="col-xs-3">
            <button (click)="sellPint(keg, 1)" class="btn-xs">PINT</button>
            <button (click)="sellPint(keg, 2)" class="btn-xs">GRUMBLER</button>
            <button (click)="sellPint(keg, 4)" class="btn-xs">GROWLER</button>
          </div>
          <div class="col-xs-2">
            <p>{{keg.name}} ({{keg.pintsLeft}})</p>
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
            <button (click)="editKeg(keg)" class="btn-xs">EDIT</button>
          </div>
        </div>
      </div>
      <div *ngIf="editBeer">
        <label>Beer:</label>
        <input [(ngModel)]="selectedKeg.name">
        <label>Pints Left:</label>
        <input [(ngModel)]="selectedKeg.pintsLeft" type="number" id="editPints">
        <label>Brewery:</label>
        <input [(ngModel)]="selectedKeg.brewery">
        <label>ABV:</label>
        <input [(ngModel)]="selectedKeg.alcoholContent" type="number" step="0.1">
        <label>Price:</label>
        <input [(ngModel)]="selectedKeg.price" type="number" step="0.25">
        <button (click)="editDone()" class="btn-xs">DONE</button>
      </div>
  </div>
  `
})

export class AppComponent {
  kegs: Keg[] = [
    new Keg("Black Butte Porter", "Deschutes Brewery", 4, 5.2),
    new Keg("Rainier", "Rainier Beer", 2, 4.6)
  ]
  newBeer = false;
  editBeer = false;
  selectedKeg = null;

  addBeer() {
    this.newBeer = true;
  }

  saveBeer(name: string, brewery: string, price: number, alcoholContent: number) {
    if (name==='' || brewery==='' || price<=0 || alcoholContent<=0) {
      alert("Please fill in all the fields!");
    } else {
      this.kegs.push(new Keg(name, brewery, price, alcoholContent));
      this.newBeer = false;
    }
  }

  cancel() {
    this.newBeer = false;
  }

  editKeg(keg: Keg) {
    this.editBeer = true;
    this.selectedKeg = keg;
  }

  editDone() {
    this.editBeer = false;
  }

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
}

export class Keg {
  public pintsLeft: number = 124;
  constructor(public name: string, public brewery: string, public price: number, public alcoholContent: number) { }
}
