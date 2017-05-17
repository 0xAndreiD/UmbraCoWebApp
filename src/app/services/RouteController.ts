import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
  Routes
} from "@angular/router";
import {Observable} from "rxjs";
import {HttpService} from "./http.service";
import {DataParseService} from "./DataParseService";
import {Injectable} from "@angular/core";
import {ShopComponent} from "../components/shop/shop.component";

@Injectable()
export class RouteController implements CanActivate, CanActivateChild {

  isLoaded: boolean = false;

  constructor(private http: HttpService, private dataParse: DataParseService, private router: Router) {

  }

  //Loads menu data before the first page is loaded
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    let that = this;
    return new Observable<boolean>((resolve)=> {
      if (that.isLoaded) {
        resolve(true);
        return;
      }
      that.http.getMenu().subscribe((response)=> {
        let additionalRoutes: Routes = [
          {
            path: "shops",
            component: ShopComponent,
            data: {
              title: "Shops",
              meta: []
            }
          }
        ];


        this.router.config[0].children=[...this.dataParse.parseMenuDataToRoutes(response), ...additionalRoutes];
        this.router.resetConfig([...this.router.config])
        that.isLoaded = true;
        resolve(false);

        that.router.navigateByUrl(state.url);

      })
    })
  }

  //Loads menu data before the first page is loaded
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.canActivate(childRoute, state);
  }

}
