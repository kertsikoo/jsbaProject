import { Component, Input } from '@angular/core';
import { Image } from '../image';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent {

  @Input()
  image: Image;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;


  constructor(private imageService: ImageService) { }
  
  createImage(image: Image) {
    this.imageService.createImage(image).then((newImage: Image) => {
      this.createHandler(newImage);
    });
  }

  updateImage(image: Image): void {
    this.imageService.updateImage(image).then((updatedImage: Image) => {
      this.updateHandler(updatedImage);
    });
  }

  deleteImage(imageId: String): void {
    this.imageService.deleteImage(imageId).then((deletedImageId: String) => {
      this.deleteHandler(deletedImageId);
    });
  }

}
