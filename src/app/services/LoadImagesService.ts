import { ImageLazyLoaderService} from "ng2-image-lazy-load"

export class LoadImagesService extends ImageLazyLoaderService {

  //Overrides defaul load method to imitate image load delay
  load(url: string, headers: Object):Promise<any> {
    return new Promise<any>((resolve, reject)=>{
      setTimeout(resolve, 2000)
    });
  }
}
