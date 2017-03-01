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

  isCollapsed:boolean = true;
  selected_item_info:any = {
    item: [],
    index_num: -1
  };


  public collapsed(event:any):void {
  }

  public expanded(event:any):void {
  }

  constructor(){
  }

  ngOnInit():void {
  }

  private onMenuCollapse(item:any, index_num:any):void {
    this.isCollapsed = !this.isCollapsed;
    if (!this.isCollapsed)  {
      this.selected_item_info.item = item;
      this.selected_item_info.index_num = index_num;
    } else {
      this.selected_item_info.item = [];
      this.selected_item_info.index_num = -1;
    }
  }

  private getClass(cases:any, item:any, index_num:any):boolean {
    var value = false;
    switch (cases) {
      case '0x001':
        if (!this.isCollapsed) {
          if (this.selected_item_info.item == item && this.selected_item_info.index_num == index_num)
            value = true;
        }
        break;
      default:
        value = false;
    }
    return value;
  }

  private getStyle(cases:any, item:any, index_num:any):any {
    var style_string = '';
    switch (cases){
      case '0x001':
        if (this.isCollapsed) style_string = 'rotate(0deg)';
        else style_string = 'rotate(180deg)';
        break;
      default:
        style_string = 'unset';
    }
    return style_string;
  }
}
