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
      return singoloLibro['titolo'] !== libroDaEliminare['titolo'];
    });

    this.archivioAppoggio.setDB(libriArAggiornato).subscribe({
      next: (res: AjaxResponse<any>) => {
        console.log('rimosso' + libroDaEliminare);
      },
      error: (err: AjaxError) => console.error(err.response),
    });
  }

  prestitoLibro(libroDaPrendere: Libro, nomeInserito: string) {
    let libriArAggiornato;
    this.libriArchivio.forEach((singoloLibro) => {
      if (singoloLibro['titolo'] == libroDaPrendere['titolo']) {
        singoloLibro['nominativo'] = nomeInserito;
      }
    });

    this.archivioAppoggio.setDB(this.libriArchivio).subscribe({
      next: (res: AjaxResponse<any>) => {},
      error: (err: AjaxError) => console.error(err.response),
    });
    console.log(this.libriArchivio);
  }
}
