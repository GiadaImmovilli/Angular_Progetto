import { Libro } from './libro';
import { AccessoArchivioService } from './accesso-archivio.service';
import { AjaxResponse, AjaxError } from 'rxjs/ajax';

export class Archivio {
  libriArchivio: Array<Libro> = [];
  archivioAppoggio: AccessoArchivioService;

  constructor(archivioAppoggio: AccessoArchivioService) {
    this.archivioAppoggio = archivioAppoggio;
  }

  inserimentoLibro(libroInserito: Libro) {
    this.libriArchivio.push(libroInserito);
    this.archivioAppoggio.setDB(this.libriArchivio).subscribe({
      next: (res: AjaxResponse<any>) =>
        console.log('Libro inserito correttamente.'),
      error: (err: AjaxError) =>
        console.error("Problema con l'inserimento del libro: " + err.response),
    });
  }

  rimozioneLibro(libroDaEliminare: Libro) {
    let libriArAggiornato;
    libriArAggiornato = this.libriArchivio.filter((singoloLibro) => {
      return singoloLibro['posizione'] !== libroDaEliminare['posizione'];
    });

    this.archivioAppoggio.setDB(libriArAggiornato).subscribe({
      next: (res: AjaxResponse<any>) =>
        console.log('Libro rimosso correttamente.'),
      error: (err: AjaxError) =>
        console.error('Problema con la rimozione del libro: ' + err.response),
    });
  }

  prestitoLibro(libroDaPrendere: Libro, nomeInserito: string) {
    this.libriArchivio.forEach((singoloLibro) => {
      if (singoloLibro['posizione'] == libroDaPrendere['posizione']) {
        singoloLibro['nominativo'] = nomeInserito;
      }
    });

    this.archivioAppoggio.setDB(this.libriArchivio).subscribe({
      next: (res: AjaxResponse<any>) =>
        console.log('Libro prestato correttamente.'),
      error: (err: AjaxError) =>
        console.error('Problema con il prestito del libro: ' + err.response),
    });
  }

  restituzioneLibro(libroDaDare: Libro) {
    this.libriArchivio.forEach((singoloLibro) => {
      if (singoloLibro['titolo'] == libroDaDare['titolo']) {
        singoloLibro['nominativo'] = 'none';
      }
    });

    this.archivioAppoggio.setDB(this.libriArchivio).subscribe({
      next: (res: AjaxResponse<any>) =>
        console.log('Libro restituito correttamente.'),
      error: (err: AjaxError) =>
        console.error(
          'Problema con la restituzione del libro: ' + err.response
        ),
    });
  }
}
