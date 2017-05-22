import {Injectable} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {IMetaTag} from "../model/IMetaTag";
import {ActivatedRoute} from "@angular/router";


@Injectable()
export class SeoService {

  private headElement:HTMLElement;
  private tags:IMetaTag[]=[];
  constructor( private titleService: Title){
    this.headElement = <HTMLElement>document.querySelector('head');
  }

  public getTitle(): string {
    return this.titleService.getTitle();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  public setMetaElement(name:string, content:string) {
    this.tags.push({
      name,
      content
    });
    this.getOrCreateMetaElement(name).setAttribute("content", content);
    console.log(name);
  }

  public getMetaElement(name:string) {
    this.getOrCreateMetaElement(name).getAttribute("content")
  }

  public removeMetaElement(name:string) {
    this.getOrCreateMetaElement(name).remove();
  }
  public removeAllMetaTags() {
    for(let i=0;i<this.tags.length;i++) {
      this.removeMetaElement(this.tags[i].name)
    }
   this.tags=[];
  }

  public setMetaTags(tags:IMetaTag[]=[]) {
    this.removeAllMetaTags();
    for(let i=0;i< tags.length;i++) {
      this.setMetaElement(tags[i].name, tags[i].content)
    }
  }
  /**
   * get the HTML Element when it is in the markup, or create it.
   * @param name
   * @returns {HTMLElement}
   */
  private getOrCreateMetaElement(name: string): HTMLElement {
    let el: HTMLElement;
    el = <HTMLElement>document.querySelector('meta[name=' + name + ']');
    if (el === null) {
      el = document.createElement('meta');
      el.setAttribute('name', name);
      this.headElement.insertBefore(el, this.headElement.firstChild);
    }
    return el;
  }

}
