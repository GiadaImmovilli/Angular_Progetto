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

  ricercaLibri(
    stringaInserita: string,
    libro: Libro,
    libriTrovati: Array<Libro>
  ) {
    // Togliere gli spazi prima e dopo la stringa
    stringaInserita = stringaInserita.trim();
    // console.log(stringaInserita);
    // Pattern per l'espressione regolare che accetta una città
    var pattern = /[a-z]*\s?[a-z]*/;

    if (
      pattern.test(stringaInserita) &&
      (libro['autore'].toLowerCase().includes(stringaInserita.toLowerCase()) ||
        libro['titolo'].toLowerCase().includes(stringaInserita.toLowerCase()))
    ) {
      libriTrovati.push({
        titolo: libro['titolo'],
        autore: libro['autore'],
        posizione: libro['posizione'],
        nominativo: libro['nominativo'],
      });
    }
  }

  // constructor(listaLibri: ){
  //   this.listaLibri = listaLibri;
  // }
}
