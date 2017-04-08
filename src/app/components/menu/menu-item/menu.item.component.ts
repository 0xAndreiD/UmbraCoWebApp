import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, AfterViewChecked, ComponentRef, SimpleChange } from "@angular/core";

import { DynamicTypeBuilder, IHaveDynamicData } from './type.builder';
import Settings from '../../../services/settings';

import {Input} from "@angular/core";
import {IMenuItem} from "../../../model/IMenuItem";
import {Router} from "@angular/router";

@Component({
  selector: "menu-item",
  template: "<div #ngIncludeContent></div>",
  /*templateUrl: "./menu0.item.component.html",
  styleUrls: ["./menu0.item.component.css"]*/
})
export class MenuItemComponent {
  @ViewChild('ngIncludeContent', { read: ViewContainerRef }) viewContainer: ViewContainerRef;
  protected componentRef: ComponentRef<IHaveDynamicData>;
  // until ngAfterViewInit, we cannot start (firstly) to process dynamic stuff
  protected wasViewInitialized = false;
  @Input() items:IMenuItem[];

  @Input() isCollapsed:boolean = true;
  @Input() selectedItemInfo: any = {};
  @Input() selectItem: any;

  constructor(
    private resolver: ComponentFactoryResolver,
    protected typeBuilder: DynamicTypeBuilder,
  ){
  }

  protected refreshContent(useTextarea: boolean = false){

    if (this.componentRef) {
      this.componentRef.destroy();
    }
      if (!Settings[window.location.hostname].menuItem || !Settings[window.location.hostname].menuItem.template) return;
    // here we get Factory (just compiled or from cache)
    this.typeBuilder
        .createComponentFactory(Settings[window.location.hostname].menuItem)
        .then((factory: ComponentFactory<IHaveDynamicData>) =>
      {
          // Target will instantiate and inject component (we'll keep reference to it)
          this.componentRef = this
              .viewContainer
              .createComponent(factory);

          // let's inject @Inputs to component instance
          let component = this.componentRef.instance;
          component.items = this.items;
          component.isCollapsed = this.isCollapsed;
          component.selectedItemInfo = this.selectedItemInfo;
          component.selectItem = this.selectItem;
          //...
      });
    }

  ngAfterViewInit() {
    // this.refreshContent();
  }
  public ngOnChanges(changes: {[key: string]: SimpleChange}): void
  {
    if (changes.items && changes.items.currentValue && changes.items.currentValue.length > 0)
      this.refreshContent();
  }
  public ngOnDestroy(){
    if (this.componentRef) {
        this.componentRef.destroy();
        this.componentRef = null;
    }
  }
}
