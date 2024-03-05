import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ImageData {
  originalUrl: string;
  thumbnailUrl: string;
  name: string;
  type: string;
  size: number;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private imagesSource = new BehaviorSubject<ImageData[]>([]);
  images$ = this.imagesSource.asObservable();

  constructor() {}

  addImage(data: ImageData) {
    const currentValue = this.imagesSource.value;
    const updatedValue = [...currentValue, data];
    this.imagesSource.next(updatedValue);
    console.log('Current images:', updatedValue);
  }
  

  getImages(): ImageData[] {
    return this.imagesSource.value;
  }

  updateImageData(updatedImage: ImageData): void {
    const images = this.imagesSource.value;
    const index = images.findIndex(img => img.name === updatedImage.name);
    if (index !== -1) {
      const updatedImages = [...images];
      updatedImages[index] = updatedImage;
      this.imagesSource.next(updatedImages);
    } else {
      console.log("Image not found");
    }
  }  
}
