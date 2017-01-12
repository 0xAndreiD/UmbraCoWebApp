import {Component,ViewChild,OnInit} from "@angular/core";
import {Input} from "@angular/core";
import {HttpService} from "../../../services/http.service";
import {DataParseService} from "../../../services/DataParseService";
import {Observable} from "rxjs/Rx"

let parseString = require("xml2js").parseString;

@Component({
  selector: "menu-search",
  templateUrl: "./menu.search.component.html",
  styleUrls: ["./menu.search.component.css"]
})
export class MenuSearchComponent {


  items: any[] = [];
  shownItems: any[] = [];
  @ViewChild("search") search;

  is_search_focused:boolean = false;

  constructor(
    private httpService: HttpService,
    private dataParse: DataParseService
  ){

  }

  ngOnInit():void{

    this.httpService.getShops().then(response=> {
      parseString(response, (err, result)=> {
        this.items = this.dataParse.parseShopItems(result);
        this.shownItems = this.items;
        console.log(this.shownItems);
      });
    });

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
        });
      });
  }

}
