import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../shared/user.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  userDetails;
  constructor(private router: Router, private service: UserService) {}
  ngOnInit() {
    this.service.getUserProfile().subscribe(
      (res) => {
        this.userDetails = res;
        console.log(this.userDetails);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
