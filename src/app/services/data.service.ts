import { Injectable } from '@angular/core';

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
  private images: ImageData[] = [];

  constructor() {}

  addImage(data: ImageData) {
    this.images.push(data);
  }

  getImages(): ImageData[] {
    return this.images;
  }

  updateImageData(updatedImage: any): void {
    const index = this.images.findIndex(img => img.name === updatedImage.name)
    if (index !== -1) {
      this.images[index] = updatedImage;
    }else 
    {
      console.log("Image not found")
    }
  }
}
