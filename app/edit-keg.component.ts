import { Component, Input, Output, EventEmitter, AfterViewChecked, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Keg } from './keg.model';

@Component({
  selector: 'edit-keg',
  template:`
  <div #scroller *ngIf="selectedKeg">
    <label>Pints Left:</label>
    <input [(ngModel)]="selectedKeg.pintsLeft" type="number" id="editPints">
    <label>Beer:</label>
    <input [(ngModel)]="selectedKeg.name">
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
  @ViewChild('scroller') private myScrollContainer: ElementRef;

  ngOnInit() {
    if (this.selectedKeg) {
      window.scrollTo(0,document.body.scrollHeight);
    }
  }

  ngAfterViewChecked() {
    if (this.selectedKeg) {
      window.scrollTo(0,document.body.scrollHeight);
    }
  }

  scrollToBottom(): void {
    if (this.selectedKeg) {
      try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }
    }
  }

  doneClicked() {
    this.doneButtonClickSender.emit();
  }
}
