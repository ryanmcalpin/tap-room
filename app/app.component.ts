import { Component } from '@angular/core';
import { Keg } from './keg.model';

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

      <keg-list [childKegs]="kegs" (clickSender)="editKeg($event)"></keg-list>

      <edit-keg [selectedKeg]="selectedKeg" (doneButtonClickSender)="editDone()"></edit-keg>
  </div>
  `
})

export class AppComponent {
  kegs: Keg[] = [
    new Keg("Black Butte Porter", "Deschutes Brewery", 4, 5.2),
    new Keg("Rainier", "Rainier Beer", 2, 4.6)
  ]
  newBeer = false;
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
    this.selectedKeg = keg;
  }

  editDone() {
    this.selectedKeg = null;
  }

}
