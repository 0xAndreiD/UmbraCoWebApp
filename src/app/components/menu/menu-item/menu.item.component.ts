import {Component} from "@angular/core";
import {Input} from "@angular/core";
import {IMenuItem} from "../../../model/IMenuItem";
import {Router} from "@angular/router";

@Component({
  selector: "menu-item",
  templateUrl: "./menu.item.component.html",
  styleUrls: ["./menu.item.component.css"]
})
export class MenuItemComponent {
  @Input() items:IMenuItem[];

  @Input() isCollapsed:boolean = true;
  selected_item_info:any = {
    item: [],
    index_num: 1
  };


  public collapsed(event:any):void {
    console.log(event);
  }

  public expanded(event:any):void {
  }

  constructor(private router: Router){
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

  selectItem(item){
    console.log(item)
    this.router.navigate([item.path]);
  }

  private onMenuCollapse(item, index) {
    console.log(item);
    item.isCollapsed = !item.isCollapsed;
  }

  // private selectItem(item:any, index_num: any) {
  //   this.selected_item_info.item = item;
  //   this.selected_item_info.index_num = index_num;
  // }
}
