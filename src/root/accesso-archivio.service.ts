import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';

@Injectable()
export class AccessoArchivioService {
  constructor() {}

  public getDB(): Observable<AjaxResponse<any>> {
    return ajax({
      method: 'GET',
      url: 'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint/get?key=efb76e19',
      crossDomain: true,
    });
  }
}
