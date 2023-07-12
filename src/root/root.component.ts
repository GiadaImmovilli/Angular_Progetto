import { Component, OnInit } from '@angular/core';
import { AccessoArchivioService } from './accesso-archivio.service';
import { RicercaComponent } from './ricerca/ricerca.component';
import { InserimentoComponent } from './inserimento/inserimento.component';
import { CommonModule } from '@angular/common';
import { Archivio } from './archivio';
import { AjaxResponse, AjaxError } from 'rxjs/ajax';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  standalone: true,
  imports: [CommonModule, RicercaComponent, InserimentoComponent],
  providers: [AccessoArchivioService],
})
export class RootComponent implements OnInit {
  constructor(private archivioAppoggio: AccessoArchivioService) {}
  ngOnInit() {}

  inserisci: boolean = false; // fino a quando non viene fatta richiesta di inserire un nuovo libro
  ricerca: boolean = false; // fino a quando non viene fatta richiesta di ricercare un libro
  archivioPresente = new Archivio(this.archivioAppoggio);

  ottieniDB() {
    this.archivioAppoggio.getDB().subscribe({
      next: (res: AjaxResponse<any>) => {
        this.archivioPresente.libriArchivio = JSON.parse(res.response);
        console.log('DB ottenuto correttamente: ');
      },
      error: (err: AjaxError) =>
        console.error('Problema con il download del DB: ' + err.response),
    });
  }

  richiestaInserimento() {
    this.inserisci = true;
    this.ottieniDB();
  }

  nascondiFormInserimento(valore: boolean) {
    this.inserisci = valore;
  }

  richiestaRicerca() {
    this.ricerca = true;
    this.ottieniDB();
  }

  nascondiFormRicerca(valore: boolean) {
    this.ricerca = valore;
  }
}
