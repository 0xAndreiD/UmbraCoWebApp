/**
 * Created by User on 20.10.2016.
 */

import {Component, Input} from "@angular/core";
import {IMenuItem} from "../../model/IMenuItem";
import {HttpService} from "../../services/http.service";
import {Router} from "@angular/router";




@Component({
  selector: "main-menu",
  templateUrl: "./menu0.component.html",
  styleUrls: ["./menu0.component.css"]
})
export class MenuComponent {
  @Input() menuItems:IMenuItem[]=[]

  is_menutab_opened:boolean = false;

  is_searchtab_opened:boolean = false;

  nav_mode:string = '';

  umbpagegeneral;

  constructor(
    private http: HttpService,
    private router: Router
  ){
  }

  ngOnInit():void {


    this.http.getUmbPageGeneralData()
      .subscribe(
        (umbpagegeneraldata: any) => {
          //The problem was that you received an array from server but used as object
          this.umbpagegeneral = umbpagegeneraldata.data[0];
        },
        (error: any) => {
          this.router.navigate(['error/not-found']);
        });

        //this.getMenuItems();
  }

  private onOpenNavbar(cases:string):void {
    if (cases == 'MENU') {
      this.is_menutab_opened = !this.is_menutab_opened;
      this.is_searchtab_opened = false;
    }
    else if (cases == 'SEARCH') {
      this.is_searchtab_opened = !this.is_searchtab_opened;
      this.is_menutab_opened = false;
    }
    else if (cases == 'MENU2') {

    } else {
      this.nav_mode = cases;
    }
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
