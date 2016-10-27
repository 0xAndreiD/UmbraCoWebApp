/**
 * Created by User on 21.10.2016.
 */

import {Component} from "@angular/core";
import {IMenuItem} from "../../model/IMenuItem";
import {HttpService} from "../../services/http.service";
import {DataParseService} from "../../services/DataParseService";
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.css"]
})
export class ContentComponent {

  title = 'Umbraco + Angular2';
  menuItems: IMenuItem[] = [];

  constructor(private http: HttpService, private dataParse: DataParseService, private activateRoute: ActivatedRoute, private router:Router) {

  }

  ngOnInit(): void {
    this.http.getMenu().then(response=> {
      this.menuItems = this.dataParse.parseMenuDataToNav(response);
    });
  }
}
