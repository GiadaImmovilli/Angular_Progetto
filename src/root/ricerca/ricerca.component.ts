import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessoArchivioService } from '../accesso-archivio.service';
import { Archivio } from '../archivio';
import { Libro } from '../libro';
import { ajax, AjaxResponse, AjaxRequest, AjaxError } from 'rxjs/ajax';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class RicercaComponent implements OnInit {
  constructor(private archivioAppoggio: AccessoArchivioService) {}

  @Input() ricerca: boolean;
  @Output() nascondi = new EventEmitter<boolean>();

  ngOnInit() {}

  ricercaSingoloLibro() {
    var archivioRicerca = new Archivio(this.archivioAppoggio);

    var inputStringa: HTMLInputElement = document.getElementById(
      'stringaInput'
    ) as HTMLInputElement;
    // conterrà i libri che corrispondono alla stringa inserita
    var libriTrovati: Array<Libro> = [];
    // conterrà il numero di libri trovati corrispondenti alla stringa inserita
    var occorrenze = document.getElementById('risultatoOccorrenze');
    // conterrà il testo relativo al libro trovato (corrispondenze=1) corrispondente alla stringa inserita
    var risultato = document.getElementById('risultatoRicerca');
    var stringa = inputStringa.value;

    this.archivioAppoggio.getDB().subscribe({
      next: (res: AjaxResponse<any>) => {
        archivioRicerca.libriArchivio = res.response; // riempie l'array che verrà utilizzato nel forEach
        if (stringa === '') {
          occorrenze.innerHTML = 'Nessun libro trovato';
        } else {
          
          alert("ciao");
          libriTrovati = archivioRicerca.ricercaLibri(stringa);

          occorrenze.innerHTML = '';

          if (libriTrovati.length == 1) {
            risultato.innerHTML = 'libro trovato';
          } else {
            occorrenze.innerHTML = 'Libri trovati: ' + libriTrovati.length;
          }
        }
      },
      error: (err: AjaxError) => console.error(err.response),
    });
  }

  nascondiRicerca() {
    this.ricerca = false;
    this.nascondi.emit(this.ricerca);
  }
}
