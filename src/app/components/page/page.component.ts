import {Component, OnInit, transition, trigger, style, animate, keyframes, Pipe, PipeTransform} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../../services/http.service";
import {SeoService} from "../../services/SeoService";
import { DomSanitizer } from '@angular/platform-browser';

import * as $ from 'jquery';


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
      /*  animate("0.5s", keyframes([
          style({transform: 'translate3d(-100%, 0, 0)'}),
          style({transform: 'translate3d(0, 0, 0)'}),

        ]))*/
        /* remove css animation on index*/
        animate("0s", keyframes([
          style({opacity: '1'}),
          style({opacity: '1'}),

        ]))
      ])
    ])
  ]
})
export class PageComponent implements OnInit {

  umbpage;
  imgs=[];
  loaded=false;
  contentGrid: string="";
  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute, private seoService: SeoService) {
  }

  ngOnInit() {

    $( document ).ready(function() {
      var w = $("body").width();
      alert(w);
    //  $('.carousel.carousel-slider').carousel({fullWidth: true});
    });

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
        });

  }
}
