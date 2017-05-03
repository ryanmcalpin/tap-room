import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
      <h1>Tap Room</h1>
      <h2>Beer List</h2>
      <button *ngIf="newBeer===false" (click)="addBeer()" class="btn-lg">TAP KEG</button>
      <form *ngIf="newBeer">
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
      </form>
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
            <button class="btn-xs">SELL</button>
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
      <form *ngIf="editBeer">
        <label>Beer</label>
        <input >
        <label>Brewery</label>
        <input >
        <label>ABV</label>
        <input type="number">
        <label>Price</label>
        <input type="number">
        <button (click)="saveEdit()" class="btn-sm">TAP KEG</button>
        <button (click)="cancelEdit()" class="btn-sm">CANCEL</button>
      </form>
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
    // this.selectedKeg = keg;
    this.editBeer = true;
  }

  cancelEdit() {
    this.editBeer = false;
  }
}

export class Keg {
  public pintsLeft: number = 124;
  constructor(public name: string, public brewery: string, public price: number, public alcoholContent: number) { }
}
