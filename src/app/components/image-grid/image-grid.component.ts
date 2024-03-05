import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { DataService, ImageData } from '../../services/data.service';

@Component({
  selector: 'app-image-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.css']
})
export class ImageGridComponent implements OnInit, OnDestroy {
  images: ImageData[] = [];
  private imagesSubscription!: Subscription;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.imagesSubscription = this.dataService.images$.subscribe(images => {
      this.images = images;
    });
  }

  ngOnDestroy(): void {
    if (this.imagesSubscription) {
      this.imagesSubscription.unsubscribe();
    }
  }
}
