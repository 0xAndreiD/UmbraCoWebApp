/**
 * Created by User on 20.10.2016.
 */

import { Component, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef, ComponentFactory, AfterViewChecked } from "@angular/core";
import { DynamicTypeBuilder, IHaveDynamicData } from './type.builder';
import Settings from '../../services/settings';

@Component({
  selector: "footer",
  template: "<div #ngIncludeContent></div>",
})
export class FooterComponent {

  @ViewChild('ngIncludeContent', { read: ViewContainerRef }) viewContainer: ViewContainerRef;
  protected componentRef: ComponentRef<IHaveDynamicData>;
  @Input() selectItem: any;

  constructor(
    private resolver: ComponentFactoryResolver,
    protected typeBuilder: DynamicTypeBuilder,
  ){
  }

  ngAfterViewInit() {
    if (!Settings[window.location.hostname].footer || !Settings[window.location.hostname].footer.template) return;
    this.typeBuilder.createComponentFactory(Settings[window.location.hostname].footer).then((factory: ComponentFactory<IHaveDynamicData>) =>
    {
      this.componentRef = this.viewContainer.createComponent(factory);
      let component = this.componentRef.instance;
      component.selectItem = this.selectItem;
    });
  }
}
