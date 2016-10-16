import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class HttpService {

  constructor(private http: Http) { }

  getUmbPageData(url){
      return this.http.get('http://umb.dynamikfabrikken.com/umbraco/api/contentApi/getData?url=' + url)
      .map((response: Response) => response.json());
  }
}
