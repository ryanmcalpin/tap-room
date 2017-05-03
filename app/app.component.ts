import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
      <h1>Tap Room</h1>
      <h2>Beer List</h2>
      <button (click)="addBeer()">TAP KEG</button>
      <div *ngIf="newBeer">
        <label>Beer</label>
        <input id="newName"><br>
        <label>Brewery</label>
        <input id="newBrewery"><br>
        <label>ABV</label>
        <input id="newPrice"><br>
        <label>Price</label>
        <input id="newAlcoholContent"><br>
        <button (click)="saveBeer()">FINISHED</button>
      </div>
      <div>
        <div class="row">
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
        </div>
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

  addBeer() {
    this.newBeer = true;
  }

  saveBeer() {
    this.kegs.push(new Keg($('#newName').val(), $('#newBrewery').val(), $('#newPrice').val(), $('#newAlcoholContent').val()));
    this.newBeer = false;
  }
}

export class Keg {
  public pintsLeft: number = 124;
  constructor(public name: string, public brewery: string, public price: number, public alcoholContent: number) { }
}
