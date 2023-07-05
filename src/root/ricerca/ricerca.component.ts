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
    let archivioRicerca = new Archivio(this.archivioAppoggio);
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
        archivioRicerca.libriArchivio = JSON.parse(res.response); // riempie l'array che verrà utilizzato nel forEach

        // Cerca se la stringa è contenuta in almeno un libro
        if (stringa === '') {
          occorrenze.innerHTML = 'Nessun libro trovato';
        } else {
          archivioRicerca.libriArchivio.forEach((singoloLibro) => {
            if (
              pattern.test(stringa) &&
              singoloLibro['autore']
                .toLowerCase()
                .includes(stringa.toLowerCase()) ||
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
          risultato.innerHTML = '';
          libriTrovati.forEach(
            (singoloLibro) =>
              (risultato.innerHTML +=
                ' <h4>Descrizione documento:</h4>"' + singoloLibro['posizione'] + '" <br>Autore:' + singoloLibro['autore'] + '<br>Titolo:' + singoloLibro['titolo'])
          );
          occorrenze.innerHTML = '';
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
}
