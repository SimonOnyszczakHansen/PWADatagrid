import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, ImageData } from '../../services/data.service';

@Component({
  selector: 'app-image-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-grid.component.html',
  styleUrl: './image-grid.component.css'
})
export class ImageGridComponent implements OnInit {
  images: ImageData[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.images = this.dataService.getImages()
  }
}
