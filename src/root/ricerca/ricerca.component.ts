import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessoArchivioService } from '../accesso-archivio.service';
import { Archivio } from '../archivio';
import { Libro } from '../libro';
import { ajax, AjaxResponse, AjaxRequest, AjaxError } from 'rxjs/ajax';
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
  constructor(private archivioAppoggio: AccessoArchivioService) {}

  trovato: boolean = false; // true quando sarà restituito un solo libro
  prestato: boolean; // true se il libro è prestato, false altrimenti
  libroTrovato: Libro; // da passare ai figli
  archivioRicerca = new Archivio(this.archivioAppoggio);

  @Input() ricerca: boolean;
  @Output() nascondi = new EventEmitter<boolean>();

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

    this.archivioAppoggio.getDB().subscribe({
      next: (res: AjaxResponse<any>) => {
        this.archivioRicerca.libriArchivio = JSON.parse(res.response);

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
              singoloLibro['titolo']
                .toLowerCase()
                .includes(stringa.toLowerCase())
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
          risultato.innerHTML = '';
          this.libroTrovato = libriTrovati[0];
          occorrenze.innerHTML = '';

          this.trovato = true; // non serve più l'input della ricerca

          if (this.libroTrovato['nominativo'] == 'none') {
            this.prestato = false;
          } else {
            this.prestato = true;
          }
        } else {
          risultato.innerHTML = '';
          occorrenze.innerHTML = 'Libri trovati: ' + libriTrovati.length;
        }
        // console.log(libriTrovati);
      },
      error: (err: AjaxError) => console.error(err.response),
    });
  }

  nascondiRicerca() {
    this.ricerca = false;
    this.nascondi.emit(this.ricerca);
  }

  nascondiBtnRimozione(valore: boolean) {
    this.ricerca = valore;
    this.trovato = false;
    this.nascondiRicerca();
  }
}
