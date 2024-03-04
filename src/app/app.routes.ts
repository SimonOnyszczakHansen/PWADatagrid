import { Routes } from '@angular/router';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

export const routes: Routes = [
    {path: "file", component: FileUploadComponent, pathMatch: 'full'}
];
