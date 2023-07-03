import { Component, OnInit, Input } from '@angular/core';
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
  constructor() {}

  ngOnInit() {}

  @Input() inserisci: boolean;
  @Input() vecchioArchivio: AccessoArchivioService;

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

    inputTitolo.value = '';
    inputAutore.value = '';
    inputPosizione.value = '';
  }

  tornaIndietro() {
    // this.inserisci = false;
  }
}
