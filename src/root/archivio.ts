import { Libro } from './libro';
import { AccessoArchivioService } from './accesso-archivio.service';
import { AjaxResponse, AjaxError } from 'rxjs/ajax';

export class Archivio {
  archivio: Array<Libro> = [];
  archivioAppoggio: AccessoArchivioService;

  constructor(archivioAppoggio: AccessoArchivioService) {
    this.archivioAppoggio = archivioAppoggio;
    this.archivioAppoggio.getDB().subscribe({
      next: (res: AjaxResponse<any>) => {
        document.getElementById('output').innerHTML = res.response;
      },
      error: (err: AjaxError) => console.error(err.response),
    });
  }

  // constructor(listaLibri: ){
  //   this.listaLibri = listaLibri;
  // }
}
