import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  providers: [HttpService],
})
export class PageComponent implements OnInit {   
    umbpage; 
    img;
    constructor(private httpService: HttpService){}

    ngOnInit(){
      // you need to set this a better way AND remove hash from url
      // you skip replace stuff on domainename and remove img
      this.httpService.getUmbPageData(window.location.href)
      .subscribe(
        (umbpagedata: any) => {this.umbpage = umbpagedata.data;
                               this.img = umbpagedata.data.contentImages[0].croppedUrl.replace("http://localhost/", "http://localhost:49570/");
                               console.log(umbpagedata.data.contentImages[0]);  
        }
      );
    }
}
