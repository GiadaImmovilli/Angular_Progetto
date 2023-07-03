import { Libro } from './libro';
import { AccessoArchivioService } from './accesso-archivio.service';
import { AjaxResponse, AjaxError } from 'rxjs/ajax';

export class Archivio {
  // archivio: Array<Libro> = [];
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

  inserimentoLibro(libroInserito: Libro, archivio: Array<Libro>) {
    archivio.push(libroInserito);
    // document.getElementById('output').innerHTML = String(this.archivio);
    this.archivioAppoggio.setDB(archivio).subscribe({
      next: (res: AjaxResponse<any>) => {},
      error: (err: AjaxError) => console.error(err.response),
    });
  }

  // constructor(listaLibri: ){
  //   this.listaLibri = listaLibri;
  // }
}
