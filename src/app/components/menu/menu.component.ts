/**
 * Created by User on 20.10.2016.
 */

import { Component, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentFactory, AfterViewChecked } from "@angular/core";
import { DynamicTypeBuilder } from './type.builder';
import Settings from '../../services/settings';

@Component({
  selector: "main-menu",
  /* templateUrl: "./menu0.component.html",
  styleUrls: ["./menu0.component.css"], */
  template: "<div #ngIncludeContent></div>",
})
export class MenuComponent {

  @ViewChild('ngIncludeContent', { read: ViewContainerRef }) viewContainer: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver,
    protected typeBuilder: DynamicTypeBuilder,
  ){
  }

  ngAfterViewInit() {
    this.typeBuilder.createComponentFactory(`${Settings[window.location.hostname].menu}.component`).then((factory: ComponentFactory<AfterViewChecked>) =>
    {
      this.viewContainer.createComponent(factory);
    });
  }
}
