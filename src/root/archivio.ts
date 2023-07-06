import { Libro } from './libro';
import { AccessoArchivioService } from './accesso-archivio.service';
import { AjaxResponse, AjaxError } from 'rxjs/ajax';

export class Archivio {
  libriArchivio: Array<Libro> = []; // attributo della classe Archivio
  archivioAppoggio: AccessoArchivioService;

  constructor(archivioAppoggio: AccessoArchivioService) {
    this.archivioAppoggio = archivioAppoggio;
    // this.archivioAppoggio.getDB().subscribe({
    //   next: (res: AjaxResponse<any>) => {
    //     this.archivio = JSON.parse(res.response);
    //     document.getElementById('output').innerHTML = String(this.archivio);
    //   },
    //   error: (err: AjaxError) => console.error(err.response),
    // });
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
      return singoloLibro['autore'] !== libroDaEliminare['autore'];
    });

    this.archivioAppoggio.setDB(libriArAggiornato).subscribe({
      next: (res: AjaxResponse<any>) => {
        console.log('rimosso' + libroDaEliminare);
      },
      error: (err: AjaxError) => console.error(err.response),
    });
  }
}
