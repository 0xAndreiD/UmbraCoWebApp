import {Component} from "@angular/core";
import {Input} from "@angular/core";
import {IMenuItem} from "../../model/IMenuItem";

@Component({
  selector: "menu-item",
  templateUrl: "./menu.item.component.html",
  styleUrls: ["./menu.item.component.css"]
})
export class MenuItemComponent {
  @Input() items:IMenuItem[];

  public isCollapsed:boolean = false

  public collapsed(event:any):void {
  }

  public expanded(event:any):void {
  }

  constructor(){
  }

  ngOnInit():void {
  }
}
