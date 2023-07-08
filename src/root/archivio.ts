import { Libro } from './libro';
import { AccessoArchivioService } from './accesso-archivio.service';
import { AjaxResponse, AjaxError } from 'rxjs/ajax';

export class Archivio {
  libriArchivio: Array<Libro> = []; // attributo della classe Archivio
  archivioAppoggio: AccessoArchivioService;

  constructor(archivioAppoggio: AccessoArchivioService) {
    this.archivioAppoggio = archivioAppoggio;
  }

  inserimentoLibro(libroInserito: Libro) {
    this.libriArchivio.push(libroInserito);
    // document.getElementById('output').innerHTML = String(this.archivio);
    this.archivioAppoggio.setDB(this.libriArchivio).subscribe({
      next: (res: AjaxResponse<any>) => {},
      error: (err: AjaxError) => console.error(err.response),
    });
  }

  rimozioneLibro(libroDaEliminare: Libro) {
    let libriArAggiornato;
    libriArAggiornato = this.libriArchivio.filter((singoloLibro) => {
      return singoloLibro['posizione'] !== libroDaEliminare['posizione'];
    });

    this.archivioAppoggio.setDB(libriArAggiornato).subscribe({
      next: (res: AjaxResponse<any>) => {
        console.log('rimosso' + libroDaEliminare);
      },
      error: (err: AjaxError) => console.error(err.response),
    });
  }

  prestitoLibro(libroDaPrendere: Libro, nomeInserito: string) {
    this.libriArchivio.forEach((singoloLibro) => {
      if (singoloLibro['posizione'] == libroDaPrendere['posizione']) {
        singoloLibro['nominativo'] = nomeInserito;
      }
    });

    this.archivioAppoggio.setDB(this.libriArchivio).subscribe({
      next: (res: AjaxResponse<any>) => {},
      error: (err: AjaxError) => console.error(err.response),
    });
  }

  restituzioneLibro(libroDaDare: Libro) {
    this.libriArchivio.forEach((singoloLibro) => {
      if (singoloLibro['titolo'] == libroDaDare['titolo']) {
        singoloLibro['nominativo'] = 'none';
      }
    });

    this.archivioAppoggio.setDB(this.libriArchivio).subscribe({
      next: (res: AjaxResponse<any>) => {},
      error: (err: AjaxError) => console.error(err.response),
    });
  }
}
