import { Component, ViewChild, ElementRef, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-dialog',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatFormField, MatSelectModule, FormsModule ],
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css'],
})
export class ImageDialogComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  public imageName: string = '';
  public imageType: string = '';
  public imageUrl: string = '';
  public imageSize: number = 0;
  public formattedImageSize: string = '';
  private selectedFile: File | null = null;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ImageDialogComponent>,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.imageName = this.data.imageName || '';
      this.imageType = this.data.imageType || '';
      this.imageUrl = this.data.imageUrl || '';
      this.imageSize = this.data.imageSize || 0;
      this.formattedImageSize = this.formatNumber(this.imageSize) + ' bytes';
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.imageName = file.name;
      this.imageType = file.type;
      this.imageSize = file.size;
      this.formattedImageSize = this.formatNumber(file.size) + ' bytes';

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result; // For image preview
      };
      reader.readAsDataURL(file);
    }
  }

  confirmUpload(): void {
    if (this.selectedFile) {
      this.dataService.addImage({
        originalUrl: this.imageUrl,
        thumbnailUrl: this.imageUrl,
        name: this.imageName,
        type: this.imageType,
        size: this.imageSize,
      });
    }
    this.dialogRef.close({
      ...this.data,
      imageName: this.imageName,
    })
  }

  formatNumber(value: number): string {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }
}
