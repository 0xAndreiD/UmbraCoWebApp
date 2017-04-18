import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx'
import {PromiseObservable} from 'rxjs/observable/PromiseObservable';

import Settings from './settings';
//import 'rxjs/Rx';

var domainname = "http://umb.dynamikfabrikken.com/";
//domainname = "http://localhost:50947/";
let pageid= '';
@Injectable()
export class HttpService {
  constructor(private http: Http) {
    pageid = Settings[window.location.hostname].pageid;
  }

  getUmbPageData(url, subpage?): Observable<any>{
    return this.http.get( `${domainname}umbraco/api/contentApi/getData?pageid=${pageid}&url=${url || ''}/${subpage || ''}` )
                    .map((response: Response) => response.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getUmbPageGeneralData(): Observable<any>{
    return this.http.get( `${domainname}umbraco/api/contentApi/GetGeneralData/?pageid=${pageid}` )
                    .map((response: Response) => response.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  /**
   * loads menu
   * @returns {Promise<any>}
   */
  getMenu(): Observable<any> {
    //It is needed to be sure that menu data is loaded once
    let loadPromise:Promise<any>=null;
    let that=this;
    return (function (): Observable<any> {
      if(loadPromise==null) {
        loadPromise=new Promise<any>((resolve)=>{
          that.http.get( `${domainname}umbraco/api/contentApi/getTree/?pageid=${pageid}`)
            .map(response=>response.json()).subscribe((response)=>{
              resolve(response)
          })
        });
        return PromiseObservable.create(loadPromise);
      } else {
        return PromiseObservable.create(loadPromise);
      }
    })();
  }

  getForm(formid): Observable<any>{
      return this.http.get( `${domainname}umbraco/api/contentApi/getform?formid=${formid}`)
                      .map((response: Response) => response.json())
                      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getShops():Observable<any> {
    return PromiseObservable.create(
      new Promise<any>((resolve, reject)=>{
        this.http.get("https://demodk.mindworking.eu/resources/search/Cases.xml?deviceid=mwipad&searchtype=simpleWildCard&Status=Til%20salg&ReturnAllSolrFields=true&SimpleWildCardVal=s")
        .map(response=>response.text())
        .subscribe(resolve);
      })
    );
  }

  getForms():Observable<any> {
  return PromiseObservable.create(
    new Promise<any>((resolve, reject)=>{
      this.http.get("https://thomasjorgensen.mindworking.eu/resources/form/websiteProjects/data.xml?deviceid=mwipad")
      .map(response=>response.text())
      .subscribe(resolve);
    })
  );
}

}
