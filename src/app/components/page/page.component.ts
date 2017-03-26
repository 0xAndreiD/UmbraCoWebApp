import { Component, OnInit, transition, trigger, style, animate, keyframes, Pipe, PipeTransform,
  AfterViewChecked, ComponentFactoryResolver, ViewChild, ViewContainerRef, NgModule, ComponentFactory } from "@angular/core";
import { JitCompiler } from '@angular/compiler';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from "../../services/http.service";
import { SeoService } from "../../services/SeoService";
import { IHaveDynamicData, DynamicTypeBuilder } from '../dynamic/type.builder';
import Settings from '../dynamic/settings';
import _ from "lodash";
//import {FormComponent} from "../form/form.component";

import {DynamicComponentModuleFactory} from 'angular2-dynamic-component/index';
import {MaterializeModule} from "angular2-materialize";
export const DYNAMIC_MODULE = DynamicComponentModuleFactory.buildModule([MaterializeModule]);

/* STUFF FOR PAPERSTACK ONLY */
import '../../js/paperstack/modernizr-custom.js';
import '../../js/paperstack/classie.js';
import '../../js/paperstack/main.js';
/*STUFF FOR PAPERSTACK ONLY END */

declare var carousel: any;
declare var $:any;
declare var buildcontenthtml:any;

@Pipe ({ name: 'safeHtml'})

export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

export interface IHaveDynamicData {
}

@Component({
  selector: 'app-page',
  /* templateUrl: './page0.component.html',
  styleUrls: ['./page0.component.css'], */
  template: '<div #ngIncludeContent></div>',
  providers: [HttpService],
  animations: [
    trigger("wrapper", [
      transition("void => *", [

      //    animate("0.5s", keyframes([
        /*    style({transform: 'translateX(-100%) scale(1)'}),
            style({transform: 'translateX(100%) scale(1)'}),*/

    //        style({transform: 'scale(0)'}),
    //        style({transform: 'scale(1)'}),
    //    ]))
        /* remove css animation on index*/


        /* animate("2s", keyframes([
          style({opacity: '1'}),
          style({opacity: '1'}),

        ])) */
      ])
    ])
  ],
})
export class PageComponent implements AfterViewChecked {
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
  @ViewChild('ngIncludeContent', { read: ViewContainerRef }) viewContainer: ViewContainerRef;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    private router: Router,
    private resolver: ComponentFactoryResolver,
    protected typeBuilder: DynamicTypeBuilder,
  ) {
    this.init();
    // this.viewContainer.createComponent(childComponent);
  }

  initCarousel() {
    $('.carousel.carousel-slider').carousel({fullWidth: true});
  }

  dynamicCallback() {
    this.initCarousel();
  }

  init() {
    // this.viewContainer.createComponent(childComponent);
    this.activatedRoute.params.subscribe((params: Params) => {
      this.side = params["side"];
      this.subpage = params["subpage"];
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
          },
          (error: any) => {
            // this.router.navigate(['error/not-found']);
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

  ngAfterViewInit() {
  }

  ngOnInit() {
    this.typeBuilder.createComponentFactory(`./${Settings[this.side].page}.component`).then((factory: ComponentFactory<IHaveDynamicData>) =>
    {
      this.viewContainer.createComponent(factory);
    });
  }

  ngAfterViewChecked() {
  /*  var tempFormContent = $('#tempContainer').html();
    if( $('#formContainer').length > 0 && this.lastFormContent != tempFormContent ) {
      $('#formContainer').html( tempFormContent );
      this.lastFormContent = tempFormContent;
    }*/
    // console.log(this.viewContainer);
  }
}
