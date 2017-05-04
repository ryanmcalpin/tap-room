import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Keg } from './keg.model';

@Component({
  selector: 'edit-keg',
  template:`
  <div *ngIf="selectedKeg">
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
    <button (click)="doneClicked()" class="btn-xs">DONE</button>
  </div>
  `
})

export class EditKegComponent {
  @Input() selectedKeg: Keg;
  @Output() doneButtonClickSender = new EventEmitter();

  doneClicked() {
    this.doneButtonClickSender.emit();
  }
}
