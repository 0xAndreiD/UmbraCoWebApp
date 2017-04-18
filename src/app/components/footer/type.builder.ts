import { Component, ComponentFactory, NgModule, Input, Injectable, Injector, Compiler, ReflectiveInjector, ComponentFactoryResolver } from '@angular/core';
import { COMPILER_PROVIDERS } from '@angular/compiler';
import { Router } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import request from 'sync-request';
import { HttpService } from "../../services/http.service";
import { DataParseService } from "../../services/DataParseService";
import { IMenuItem } from "../../model/IMenuItem";
import _ from 'lodash';

export interface IHaveDynamicData {
  selectItem: any,
};

@Injectable()
export class DynamicTypeBuilder {

  // wee need Dynamic component builder
  constructor(injector: Injector, private compiler: Compiler) {
    injector = ReflectiveInjector.resolveAndCreate(COMPILER_PROVIDERS, injector);
    compiler = injector.get(Compiler);
  }

  // this object is singleton - so we can use this as a cache
  private _cacheOfFactories: {[templateKey: string]: ComponentFactory<IHaveDynamicData>} = {};

  public createComponentFactory(footer: any)
    : Promise<ComponentFactory<IHaveDynamicData>> {

    let factory = this._cacheOfFactories[footer.template];

    if (factory) {
        console.log("Module and Type are returned from cache")

        return new Promise((resolve) => {
            resolve(factory);
        });
    }

    // unknown template ... let's create a Type for it
    let type   = this.createNewComponent(footer)
    let module = this.createComponentModule(type);
    return new Promise((resolve) => {
        this.compiler
            .compileModuleAndAllComponentsAsync(module)
            .then((moduleWithFactories) =>
            {
                factory = _.find(moduleWithFactories.componentFactories, { componentType: type });

                this._cacheOfFactories[footer.template] = factory;

                resolve(factory);
            });
    });
  }

  protected createNewComponent (footer: any) {
    const html = request('GET', `/src/app/components/footer/${footer.template}.component.html`).getBody();
    const css = request('GET', `/src/app/components/footer/${footer.template}.component.css`).getBody();
    @Component({
        selector: 'dynamice-component',
        template: html,
        styles: [css],
    })
    class CustomDynamicComponent implements IHaveDynamicData {
      @Input() selectItem: any;
      collapsed: boolean = true;

      constructor(
        private http: HttpService,
        private router: Router,
        private dataParse: DataParseService,
        private resolver: ComponentFactoryResolver,
      ){
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
        ],
      })
      class RuntimeComponentModule
      {
      }
      // a module for just this Type
      return RuntimeComponentModule;
  }
}
