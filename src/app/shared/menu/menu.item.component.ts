

import {Component} from "@angular/core";
import {Input} from "@angular/core";
import {IMenuItem} from "../../model/IMenuItem";

@Component({
  selector: "menu-item",
  templateUrl: "./menu.item.component.html",
  styleUrls: ["./menu.item.component.css"]
})
export class MenuItemComponent {

  @Input() items:IMenuItem[]
}
