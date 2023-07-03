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
  archivio: Array<Libro> = [];
  constructor(private archivioAppoggio: AccessoArchivioService) {}

  ngOnInit() {}

  @Input() inserisci: boolean;
  // @Input() vecchioArchivio: AccessoArchivioService;
  @Output() inserisciFalse = new EventEmitter<string>();

  confermaInserimento() {
    // variabili che reperiscono le stringhe inserite in input
    var inputTitolo: HTMLInputElement = document.getElementById(
      'titoloInserito'
    ) as HTMLInputElement;
    var inputAutore: HTMLInputElement = document.getElementById(
      'autoreInserito'
    ) as HTMLInputElement;
    var inputPosizione: HTMLInputElement = document.getElementById(
      'posizioneInserita'
    ) as HTMLInputElement;

    // variabili che contengono le stringhe reperite in input
    var nuovoTitolo = inputTitolo.value;
    var nuovoAutore = inputAutore.value;
    var nuovaPosizione = inputPosizione.value;

    // nuovo libro creato con la classe Libro e i parametri inseriti in input
    var nuovoLibro = new Libro(nuovoTitolo, nuovoAutore, nuovaPosizione, ''); // All'inserimento di un libro, il nominativo è vuoto

    // document.getElementById('output2').innerHTML =
    //   inputTitolo.value + ' ' + inputAutore.value + ' ' + inputPosizione.value;

    var nuovoArchivio = new Archivio(this.archivioAppoggio);

    this.archivioAppoggio.getDB().subscribe({
      next: (res: AjaxResponse<any>) => {
        this.archivio = res.response;
        // document.getElementById('output').innerHTML = String(this.archivio);
        this.archivio = JSON.parse(res.response);
        nuovoArchivio.inserimentoLibro(nuovoLibro, this.archivio);
      },
      error: (err: AjaxError) => console.error(err.response),
    });

    inputTitolo.value = '';
    inputAutore.value = '';
    inputPosizione.value = '';

    // document.getElementById('output').innerHTML = nuovoArchivio.toString();

    this.inserisci = false;
  }

}
