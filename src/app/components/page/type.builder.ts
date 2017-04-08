import { Component, ComponentFactory, NgModule, Input, Injectable, Injector, Compiler, ReflectiveInjector, trigger, transition, AfterViewChecked,
  style, animate, keyframes } from '@angular/core';
import { COMPILER_PROVIDERS } from '@angular/compiler';
import { DynamicComponentModule } from 'angular2-dynamic-component/index';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserModule } from "@angular/platform-browser";
import request from 'sync-request';
import { HttpService } from "../../services/http.service";
import { SeoService } from "../../services/SeoService";
import _ from 'lodash';

import {DynamicComponentModuleFactory} from 'angular2-dynamic-component/index';
import {MaterializeModule} from "angular2-materialize";
export const DYNAMIC_MODULE = DynamicComponentModuleFactory.buildModule([MaterializeModule]);

declare var carousel: any;
declare var $:any;
declare var buildcontenthtml:any;

@Injectable()
export class DynamicTypeBuilder {
  // wee need Dynamic component builder
  constructor(injector: Injector, private compiler: Compiler) {
    injector = ReflectiveInjector.resolveAndCreate(COMPILER_PROVIDERS, injector);
    compiler = injector.get(Compiler);
}

  // this object is singleton - so we can use this as a cache
  private _cacheOfFactories: {[templateKey: string]: ComponentFactory<AfterViewChecked>} = {};

  public createComponentFactory(page: any)
    : Promise<ComponentFactory<AfterViewChecked>> {

    let factory = this._cacheOfFactories[page.template];

    if (factory) {
        console.log("Module and Type are returned from cache")
        return new Promise((resolve) => {
            resolve(factory);
        });
    }
    // unknown template ... let's create a Type for it
    let type   = this.createNewComponent(page);
    let module = this.createComponentModule(type);
    return new Promise((resolve) => {
        this.compiler
            .compileModuleAndAllComponentsAsync(module)
            .then((moduleWithFactories) =>
            {
                factory = _.find(moduleWithFactories.componentFactories, { componentType: type });

                this._cacheOfFactories[page.template] = factory;

                resolve(factory);
            });
    });
  }

  protected createNewComponent (page: any) {
    const html = request('GET', `/src/app/components/page/${page.template}.component.html`).getBody();
    const css = request('GET', `/src/app/components/page/${page.template}.component.css`).getBody();
    @Component({
        selector: 'dynamic-component',
        template: html,
        styles: [css],
        animations: [
          trigger("wrapper", [
            transition("void => *", page.animation ? page.animation.animations : [])
          ])
        ],
    })
    class CustomDynamicComponent implements AfterViewChecked {
      lastFormContent: string = '';

      render:boolean = true;
      umbpage;
      imgs=[];
      loaded=false;
      contentGrid: string="";
      url: string = "";
      extraTemplate = ``;
      extraModules = [MaterializeModule];
      side;
      subpage;
      state;

      constructor(
        private httpService: HttpService,
        private activatedRoute: ActivatedRoute,
        private seoService: SeoService,
        private router: Router,
      ) {
        this.init();
      }

      initCarousel() {
        $('.carousel.carousel-slider').carousel({fullWidth: true});
      }

      dynamicCallback() {
        this.initCarousel();
      }

      init() {
        this.activatedRoute.params.subscribe((params: Params) => {
          this.side = params["side"] === 'home' ? '' : params["side"];
          this.subpage = params["subpage"];
          this.state = "void";
          this.url = this.activatedRoute.snapshot.data['side'];
          this.httpService.getUmbPageData(this.side, this.subpage)
            .subscribe(
              (umbpagedata: any) => {
                this.umbpage = umbpagedata.data;
                this.imgs = umbpagedata.data.contentImages;
                this.loaded=true;

                //TEST ON JAVASCRIPT OR HTML STRING
                //let contentGrid = umbpagedata.data.bodyContentGrid;

                //buildcontenthtml function is added on index.html in js file named htmlbuilder.js
                let contentGrid = buildcontenthtml(umbpagedata.data.bodyContentGridJson);
              //  this.contentGrid = contentGrid.replace('{{renderformid_1}}', '<div id="formContainer" #formContainer></div>');
                this.contentGrid = contentGrid;
                this.seoService.setMetaElement("metaDescription", umbpagedata.data.metaDescription);
                this.seoService.setTitle(umbpagedata.data.title);
                if (page.animation && page.animation.pageSwitch)
                  this.state =`${this.side}-${this.subpage}`;
              },
              (error: any) => {
                // this.router.navigate(['error/not-found']);
                this.contentGrid = 'Please place here error html (line 142 of src/app/components/page/type.builder.ts)';
                if (page.animation && page.animation.pageSwitch)
                  this.state =`${this.side}-${this.subpage}`;
              });
        });

        this.activatedRoute.data.subscribe((data: any)=> {
          if (data.meta) {
            this.seoService.setMetaTags(data.meta);
          }
          if (data.title) {
            this.seoService.setTitle(data.title);
          }
        });
      }

      ngAfterViewChecked() {}
    };
    // a component for this particular template
    return CustomDynamicComponent;
  }
  protected createComponentModule (componentType: any) {
      @NgModule({
        imports: [
          BrowserModule,
          DynamicComponentModule,
        ],
        declarations: [
          componentType
        ],
      })
      class RuntimeComponentModule
      {
      }
      // a module for just this Type
      return RuntimeComponentModule;
  }
}
