import { Injectable, Output, EventEmitter } from '@angular/core';
import { TouristPlace } from './tourist-place.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';

const HttpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
}

@Injectable({
  providedIn: 'root'
})
export class TouristPlaceService {
  formData: TouristPlace;
  readonly rootUrl = 'http://localhost:51383';
  list: TouristPlace[];
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private http: HttpClient) { }

  postTouristPlace(Title: string, fileToUpload, Description, Image: string) {
    const endpoint = this.rootUrl + '/api/TouristPlace/';
    const formData: FormData = new FormData();
    formData.append('Id', this.formData.Id.toString());
    formData.append('Title', Title);
    formData.append('Description', Description);
    formData.append('Image', Image);
    if (fileToUpload != null)
      formData.append('PhotoFile', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData);
   
  }

  putTouristPlace(Title: string, fileToUpload: File, Description) {
    return this.http.put(this.rootUrl + '/api/TouristPlace/' + this.formData.Id, this.formData);
  }
  deleteTouristPlace(Id) {
    return this.http.delete(this.rootUrl + '/api/TouristPlace/' + Id);
  }
  refreshList() {
    this.http.get(this.rootUrl + '/api/TouristPlace')
      .toPromise()
      .then(res => this.list = res as TouristPlace[]);
  }
}
