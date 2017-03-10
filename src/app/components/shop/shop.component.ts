import {Component, OnInit, ViewChild} from "@angular/core"
import {HttpService} from "../../services/http.service";
import {DataParseService} from "../../services/DataParseService";
import {Observable} from "rxjs/Rx"

let parseString = require("xml2js").parseString;

@Component({
  templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit {


  items: any[] = [];
  shownItems: any[] = [];
  @ViewChild("search") search;

  mwmenutest: any[] = [];

  constructor(private httpService: HttpService, private dataParse: DataParseService) {

  }

  ngOnInit(): void {

    this.httpService.getForms().subscribe(response=> {
      parseString(response, (err, result)=> {
        //this.items = this.dataParse.parseShopItems(result);
        //this.shownItems=this.items;
        //console.log(result.formvalues.subforms);
        this.mwmenutest = this.dataParse.parseForm(result);
      });
    });


    this.httpService.getShops().subscribe(response=> {
      parseString(response, (err, result)=> {
        this.items = this.dataParse.parseShopItems(result);
        this.shownItems=this.items;
      });
    });

    //Create an observable from the input event
    Observable.fromEvent(this.search.nativeElement, "input")
      .debounceTime(300)
      .subscribe((e:Event)=> {
        //Filters the elements
        this.shownItems = this.items.filter((item)=> {
          for (let key in item) {
            if (item.hasOwnProperty(key) && item[key].indexOf((e.target as HTMLInputElement).value) > -1) {
              return true
            }
          }
          return false;
        })
      });
  }
}
