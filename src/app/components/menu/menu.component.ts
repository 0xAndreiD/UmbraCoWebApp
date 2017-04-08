/**
 * Created by User on 20.10.2016.
 */

import { Component, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentFactory, AfterViewChecked } from "@angular/core";
import { DynamicTypeBuilder } from './type.builder';
import Settings from '../../services/settings';

@Component({
  selector: "main-menu",
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
    if (!Settings[window.location.hostname].menu || !Settings[window.location.hostname].menu.template) return;
    this.typeBuilder.createComponentFactory(Settings[window.location.hostname].menu).then((factory: ComponentFactory<AfterViewChecked>) =>
    {
      this.viewContainer.createComponent(factory);
    });
  }
}
