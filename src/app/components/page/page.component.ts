import {Component, OnInit, transition, trigger, style, animate, keyframes, Pipe, PipeTransform, ChangeDetectorRef} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../../services/http.service";
import {SeoService} from "../../services/SeoService";
import { DomSanitizer } from '@angular/platform-browser';

import {DynamicComponentModuleFactory} from 'angular2-dynamic-component/index';
import {MaterializeModule} from "angular2-materialize";
export const DYNAMIC_MODULE = DynamicComponentModuleFactory.buildModule([MaterializeModule]);
//// In the console
//// First install jQuery
//npm install --save jquery
//// and jQuery Definition
// npm install -D @types/jquery
//import * as $ from 'jquery';
declare var carousel: any;

@Pipe ({ name: 'safeHtml'})

export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  providers: [HttpService],
  animations: [
    trigger("wrapper", [
      transition("void => *", [

          animate("0.5s", keyframes([
        /*    style({transform: 'translateX(-100%) scale(1)'}),
            style({transform: 'translateX(100%) scale(1)'}),*/

            style({transform: 'scale(0)'}),
            style({transform: 'scale(1)'}),
        ]))
        /* remove css animation on index*/


        /* animate("2s", keyframes([
          style({opacity: '1'}),
          style({opacity: '1'}),

        ])) */
      ])
    ])
  ]
})
export class PageComponent implements OnInit {

  render:boolean = true;
  umbpage;
  imgs=[];
  loaded=false;
  contentGrid: string="";
  isfrontpage= "frontpagecontent";

  extraTemplate = ``;
  extraModules = [MaterializeModule];

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    private ref: ChangeDetectorRef
  ) {
  }

  ngOnInit() {

    this.activatedRoute.data.subscribe((data: any)=> {
      if (data.meta) {
        this.seoService.setMetaTags(data.meta);
      }
      if (data.title) {
        this.seoService.setTitle(data.title);
      }
    });

    this.httpService.getUmbPageData(window.location.pathname)
      .subscribe(
        (umbpagedata: any) => {
          this.umbpage = umbpagedata.data;
          this.imgs = umbpagedata.data.contentImages;
          this.loaded=true;
          let conetentGrid = umbpagedata.data.bodyContentGrid;
          this.contentGrid = conetentGrid ? conetentGrid :"";
          this.seoService.setMetaElement("metaDescription", umbpagedata.data.metaDescription);
          if (window.location.pathname != "/") {
            this.isfrontpage = "subpagecontent";
          }
          //weill be removed
          this.isfrontpage = "frontpagecontent";
          this.ref.detach();
          setInterval(() => {
            this.ref.detectChanges();
          }, 5000);
        });

  }
}
