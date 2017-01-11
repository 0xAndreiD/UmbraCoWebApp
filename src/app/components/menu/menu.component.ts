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

  is_navbar_opened:boolean = false;
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
    this.is_navbar_opened = !this.is_navbar_opened;
    this.nav_mode = cases;
  }

  private getWidth():string {
    if(this.is_navbar_opened)  return "300px";
    else return "0px";
  }

  private getClass():string {
    if (this.is_navbar_opened){
      return this.nav_mode;
    } else {
      return '';
    }
  }

}
