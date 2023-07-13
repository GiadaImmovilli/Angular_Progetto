import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Archivio } from '../archivio';
import { Libro } from '../libro';
import { PrestitoComponent } from './prestito/prestito.component';
import { RestituzioneComponent } from './restituzione/restituzione.component';
import { RimozioneComponent } from './rimozione/rimozione.component';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    PrestitoComponent,
    RestituzioneComponent,
    RimozioneComponent,
  ],
})
export class RicercaComponent implements OnInit {
  constructor() {}

  trovato: boolean = false; // true quando sarà restituito un solo libro
  libroTrovato: Libro; // da passare ai figli
  prestaorimuovi: boolean = false;
  restituisci: boolean = false;

  @Input() ricerca: boolean;
  @Input() archivioRicerca: Archivio;
  @Output() nascondi = new EventEmitter();

  ngOnInit() {}

  ricercaSingoloLibro() {
    let inputStringa: HTMLInputElement = document.getElementById(
      'stringaInput'
    ) as HTMLInputElement;
    // conterrà il numero di libri trovati corrispondenti alla stringa inserita
    let occorrenze = document.getElementById('risultatoOccorrenze');
    // conterrà il testo relativo al libro trovato (corrispondenze=1) corrispondente alla stringa inserita
    let risultato = document.getElementById('risultatoRicerca');
    let stringa = inputStringa.value;
    let pattern = /[a-z]*\s?[a-z]*/;
    let libriTrovati: Array<Libro> = [];

    // Cerca se la stringa è contenuta in almeno un libro
    if (stringa === '') {
      occorrenze.innerHTML = 'Nessun libro trovato';
    } else {
      this.archivioRicerca.libriArchivio.forEach((singoloLibro) => {
        if (
          (pattern.test(stringa) &&
            singoloLibro['autore']
              .toLowerCase()
              .includes(stringa.toLowerCase())) ||
          singoloLibro['titolo'].toLowerCase().includes(stringa.toLowerCase())
        ) {
          libriTrovati.push({
            titolo: singoloLibro['titolo'],
            autore: singoloLibro['autore'],
            posizione: singoloLibro['posizione'],
            nominativo: singoloLibro['nominativo'],
          });
        }
      });
    }
    occorrenze.innerHTML = '';

    // stampa del risultato
    if (libriTrovati.length == 1) {
      this.trovato = true; // non serve più l'input della ricerca
      occorrenze.innerHTML = '';

      this.libroTrovato = libriTrovati[0];

      risultato.innerHTML =
        '<b>' +
        this.libroTrovato['posizione'] +
        '<br>Titolo: </b>' +
        this.libroTrovato['titolo'] +
        '<br><b>Autore: </b>' +
        this.libroTrovato['autore'];

      if (this.libroTrovato['nominativo'] == 'none') {
        this.prestaorimuovi = true; // se vuole può prenderlo in prestito
      } else {
        this.restituisci = true;
      }
    } else {
      occorrenze.innerHTML = 'Libri trovati: ' + libriTrovati.length;
    }
  }

  nascondiRicerca() {
    this.ricerca = false;
    this.nascondi.emit();
  }

  nascondiPrestitoRimozione() {
    this.ricerca = false;
    this.trovato = false;
    this.prestaorimuovi = false;
    this.nascondiRicerca(); // per passarlo a root
  }

  nascondiBtnRestituzione() {
    this.ricerca = false;
    this.trovato = false;
    this.restituisci = false;
    this.nascondiRicerca(); // per passarlo a root
  }
}
