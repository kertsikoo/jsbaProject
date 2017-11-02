import { Injectable } from '@angular/core';
import { Image } from './image';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ImageService {
  private imagesUrl = '/api/images';

  constructor(private http: Http) { } 

  // get("/api/images")
  getImages(): Promise<void | Image[]> {
    return this.http.get(this.imagesUrl)
               .toPromise()
               .then(response => response.json() as Image[])
               .catch(this.handleError);
  }

  // post("/api/images")
  createImage(newImage: Image): Promise<void | Image> {
    return this.http.post(this.imagesUrl, newImage)
               .toPromise()
               .then(response => response.json() as Image)
               .catch(this.handleError);
  }

  // get("/api/images/:id") endpoint not used by Angular app

    // delete("/api/images/:id")
    deleteImage(delImageId: String): Promise<void | String> {
      return this.http.delete(this.imagesUrl + '/' + delImageId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }
    // put("/api/images/:id")
    updateImage(putImage: Image): Promise<void | Image> {
      var putUrl = this.imagesUrl + '/' + putImage._id;
      return this.http.put(putUrl, putImage)
                 .toPromise()
                 .then(response => response.json() as Image)
                 .catch(this.handleError);
    }

    private handleError (error: any): Promise<void | any> {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
      return Promise.reject(errMsg);
    }


}
