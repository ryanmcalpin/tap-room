import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Keg } from './keg.model';

@Component({
  selector: 'new-keg',
  template:`
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
  `
})

export class NewKegComponent {
  @Input() newBeer: boolean;
  @Output() newKegSender = new EventEmitter();
  @Output() cancelSender = new EventEmitter();

  saveBeer(name: string, brewery: string, price: number, alcoholContent: number) {
    if (name==='' || brewery==='' || price<=0 || alcoholContent<=0) {
      alert("Please fill in all the fields!");
    } else {
      var newKeg: Keg = new Keg(name, brewery, price, alcoholContent);
      this.newKegSender.emit(newKeg);
    }
  }

  cancel() {
    this.cancelSender.emit(false);
  }
}
