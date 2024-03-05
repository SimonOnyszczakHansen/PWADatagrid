import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { DataService } from '../../services/data.service';

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

  constructor(private dialog: MatDialog, private dataService: DataService) {}

  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      console.log("No file selected");
      return;
    }
    
    const file = this.selectedFiles[0];
    this.generateThumbnail(file).then(thumbnailDataUrl => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const originalDataUrl = event.target.result; // The content of the file as a base64 encoded string
        
        const dialogRef = this.dialog.open(ImageDialogComponent, {
          data: {
            imageUrl: originalDataUrl,
            imageName: file.name,
            imageType: file.type,
            imageSize: file.size,
            thumbnailUrl: thumbnailDataUrl, // Assuming you want to display or use the thumbnail in the dialog as well
          },
        });
  
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log('Dialog result:', result);
            this.dataService.addImage(result);
          }
        });        
      };
      reader.readAsDataURL(file);
    }).catch(error => console.error("Error generating thumbnail:", error));
  }
  
  generateThumbnail(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const imgElement = document.createElement('img');
        imgElement.src = event.target.result;
        imgElement.onload = () => {
          const canvas = document.createElement('canvas');
          const scaleFactor = 0.1;
          canvas.width = imgElement.width * scaleFactor;
          canvas.height = imgElement.height * scaleFactor;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL());
        };
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }
}
