import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../interfaces/Book';
import { ImageUploadData } from '../interfaces/ImageUploadData';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

apiUrl:string = "https://api.cloudinary.com/v1_1/du4qwkruj/upload"
unsignedUploadPreset:string = "bbdd_books";

  constructor(private http:HttpClient) { }


  uploadImageCloudinary(file:File){
    const fd = new FormData();
    fd.append('upload_preset', this.unsignedUploadPreset);
    fd.append('file', file);

    return this.http.post<ImageUploadData>(this.apiUrl, fd);
  }
}
