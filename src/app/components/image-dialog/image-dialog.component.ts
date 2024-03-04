import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css'],
})
export class ImageDialogComponent implements OnInit {
  public imageName: string = '';
  public imageType: string = '';
  public imageUrl: string = '';
  public imageSize: number = 0;
  fileTypes = ['jpg', 'png', 'gif'];
  formattedImageSize: string = '';

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.imageName = this.data.imageName || '';
    this.imageType = this.data.imageType || '';
    this.imageUrl = this.data.imageUrl || '';
    this.imageSize = this.data.imageSize || 0;
    this.formattedImageSize = this.formatNumber(this.imageSize) + ' bytes';
  }

  formatNumber(value: number): string {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }
}
