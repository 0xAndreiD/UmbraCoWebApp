import { Component, OnInit, transition, trigger, style, animate, keyframes, Pipe, PipeTransform, AfterViewChecked } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from "../../services/http.service";
import { SeoService } from "../../services/SeoService";
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

@Pipe ({ name: 'safeHtml'})

export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-page',
  templateUrl: './page0.component.html',
  styleUrls: ['./page0.component.css'],
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

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    private router: Router
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
            let contentGrid = builder(umbpagedata.data.bodyContentGridJson);

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


    function builder(j){
      var s = "<div>";

      if (j) {
          //if one col
          if (Object.keys(j.sections).length <= 1) {
            for (let i = 0; i < Object.keys(j.sections).length; i++){
              var array = j.sections[i].rows;
              for (let i = 0; i < array.length; i++) {
                s += renderRow(array[i], true);
              }
            }
          }
          else {
            s += "<p>We need to take care of 2-12 col. stuff</p>";
          }
      }
      else {
          s += "<p>EMPTY</p>";
      }

      s += "</div>";

      return s;
    }

    function renderRow(row, singleColumn) {

      var rowhtml = "";

      rowhtml += "<div " + RenderElementAttributes(row) + ">";
      if (singleColumn) {
        rowhtml += "<div class='container'>";
      }
      rowhtml += "<div class='row'>";
        for (let i = 0; i < row.areas.length; i++) {
          rowhtml += "<div class='col s" + row.areas[i].grid + "'>";
          rowhtml += "<div " + RenderElementAttributes(row.areas[i]) + ">";

          for (let e = 0; e < row.areas[i].controls.length; e++) {
              var control = row.areas[i].controls[e];
              if (control != null && control.editor != null && control.editor.view != null) {
                //console.log(control);
                //console.log(control.editor);
                //console.log(control.editor.view);
                rowhtml += editorview(control);
              }
          }

          rowhtml += "</div>";
          rowhtml += "</div>";
        }
      rowhtml += "</div>";
      if (singleColumn) {
        rowhtml += "</div>";
      }
      rowhtml += "</div>";

      return rowhtml;
    }


    function RenderElementAttributes(contentItem){
      var r = "";

      var cfg = contentItem.config;
      if (typeof cfg !== "undefined"){
        Object.keys(cfg).forEach(function (key) {
            r += key + "='" + cfg[key].toLowerCase().replace(" ", "-") + "'";
        });
      }

      var style = contentItem.styles;
      if (typeof style !== "undefined"){
        r += "style='";
        Object.keys(style).forEach(function (key) {
          if (key == "background-image") {
              style[key] = "url(http://umb.dynamikfabrikken.com" + style[key].replace("url(", "");
          }
          r +=  key + ": " + style[key] + "; ";
        });
        r += "'";
      }

      return r;
    }

    function editorview(contentItem){
      var e = ""
      var type = contentItem.editor.alias;

      try {
            if (type == "rte") {
            // line 139 - TemplateUtilities.ParseInternalLinks not added
            e += contentItem.value.replace("src=\"/", "src=\"" + "http://umb.dynamikfabrikken.com" + "/");
            }
            else if (type == "macro"){
              var macroalias = contentItem.value.macroAlias;
              if (macroalias == "slider") {
                e += buildslider();
              }
            }
            else{
              console.log(type);
            }
      }
      catch(err) {

      }

      return e;
    }

    function buildslider(){
      var slider = "";


            slider += "<div materialize='carousel' class='carousel'>";

            slider += "<div class='carousel-fixed-item center'>";
            slider += "<a class='btn waves-effect white grey-text darken-text-2'>button</a>";
            slider += "</div>";

            for (let i = 0; i < 3; i++) {
              slider += "<div class='carousel-item red white-text' href='#" + i + "'>";
              slider += "<h2>First Panel</h2><p class='white-text'>This is your first panel</p>";
              slider += "</div>";
            }

            slider += "</div>";


            slider += "<div appCarouselSpy id='full-carousel' class='carousel carousel-slider center' data-indicators='true'>";
              slider += "<div class='carousel-fixed-item center'>";
                  slider += "<a class='btn waves-effect white grey-text darken-text-2'>button</a>";
              slider += "</div>";
              slider += "<div class='carousel-item red white-text' href='#one!'>";
                  slider += "<h2>First Panel</h2>";
                  slider += "<p class='white-text'>This is your first panel</p>";
              slider += "</div> ";
              slider += "<div class='carousel-item amber white-text' href='#two!'>";
                  slider += "<h2>Second Panel</h2>";
                  slider += "<p class='white-text'>This is your second panel</p>";
              slider += "</div>";
              slider += "<div class='carousel-item green white-text' href='#three!'>";
                  slider += "<h2>Third Panel</h2>";
                  slider += "<p class='white-text'>This is your third panel</p>";
              slider += "</div>";
              slider += "<div class='carousel-item blue white-text' href='#four!'>";
                  slider += "<h2>Fourth Panel</h2>";
                  slider += "<p class='white-text'>This is your fourth panel</p>";
              slider += "</div>";
              slider += "</div>";

      return slider;
    }

  }

  ngAfterViewChecked() {
  /*  var tempFormContent = $('#tempContainer').html();
    if( $('#formContainer').length > 0 && this.lastFormContent != tempFormContent ) {
      $('#formContainer').html( tempFormContent );
      this.lastFormContent = tempFormContent;
    }*/
  }


  //html render stuff



}
