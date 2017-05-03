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
        <input #newAlcoholContent type="number"><br>
        <label>Price</label>
        <input #newPrice type="number"><br>
        <button (click)="saveBeer(newName.value, newBrewery.value, newPrice.value, newAlcoholContent.value)" class="btn-sm">TAP KEG</button>
        <button (click)="cancel()" class="btn-sm">CANCEL</button>
      </div>
      <div>
        <div class="row">
          <div class="col-xs-1">
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
          <div class="col-xs-2">
            <h3>Price</h3>
          </div>
        </div>
      </div>
      <div *ngFor="let keg of kegs">
        <div class="row">
          <div class="col-xs-1">
            <button (click)="sellPint(keg)" class="btn-xs">SELL</button>
          </div>
          <div class="col-xs-2">
            <p>{{keg.name}} ({{keg.pintsLeft}})</p>
          </div>
          <div class="col-xs-2">
            <p>{{keg.brewery}}</p>
          </div>
          <div class="col-xs-2">
            <p>{{keg.alcoholContent}}% ABV</p>
          </div>
          <div class="col-xs-2">
            <p>\${{keg.price}} / pint</p>
          </div>
          <div class="col-xs-1">
            <button (click)="editKeg(keg)" class="btn-xs">EDIT</button>
          </div>
        </div>
      </div>
      <div *ngIf="editBeer">
        <label>Beer</label>
        <input [(ngModel)]="selectedKeg.name">
        <label>Brewery</label>
        <input [(ngModel)]="selectedKeg.brewery">
        <label>ABV</label>
        <input [(ngModel)]="selectedKeg.alcoholContent" type="number">
        <label>Price</label>
        <input [(ngModel)]="selectedKeg.price" type="number">
        <button (click)="editDone()" class="btn-sm">DONE</button>
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

  editKeg(keg) {
    this.editBeer = true;
    this.selectedKeg = keg;
  }

  editDone() {
    this.editBeer = false;
  }

  sellPint(keg) {
    keg.pintsLeft -= 1;
  }
}

export class Keg {
  public pintsLeft: number = 124;
  constructor(public name: string, public brewery: string, public price: number, public alcoholContent: number) { }
}
