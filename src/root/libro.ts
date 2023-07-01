export class Libro {
  titolo: string;
  autore: string;
  posizione: string;
  nominativo: string;

  constructor(
    titolo: string,
    autore: string,
    posizione: string,
    nominativo: string
  ) {
    this.titolo = titolo;
    this.autore = autore;
    this.posizione = posizione;
    this.nominativo = nominativo;
  }
}
