import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Libro } from '../../libro';
import { Archivio } from '../../archivio';

@Component({
  selector: 'app-rimozione',
  templateUrl: './rimozione.component.html',
  styleUrls: ['./rimozione.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class RimozioneComponent implements OnInit {
  constructor() {}

  @Input() prestaorimuovi: boolean;
  @Input() libroTrovato: Libro;
  @Input() archivioRicerca: Archivio;
  @Output() nascondiR = new EventEmitter();

  ngOnInit() {}

  confermaRimozione() {
    this.archivioRicerca.rimozioneLibro(this.libroTrovato);
    this.nascondiRimozione();
  }

  nascondiRimozione() {
    this.prestaorimuovi = false;
    this.nascondiR.emit();
  }
}
