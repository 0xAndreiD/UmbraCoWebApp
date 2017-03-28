import { Component, ComponentFactory, NgModule, Input, Injectable, Injector, Compiler, ReflectiveInjector, ComponentFactoryResolver } from '@angular/core';
import { COMPILER_PROVIDERS } from '@angular/compiler';
import { Router } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { HttpService } from "../../services/http.service";
import { DataParseService } from "../../services/DataParseService";
import { IMenuItem } from "../../model/IMenuItem";
import { MenuItemComponent } from './menu-item/menu.item.component';
import { MenuSearchComponent } from './menu-search/menu.search.component';
import _ from 'lodash';

export interface IHaveDynamicData {};

@Injectable()
export class DynamicTypeBuilder {

  // wee need Dynamic component builder
  constructor(injector: Injector, private compiler: Compiler) {
    injector = ReflectiveInjector.resolveAndCreate(COMPILER_PROVIDERS, injector);
    compiler = injector.get(Compiler);
  }

  // this object is singleton - so we can use this as a cache
  private _cacheOfFactories: {[templateKey: string]: ComponentFactory<IHaveDynamicData>} = {};

  public createComponentFactory(template: string)
    : Promise<ComponentFactory<IHaveDynamicData>> {

    let factory = this._cacheOfFactories[template];

    if (factory) {
        console.log("Module and Type are returned from cache")

        return new Promise((resolve) => {
            resolve(factory);
        });
    }

    console.log("dwdw");

    // unknown template ... let's create a Type for it
    let type   = this.createNewComponent(template);
    let module = this.createComponentModule(type);
    return new Promise((resolve) => {
        this.compiler
            .compileModuleAndAllComponentsAsync(module)
            .then((moduleWithFactories) =>
            {
                factory = _.find(moduleWithFactories.componentFactories, { componentType: type });

                this._cacheOfFactories[template] = factory;

                resolve(factory);
            });
    });
  }

  protected createNewComponent (templateUrl: string) {
      @Component({
          selector: 'dynamice-component',
          // templateUrl: `${templateUrl}.html`,
          templateUrl: `../menu/${templateUrl}.html`,
          styleUrls: [`../menu/${templateUrl}.css`],
      })
      class CustomDynamicComponent implements IHaveDynamicData {
        menuItems:IMenuItem[]=[]

        is_menutab_opened:boolean = false;

        is_searchtab_opened:boolean = false;

        nav_mode:string = '';
        umbpagegeneral;
        pagename;

        constructor(
          private http: HttpService,
          private router: Router,
          private dataParse: DataParseService,
          private resolver: ComponentFactoryResolver,
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


          this.getMenuItems();



            this.pagename = "Headline";

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

      };
      // a component for this particular template
      return CustomDynamicComponent;
  }
  protected createComponentModule (componentType: any) {
      @NgModule({
        imports: [
          BrowserModule,
          FormsModule,
        ],
        declarations: [
          componentType,
          MenuItemComponent,
          MenuSearchComponent,
        ],
      })
      class RuntimeComponentModule
      {
      }
      // a module for just this Type
      return RuntimeComponentModule;
  }
}
