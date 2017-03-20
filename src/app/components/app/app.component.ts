import {Component} from '@angular/core';
import {DataParseService} from "../../services/DataParseService";
import {HttpService} from "../../services/http.service";
import {IMenuItem} from "../../model/IMenuItem";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  menuItems: IMenuItem[] = [];

  constructor(
    private http: HttpService,
    private dataParse: DataParseService
  ) {

  }

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
}
