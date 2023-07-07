import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Libro } from '../../libro';
import { Archivio } from '../../archivio';
import { AccessoArchivioService } from '../../accesso-archivio.service';

@Component({
  selector: 'app-prestito',
  templateUrl: './prestito.component.html',
  styleUrls: ['./prestito.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class PrestitoComponent implements OnInit {
  constructor() {}

  @Input() prestaorimuovi: boolean; // info del libro
  @Input() ricerca: boolean;
  @Input() libroTrovato: Libro;
  @Input() archivioRicerca: Archivio;
  @Output() nascondiP = new EventEmitter<boolean>();

  ngOnInit() {}

  confermaPrestito() {
    this.nascondiPrestito();
  }
  nascondiPrestito() {
    this.ricerca = false;
    this.prestaorimuovi = false;
    this.nascondiP.emit(this.ricerca);
  }
}
