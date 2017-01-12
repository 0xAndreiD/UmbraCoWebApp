/**
 * Created by User on 20.10.2016.
 */

import {Component, Input} from "@angular/core";
import {IMenuItem} from "../../model/IMenuItem";
import {HttpService} from "../../services/http.service";

@Component({
  selector: "main-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent {
  @Input() menuItems:IMenuItem[]=[]

  is_menutab_opened:boolean = false;
  is_searchtab_opened:boolean = false;

  nav_mode:string = '';

  umbpagegeneral;

  constructor(private http: HttpService){
  }

  ngOnInit():void {
    this.http.getUmbPageGeneralData()
      .subscribe(
        (umbpagegeneraldata: any) => {
          //The problem was that you received an array from server but used as object
          this.umbpagegeneral = umbpagegeneraldata.data[0];
        });
  }

  private onOpenNavbar(cases:string):void {
    if (cases == 'MENU') {
      this.is_menutab_opened = !this.is_menutab_opened;
      this.is_searchtab_opened = false;
    } else {
      this.is_searchtab_opened = !this.is_searchtab_opened;
      this.is_menutab_opened = false;
    }
    this.nav_mode = cases;
  }

  private getWidthMenuTab():string {
    if(this.is_menutab_opened)  return "300px";
    else return "0px";
  }

  private getWidthSearchTab():string {
    if(this.is_searchtab_opened)  return "100%";
    else return "0px";
  }

  private getClass():string {
    if (this.is_menutab_opened || this.is_searchtab_opened){
      return this.nav_mode;
    } else {
      return '';
    }
  }

}
