import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TouristPlaceService } from '../../shared/tourist-place.service';
import { TouristPlace } from '../../shared/tourist-place.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-tourist-place',
  templateUrl: './tourist-place.component.html',
  styles: []
})
export class TouristPlaceComponent implements OnInit {
 // formData: TouristPlace;
 defaultImageUrl: string = "/assets/img/default-upload.jpg";
 imageUrl: string = "http://localhost:51383/Images/";
 fileToUpload: File = null;
  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef:MatDialogRef<TouristPlaceComponent> ,
  private service: TouristPlaceService, private toastr: ToastrService) { }

  ngOnInit() {
    if (this.data.itemIndex == null) {//console.log('reset')
      this.resetForm();
    } else {
       console.log('no reset')
     // this.populateForm(pd);
      // this.formData = Object.assign({}, this.data.itemIndex);
    //  pd = ;
      this.service.formData = Object.assign({}, this.data.itemIndex);
    }
  }

  // file upload
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    // show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.defaultImageUrl = event.target.result;
      if (this.service.formData.Image != '')
        this.defaultImageUrl = event.target.result;
      //  this.service.formData.Photo = '';
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  resetForm(form?: NgForm) {
    if(form!=null)
      form.resetForm();
    this.service.formData = {
      Id:0,
      Title: '',
      Image: '',
      PhotoFile: '',
      Description: '',
      CreatedDate:null,
      ModifiedDate: null,
      CreatedBy:'',
      ModifiedBy:''
    }
  }

  
  onTouristPlaceSubmit(Title, PhotoFile, Description, Image) {
  
    if (this.service.formData.Id == 0) { // insert operation
      this.service.postTouristPlace(Title.value, this.fileToUpload, Description.value, Image.value).subscribe(
        res => {
          // this.resetForm(form);
          this.service.formData.Title = null;
          //PhotoFile.value = null;
          this.service.formData.PhotoFile = null;
          this.service.formData.Image = null;
          this.service.formData.Description = null;
          this.defaultImageUrl = "/assets/img/default-upload.jpg";
          this.toastr.success('Submitted successfully', 'Tourist place registerd');
          this.service.refreshList();
          this.dialogRef.close();
        },
        err => {
          console.log(err);
        }
      )
    } else { // update operation
      // this.service.putItemDetail(Name.value, this.fileToUpload, Price.value).subscribe(
      this.service.postTouristPlace(Title.value, this.fileToUpload, Description.value, Image.value).subscribe(
        res => {
          //console.log(this.service.formData.PhotoFile);
          //console.log(this.service.formData.Photo);
          // this.resetForm(form);
          this.service.formData.Title = null;
          //PhotoFile.value = null;
          this.service.formData.PhotoFile = null;
          this.service.formData.Image = null;
          this.service.formData.Description = null;
          this.defaultImageUrl = "/assets/img/default-upload.jpg";
          this.toastr.success('Submitted successfully', 'Tourist place registerd');
          this.service.refreshList();
          this.dialogRef.close();
        },
        err => {
          console.log(err);
        }
      )
    }
  }
}
