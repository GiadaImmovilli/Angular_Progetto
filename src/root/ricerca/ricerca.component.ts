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
    this.archivioAppoggio.getDB().subscribe({
      next: (res: AjaxResponse<any>) => {
        archivioRicerca.libriArchivio = res.response; // riempie l'array che verrà utilizzato nel forEach
        // alert(this.listaLibri);
      },
      error: (err: AjaxError) => console.error(err.response),
    });

    var inputStringa: HTMLInputElement = document.getElementById(
      'stringaInput'
    ) as HTMLInputElement;
    // conterrà i libri che corrispondono alla stringa inserita
    var libriTrovati: Array<Libro> = [];
    // conterrà il numero di libri trovati corrispondenti alla stringa inserita
    var occorrenze: HTMLInputElement = document.getElementById(
      'risultatoOccorrenze'
    ) as HTMLInputElement;
    // conterrà il testo relativo al libro trovato (corrispondenze=1) corrispondente alla stringa inserita
    var risultato: HTMLInputElement = document.getElementById(
      'risultatoRicerca'
    ) as HTMLInputElement;

    var stringa = inputStringa.value;

    if (stringa === '') {
      occorrenze.value = 'Nessun libro trovato';
    } else {
      alert('ciao');
      archivioRicerca.libriArchivio.forEach((singoloLibro) =>
        archivioRicerca.ricercaLibri(stringa, singoloLibro, libriTrovati)
      );

      occorrenze.value = '';

      if (libriTrovati.length == 1) {
        libriTrovati.forEach(
          (singoloLibro) =>
            (risultato.value =
              ' "' + singoloLibro['titolo'] + '" ' + singoloLibro['autore'])
        );
      } else {
        occorrenze.value = 'Libri trovati: ' + libriTrovati.length;
      }
    }
  }

  nascondiRicerca() {
    this.ricerca = false;
    this.nascondi.emit(this.ricerca);
  }
}
