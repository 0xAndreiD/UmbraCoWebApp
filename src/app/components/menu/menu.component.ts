/**
 * Created by User on 20.10.2016.
 */

import { Component, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentFactory } from "@angular/core";
import { IMenuItem } from "../../model/IMenuItem";
import { HttpService } from "../../services/http.service";
import { DataParseService } from "../../services/DataParseService";
import { Router } from "@angular/router";
import { DynamicTypeBuilder, IHaveDynamicData } from '../dynamic/type.builder';
import Settings from '../dynamic/settings';

@Component({
  selector: "main-menu",
  /* templateUrl: "./menu0.component.html",
  styleUrls: ["./menu0.component.css"], */
  template: "<div #ngIncludeContent></div>",
})
export class MenuComponent {
  menuItems:IMenuItem[]=[]

  is_menutab_opened:boolean = false;

  is_searchtab_opened:boolean = false;

  nav_mode:string = '';
  side
  umbpagegeneral;

  @ViewChild('ngIncludeContent', { read: ViewContainerRef }) viewContainer: ViewContainerRef;

  constructor(
    private http: HttpService,
    private router: Router,
    private dataParse: DataParseService,
    private resolver: ComponentFactoryResolver,
    protected typeBuilder: DynamicTypeBuilder,
  ){
  }

  getMenuItems() {
    this.http.getMenu().subscribe(response=> {
      this.menuItems = this.dataParse.parseMenuDataToNav(response);
      this.menuItems.push({
        name: "Shop",
        path: "/shops",
        level: 0,
        children:[]
      });
      for (let i = 0; i < this.menuItems.length; i++) {
        this.menuItems[i].level = 0;
      }
    });
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
    this.typeBuilder.createComponentFactory(`./${Settings[this.side].page}.component`).then((factory: ComponentFactory<IHaveDynamicData>) =>
    {
      this.viewContainer.createComponent(factory);
    });

    this.getMenuItems();
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
