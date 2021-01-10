import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";
//import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
} from "@angular/material";
import { MatFormFieldModule } from "@angular/material";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SignUpComponent } from "./user/sign-up/sign-up.component";
import { SignInComponent } from "./user/sign-in/sign-in.component";
import { UserComponent } from "./user/user.component";

//import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { RouterModule } from "@angular/router";
import { UserService } from "./shared/user.service";
import { HomeComponent } from "./home/home.component";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";
import { ForbiddenComponent } from "./forbidden/forbidden.component";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { Ng2OrderModule } from "ng2-order-pipe";
import { NgxPaginationModule } from "ngx-pagination";
import { TouristPlaceService } from "./shared/tourist-place.service";
import { TouristPlacesComponent } from "./tourist-places/tourist-places.component";
import { TouristPlaceComponent } from "./tourist-places/tourist-place/tourist-place.component";
import { TouristPlaceListComponent } from "./tourist-places/tourist-place-list/tourist-place-list.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

    SignUpComponent,
    SignInComponent,
    UserComponent,

    AdminPanelComponent,
    ForbiddenComponent,
    TouristPlacesComponent,
    TouristPlaceComponent,
    TouristPlaceListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: "toast-top-right",
      preventDuplicates: true,
      progressBar: true,
    }),
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    //RouterModule.forRoot(appRoutes)
  ],
  /* If use the commented providers, then cannot login .. dont know why */
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    TouristPlaceService,
  ],
  // providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
