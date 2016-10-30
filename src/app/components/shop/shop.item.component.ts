/**
 * Created by User on 30.10.2016.
 */

import {Component, Input} from "@angular/core"

@Component({
  selector: "shop-item",
  templateUrl: "./shop.item.component.html"
})
export class ShopItemComponent {

  @Input("name") name:string;
  constructor() {

  }
}
