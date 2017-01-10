/**
 * Created by User on 20.10.2016.
 */

import {Component, Input} from "@angular/core";
import {IMenuItem} from "../../model/IMenuItem";
@Component({
  selector: "main-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent {
  @Input() menuItems:IMenuItem[]=[]

  is_navbar_opened:boolean = false;

  constructor(){

  }

  ngOnInit():void {
  }

  private getWidth():string {
    if(this.is_navbar_opened)  return "250px";
    else return "0px";
  }

}
