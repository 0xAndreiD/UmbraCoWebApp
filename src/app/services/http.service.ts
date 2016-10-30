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

  /**
   * loads menu
   * @returns {Promise<any>}
   */
  getMenu():Promise<any> {
    //It is needed to be sure that menu data is loaded once
    let loadPromise:Promise<any>=null;
    let that=this;
    return (function ():Promise<any> {
      if(loadPromise==null) {
        loadPromise=new Promise<any>((resolve)=>{
          that.http.get("http://umb.dynamikfabrikken.com/umbraco/api/contentApi/getTree")
            .map(response=>response.json()).subscribe((response)=>{
              resolve(response)
          })
        });
        return loadPromise;
      } else {
        return loadPromise;
      }
    })();
  }

    getShops():Promise<any> {
    return new Promise<any>((resolve, reject)=>{
      this.http.get("https://demodk.mindworking.eu/resources/search/Cases.xml?deviceid=mwipad&searchtype=simpleWildCard&Status=Til%20salg&ReturnAllSolrFields=true&SimpleWildCardVal=s")
        .map(response=>response.text())
        .subscribe(resolve);
    })
  }
}
