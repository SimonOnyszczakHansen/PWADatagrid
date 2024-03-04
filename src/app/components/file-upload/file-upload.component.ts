import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component'; // Ensure the path is correct

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  selectedFiles?: FileList;

  constructor(private dialog: MatDialog) {}

  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      console.log("No file selected");
      return;
    }
  
    const file = this.selectedFiles[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      // Assuming you are only handling the first file
      this.dialog.open(ImageDialogComponent, {
        data: {
          imageUrl: event.target.result, // The content of the file as a base64 encoded string
          imageName: file.name, // Default name from the file, user can edit in dialog
          imageType: file.type, // File type (MIME type)
          imageSize: file.size // File size in bytes
        },
      });
    };
    reader.readAsDataURL(file); // Convert the file to a data URL for preview
  }
}
