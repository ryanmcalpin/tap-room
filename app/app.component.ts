import { Component } from '@angular/core';
import { Keg } from './keg.model';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
      <h1>Tap Room</h1>
      <h2>Beer List</h2>
      <button *ngIf="newBeer===false" (click)="addBeer()" class="btn-lg">TAP KEG</button>
      <new-keg [newBeer]="newBeer" (newKegSender)="addKeg($event)" (cancelSender)="cancel($event)"></new-keg>
      <keg-list [childKegs]="kegs" (clickSender)="editKeg($event)"></keg-list>
      <edit-keg [selectedKeg]="selectedKeg" (doneButtonClickSender)="editDone()"></edit-keg>
  </div>
  `
})

export class AppComponent {
  kegs: Keg[] = [
    new Keg("Black Butte Porter", "Deschutes", 4, 5.2),
    new Keg("Rainier", "Rainier", 2, 4.6),
    new Keg("Pliny the Elder", "Russian River", 6.5, 8),
    new Keg("Litha", "Propolis", 8, 7.5)
  ]
  newBeer = false;
  selectedKeg = null;

  addBeer() {
    this.newBeer = true;
  }

  editKeg(keg: Keg) {
    this.selectedKeg = keg;
  }

  editDone() {
    this.selectedKeg = null;
  }

  addKeg(keg: Keg) {
    this.kegs.push(keg);
    this.newBeer = false;
  }

  cancel(boo) {
    this.newBeer = boo;
  }
}
