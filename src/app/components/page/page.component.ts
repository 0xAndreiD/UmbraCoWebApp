import {Component, OnInit, transition, trigger, style, animate, keyframes, Pipe, PipeTransform, AfterViewChecked } from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import {HttpService} from "../../services/http.service";
import {SeoService} from "../../services/SeoService";
//import {FormComponent} from "../form/form.component";

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
declare var $:any;

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
  ]
})
export class PageComponent implements OnInit, AfterViewChecked {
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

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    private router: Router
  ) {
    this.init();
  }

  init() {
    this.activatedRoute.params.subscribe((params: Params) => {
      //console.log(params)
      this.side = params["side"];
      this.subpage = params["subpage"];
      this.url = this.activatedRoute.snapshot.data['side'];

      this.httpService.getUmbPageData(this.side, this.subpage)
        .subscribe(
          (umbpagedata: any) => {
            console.log(umbpagedata);
            this.umbpage = umbpagedata.data;
            this.imgs = umbpagedata.data.contentImages;
            this.loaded=true;
            let contentGrid = umbpagedata.data.bodyContentGrid;
          //  this.contentGrid = contentGrid.replace('{{renderformid_1}}', '<div id="formContainer" #formContainer></div>');
            this.contentGrid = contentGrid;
            this.seoService.setMetaElement("metaDescription", umbpagedata.data.metaDescription);
            this.seoService.setMetaElement("title", umbpagedata.data.title);
          },
          (error: any) => {
            // this.router.navigate(['error/not-found']);
          });
    });

    this.activatedRoute.data.subscribe((data: any)=> {
      // console.log(data);
      if (data.meta) {
        this.seoService.setMetaTags(data.meta);
      }
      if (data.title) {
        this.seoService.setTitle(data.title);
      }
    });


  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
  /*  var tempFormContent = $('#tempContainer').html();
    if( $('#formContainer').length > 0 && this.lastFormContent != tempFormContent ) {
      $('#formContainer').html( tempFormContent );
      this.lastFormContent = tempFormContent;
    }*/
  }
}
