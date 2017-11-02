import { Component, OnInit } from '@angular/core';
import { Image } from '../image';
import { ImageService } from '../image.service';
import { ImageDetailsComponent } from '../image-details/image-details.component';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css'],
  providers: [ImageService]
})

export class ImageListComponent implements OnInit {

  images: Image[]
  selectedImage: Image

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.imageService
    .getImages()
    .then((images: Image[])=> {
      this.images = images.map((image)=>{
        return image;
        
      });
    });
  }

  private getIndexOfImage = (imageId: String) => {
    return this.images.findIndex((image) => {
      return image._id === imageId;
    });
  }

  selectImage(image: Image){
    this.selectedImage = image
  }

  createNewImage() {
    var image: Image = {
      description: '',
      image: '',
      other: ''
    };
    
  
   // By default, a newly-created image will have the selected status.
   this.selectImage(image);
  }
  deleteImage = (imageId: String) => {
    var idx = this.getIndexOfImage(imageId);
    if (idx !== -1) {
      this.images.splice(idx, 1);
      this.selectImage(null);
    }
    return this.images;
  }

  addImage = (image: Image) => {
    this.images.push(image);
    this.selectImage(image);
    return this.images;
  }

  updateImage = (image: Image) => {
    var idx = this.getIndexOfImage(image._id);
    if (idx !== -1) {
      this.images[idx] = image;
      this.selectImage(image);
    }
    return this.images;
  }
}
