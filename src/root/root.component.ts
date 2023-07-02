import { Component, OnInit } from '@angular/core';
import { AccessoArchivioService } from './accesso-archivio.service';
import { RicercaComponent } from './ricerca/ricerca.component';
import { InserimentoComponent } from './inserimento/inserimento.component';
import { CommonModule } from '@angular/common';
import { Archivio } from './archivio';
import { AjaxResponse } from 'rxjs/ajax';

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

  archivio = new Archivio(this.archivioAppoggio);
  inserisci: boolean = false; // fino a quando non viene fatta richiesta di inserire un nuovo libro

  richiestaInserimento() {
    this.inserisci = true; // è stato cliccato il bottone per inserire un libro
  }
}
