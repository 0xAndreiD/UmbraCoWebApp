import {Component, OnInit} from "@angular/core";
import {HttpService} from "../services/http.service";
import {ActivatedRoute} from "@angular/router";
import {SeoService} from "../services/SeoService";
import {RouteController} from "../services/RouteController";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  providers: [HttpService],
})
export class PageComponent implements OnInit {
  umbpage;
  imgs;

  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute, private seoService: SeoService) {
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
    this.httpService.getUmbPageData(window.location.href)
      .subscribe(
        (umbpagedata: any) => {
          this.umbpage = umbpagedata.data;
          this.imgs = umbpagedata.data.contentImages.map(img=> {
            return Object.assign({}, img, {
              croppedUrl: img.croppedUrl.replace("http://localhost/", "http://localhost:49570/")
            })
          });
        }
      );
  }
}
