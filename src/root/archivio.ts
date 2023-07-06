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
    let indice: number = this.libriArchivio.indexOf(libroDaEliminare); // trova l'indice del libro che si vuole eliminare nell'archivio
    // this.libriArchivio.forEach((singoloLibro) => {
    //   if(singoloLibro == libroTrovato)
    //   {
    //     this.libriArchivio.splice(indice,1);
    //     this.archivioAppoggio.setDB(this.libriArchivio).subscribe({
    //       next: (res: AjaxResponse<any>) => {},
    //       error: (err: AjaxError) => console.error(err.response),
    //     });
    //   }
    // });
    this.libriArchivio.splice(indice, 1); // elimina l'elemento di posto indice
    this.archivioAppoggio.setDB(this.libriArchivio).subscribe({
      next: (res: AjaxResponse<any>) => {},
      error: (err: AjaxError) => console.error(err.response),
    });
  }
}
