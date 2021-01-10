import { Component, OnInit } from '@angular/core';
import { TouristPlaceService } from '../../shared/tourist-place.service';
import { TouristPlace } from '../../shared/tourist-place.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { TouristPlaceComponent } from '../tourist-place/tourist-place.component';
@Component({
  selector: 'app-tourist-place-list',
  templateUrl: './tourist-place-list.component.html',
  styles: []
})
export class TouristPlaceListComponent implements OnInit {

  imageUrl: string = "http://localhost:51383/Images/";
  constructor(private service: TouristPlaceService, private toastr: ToastrService, private dialog: MatDialog) { }
  
  ngOnInit() {
   // this.service.formData.Id = null;
    this.service.refreshList();
  }
 /* populateForm(pd: ItemDetail) {
    //this.service.formData = pd;
    this.service.formData = Object.assign({},pd);
  } */
  onDelete(Id) {
    if (confirm('Are you sure you want to delete this record?')) {
    this.service.deleteTouristPlace(Id)
      .subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Deleted successfully', 'Tourist place register');
      }, err => {
          console.log(err);
      }
        )
    }
    
  }
  AddOrEditItem(itemIndex, Id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { itemIndex, Id }
    this.dialog.open(TouristPlaceComponent, dialogConfig);
  }

}
