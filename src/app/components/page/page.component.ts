import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy,
  transition,
  trigger,
  style,
  animate,
  keyframes,
  state
} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Http} from "@angular/http";
import {HttpService} from "../../services/http.service";
import {SeoService} from "../../services/SeoService";
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  providers: [HttpService],
  animations: [
    trigger("wrapper", [
      transition("void => *", [
        animate("0.5s", keyframes([
          style({transform: 'translate3d(-100%, 0, 0)'}),
          style({transform: 'translate3d(0, 0, 0)'}),

        ]))
      ])
    ])
  ]
})
export class PageComponent implements OnInit {


  umbpage;
  imgs=[]
  loaded=false;
  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute, private seoService: SeoService, private http: Http, private el: ElementRef) {
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
        });
  }
}
