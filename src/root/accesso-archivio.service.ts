import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { Libro } from './libro';

@Injectable()
export class AccessoArchivioService {
  constructor() {}

  key: string = 'efb76e19';
  urlPrefisso: string =
    'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint';

  public getDB(): Observable<AjaxResponse<any>> {
    return ajax({
      method: 'GET',
      url: this.urlPrefisso + '/get?key=' + this.key,
      crossDomain: true,
    });
  }

  public setDB(nuovoDB: Array<Libro>) {
    const nuovoDBStringa = JSON.stringify(nuovoDB);
    return ajax({
      method: 'POST',
      url: this.urlPrefisso + '/set?key=' + this.key,
      crossDomain: true,
      body: nuovoDBStringa,
    });
  }
}
