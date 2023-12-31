import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Libro } from '../../libro';
import { Archivio } from '../../archivio';

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
  @Input() libroTrovato: Libro;
  @Input() archivioRicerca: Archivio;
  @Output() nascondiP = new EventEmitter();

  ngOnInit() {}

  confermaPrestito() {
    let inputStringa: HTMLInputElement = document.getElementById(
      'nomeInput'
    ) as HTMLInputElement;
    let nome = inputStringa.value;
    this.archivioRicerca.prestitoLibro(this.libroTrovato, nome);
    this.nascondiPrestito();
  }
  nascondiPrestito() {
    this.prestaorimuovi = false;
    this.nascondiP.emit();
  }
}
