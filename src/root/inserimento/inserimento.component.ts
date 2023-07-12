import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Archivio } from '../archivio';
import { Libro } from '../libro';

@Component({
  selector: 'app-inserimento',
  templateUrl: './inserimento.component.html',
  styleUrls: ['./inserimento.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class InserimentoComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @Input() inserisci: boolean;
  @Input() archivioInserimento: Archivio;
  @Output() nascondi = new EventEmitter<boolean>();

  confermaInserimento() {
    let inputTitolo: HTMLInputElement = document.getElementById(
      'titoloInserito'
    ) as HTMLInputElement;
    let inputAutore: HTMLInputElement = document.getElementById(
      'autoreInserito'
    ) as HTMLInputElement;
    let inputPosizione: HTMLInputElement = document.getElementById(
      'posizioneInserita'
    ) as HTMLInputElement;

    // variabili che contengono le stringhe reperite in input
    let nuovoTitolo = inputTitolo.value;
    let nuovoAutore = inputAutore.value;
    let nuovaPosizione = inputPosizione.value;

    // nuovo libro creato con la classe Libro e i parametri inseriti in input
    let nuovoLibro = new Libro(
      nuovoTitolo,
      nuovoAutore,
      nuovaPosizione,
      'none'
    ); // All'inserimento di un libro, il nominativo è vuoto

    this.archivioInserimento.inserimentoLibro(nuovoLibro);

    inputTitolo.value = '';
    inputAutore.value = '';
    inputPosizione.value = '';

    this.nascondiInserimento();
  }

  nascondiInserimento() {
    this.inserisci = false;
    this.nascondi.emit(this.inserisci);
  }
}
