/**
 * Created by User on 21.10.2016.
 */

import {Component} from "@angular/core";
import {IMenuItem} from "../../model/IMenuItem";
import {HttpService} from "../../services/http.service";
import {DataParseService} from "../../services/DataParseService";
import {MaterializeModule} from "angular2-materialize";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {SeoService} from "../../services/SeoService";


@Component({
  templateUrl: "./content.component.html",
  styleUrls: ["./content1.component.css"]
})
export class ContentComponent {

  menuItems: IMenuItem[] = [];

  ngOnInit(): void {
    this.http.getMenu().subscribe(response=> {
      this.menuItems = this.dataParse.parseMenuDataToNav(response);
      this.menuItems.push({
        name: "Shop",
        path: "/shops",
        level: 0,
        children:[]
      });
      for (let i = 0; i < this.menuItems.length; i++) {
        this.menuItems[i].level = 0;
      }

    });
  }

  lastFormContent: string = '';

  render:boolean = true;
  umbpage;
  imgs=[];
  loaded=false;
  contentGrid: string="";
  isfrontpage= "frontpagecontent";
  url: string = "";
  extraTemplate = ``;
  extraModules = [MaterializeModule];
  side;
  subpage;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    private router: Router,
    private http: HttpService,
    private dataParse: DataParseService
  ) {
    this.init();
  }

  init() {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params)
      this.side = params["side"];
      this.subpage = params["subpage"];
      this.url = this.activatedRoute.snapshot.data['side'];
    });

    this.activatedRoute.data.subscribe((data: any)=> {
      if (data.meta) {
        this.seoService.setMetaTags(data.meta);
      }
      if (data.title) {
        this.seoService.setTitle(data.title);
      }
    });

    this.httpService.getUmbPageData(this.side, this.subpage)
      .subscribe(
        (umbpagedata: any) => {
          this.umbpage = umbpagedata.data;
          this.imgs = umbpagedata.data.contentImages;
          this.loaded=true;
          let contentGrid = umbpagedata.data.bodyContentGrid;
          this.contentGrid = contentGrid.replace('{{renderformid_1}}', '<div id="formContainer" #formContainer></div>');

          this.seoService.setMetaElement("metaDescription", umbpagedata.data.metaDescription);

          if (this.url != "/") {
            this.isfrontpage = "subpagecontent";
          }
          //weill be removed
          this.isfrontpage = "frontpagecontent";
        },
        (error: any) => {
          // this.router.navigate(['error/not-found']);
        });
  }


  ngAfterViewChecked() {
    var tempFormContent = $('#tempContainer').html();
    if( $('#formContainer').length > 0 && this.lastFormContent != tempFormContent ) {
      $('#formContainer').html( tempFormContent );
      this.lastFormContent = tempFormContent;
    }
  }
}
