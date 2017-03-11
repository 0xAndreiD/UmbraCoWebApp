import {Component} from "@angular/core";
import {Input} from "@angular/core";
import {IMenuItem} from "../../../model/IMenuItem";

@Component({
  selector: "menu-item",
  templateUrl: "./menu1.item.component.html",
  styleUrls: ["./menu1.item.component.css"]
})
export class MenuItemComponent {
  @Input() items:IMenuItem[];

  @Input() isCollapsed:boolean = true;
  selected_item_info:any = {
    item: [],
    index_num: 1
  };


  public collapsed(event:any):void {
  }

  public expanded(event:any):void {
  }

  constructor(){
  }

  ngOnInit():void {
  }

  private getClass(cases:any, item:any, index_num:any):string {
    var value = false;
    switch (cases) {
      case '0x001':
        if (this.isCollapsed) {
          if (this.selected_item_info.index_num == index_num)
            value = true;
        }
        break;
      default:
        value = false;
    }
    return value? 'activated' : 'normal';
  }

  private selectItem(item:any, index_num: any) {
    this.selected_item_info.item = item;
    this.selected_item_info.index_num = index_num;
  }
}
