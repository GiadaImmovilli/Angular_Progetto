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
  archivio: Array<Libro> = [];
  constructor(private archivioAppoggio: AccessoArchivioService) {}

  @Input() ricerca: boolean;
  @Output() nascondi = new EventEmitter<boolean>();

  ngOnInit() {}

  ricercaLibro() {
    this.nascondiRicerca();
  }

  nascondiRicerca() {
    this.ricerca = false;
    this.nascondi.emit(this.ricerca);
  }
  // var nuovoArchivio = new Archivio(this.archivioAppoggio);

  //   this.archivioAppoggio.getDB().subscribe({
  //     next: (res: AjaxResponse<any>) => {
  //       this.archivio = res.response;
  //       // document.getElementById('output').innerHTML = String(this.archivio);
  //       this.archivio = JSON.parse(res.response);
  //       nuovoArchivio.inserimentoLibro(nuovoLibro, this.archivio);
  //     },
  //     error: (err: AjaxError) => console.error(err.response),
  //   });
}
