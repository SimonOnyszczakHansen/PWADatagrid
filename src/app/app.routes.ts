import { Routes } from '@angular/router';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ImageGridComponent } from './components/image-grid/image-grid.component';

export const routes: Routes = [
    {path: "upload", component: FileUploadComponent, pathMatch: 'full'},
    {path: "show-grid", component: ImageGridComponent, pathMatch: 'full'}
];
