import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessoArchivioService } from '../accesso-archivio.service';
import { Archivio } from '../archivio';
import { Libro } from '../libro';
import { ajax, AjaxResponse, AjaxRequest, AjaxError } from 'rxjs/ajax';

@Component({
  selector: 'app-inserimento',
  templateUrl: './inserimento.component.html',
  styleUrls: ['./inserimento.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class InserimentoComponent implements OnInit {
  constructor(private archivioAppoggio: AccessoArchivioService) {}

  ngOnInit() {}

  @Input() inserisci: boolean;
  // @Input() vecchioArchivio: AccessoArchivioService;
  @Output() nascondi = new EventEmitter<boolean>();

  confermaInserimento() {
    // variabili che reperiscono le stringhe inserite in input
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

    // document.getElementById('output2').innerHTML =
    //   inputTitolo.value + ' ' + inputAutore.value + ' ' + inputPosizione.value;

    let nuovoArchivio = new Archivio(this.archivioAppoggio);

    this.archivioAppoggio.getDB().subscribe({
      next: (res: AjaxResponse<any>) => {
        // nuovoArchivio.libriArchivio = res.response;
        // document.getElementById('output').innerHTML = String(this.archivio);
        nuovoArchivio.libriArchivio = JSON.parse(res.response);
        nuovoArchivio.inserimentoLibro(nuovoLibro);
      },
      error: (err: AjaxError) => console.error(err.response),
    });

    inputTitolo.value = '';
    inputAutore.value = '';
    inputPosizione.value = '';

    // document.getElementById('output').innerHTML = nuovoArchivio.toString();
    this.nascondiInserimento();
  }

  nascondiInserimento() {
    this.inserisci = false;
    this.nascondi.emit(this.inserisci);
  }
}
