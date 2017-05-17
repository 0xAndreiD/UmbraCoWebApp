import { Component, ComponentFactory, NgModule, Input, Injectable, Injector, Compiler, ReflectiveInjector, AfterViewChecked, ComponentFactoryResolver } from '@angular/core';
import { COMPILER_PROVIDERS } from '@angular/compiler';
import { Router } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import request from 'sync-request';

import { IMenuItem } from "../../../model/IMenuItem";
import _ from 'lodash';

export interface IHaveDynamicData {
  items:IMenuItem[];
  isCollapsed:boolean;
  selectedItemInfo: any;
  selectItem: any;
};

@Injectable()
export class DynamicTypeBuilder {

  // wee need Dynamic component builder
  constructor(injector: Injector, private compiler: Compiler) {
    injector = ReflectiveInjector.resolveAndCreate(COMPILER_PROVIDERS, injector);
    compiler = injector.get(Compiler) as Compiler;
  }

  // this object is singleton - so we can use this as a cache
  private _cacheOfFactories: {[templateKey: string]: ComponentFactory<IHaveDynamicData>} = {};

  public createComponentFactory(menuItem: any)
    : Promise<ComponentFactory<IHaveDynamicData>> {

    let factory = this._cacheOfFactories[menuItem.template];

    if (factory) {
        console.log("Module and Type are returned from cache")

        return new Promise((resolve) => {
            resolve(factory);
        });
    }
    // unknown template ... let's create a Type for it
    let type   = this.createNewComponent(menuItem);
    let module = this.createComponentModule(type);
    return new Promise((resolve) => {
        this.compiler
            .compileModuleAndAllComponentsAsync(module)
            .then((moduleWithFactories) =>
            {
                factory = _.find(moduleWithFactories.componentFactories, { componentType: type });

                this._cacheOfFactories[menuItem.template] = factory;

                resolve(factory);
            });
    });
  }

  protected createNewComponent (menuItem: any) {
    const html = request('GET', `/src/app/components/menu/menu-item/${menuItem.template}.component.html`).getBody();
    const css = request('GET', `/src/app/components/menu/menu-item/${menuItem.template}.component.css`).getBody();
    @Component({
        selector: 'dynamice-component',
        template: html,
        styles: [css],
    })
    class CustomDynamicComponent implements IHaveDynamicData {
      @Input() items:IMenuItem[];
      @Input() isCollapsed:boolean = true;
      @Input() selectedItemInfo: any = {};
      @Input() selectItem: any;
      nativeWindow: any = window;

      public collapsed(event:any):void {
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
              if (this.selectedItemInfo.index_num == index_num)
                value = true;
            }
            break;
          default:
            value = false;
        }
        return value? 'activated' : 'normal';
      }

      private onMenuCollapse(item, index) {
        item.isCollapsed = !item.isCollapsed;
      }

      // private selectItem(item:any, index_num: any) {
      //   this.selected_item_info.item = item;
      //   this.selected_item_info.index_num = index_num;
      // }

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
        ],
      })
      class RuntimeComponentModule
      {
      }
      // a module for just this Type
      return RuntimeComponentModule;
  }
}
