import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { DatePipe } from "@angular/common";

import {
  NgbDatepickerModule,
  NgbDropdownModule,
} from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";
import { LeftDatePipe } from "./pipes/left-date.pipe";
import { EmployeeListComponent } from "./components/employee-list/employee-list.component";
import { EmployeeDetailComponent } from "./components/employee-detail/employee-detail.component";
import { HeaderComponent } from "./components/header/header.component";
import { DatepickerItemComponent } from "./components/employee-detail/detail-item/datepicker-item/datepicker-item.component";
import { DetailItemComponent } from "./components/employee-detail/detail-item/detail-item.component";
import { DropdownItemComponent } from "./components/employee-detail/detail-item/dropdown-item/dropdown-item.component";

@NgModule({
  declarations: [
    AppComponent,
    LeftDatePipe,
    HeaderComponent,
    EmployeeListComponent,
    EmployeeDetailComponent,
    DetailItemComponent,
    DatepickerItemComponent,
    DropdownItemComponent,
    DropdownItemComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    RouterModule.forRoot([
      { path: "", component: EmployeeListComponent, pathMatch: "full" },
      { path: "detail", component: EmployeeDetailComponent },
    ]),
  ],
  providers: [DatePipe, LeftDatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
