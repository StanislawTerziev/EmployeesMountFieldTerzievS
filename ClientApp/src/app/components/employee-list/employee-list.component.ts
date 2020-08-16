import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

import { EmployeeVM } from "src/app/models/employee.model";

import { EmployeeService } from "src/app/services/employee.service";
import { BackendService } from "src/app/services/backend.service";
import { configDateFormat } from "src/app/configs/app-constants.config";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css", "../styles/common.css"],
})
export class EmployeeListComponent implements OnInit {
  readonly dateFormat: string = configDateFormat;

  employeeList$: Observable<EmployeeVM[]>;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadEmployeeList();
  }

  public openEmployeeDetail(pickedEmployee: EmployeeVM) {
    this.employeeService.setDetailEmployee(pickedEmployee);
    this.router.navigate(["detail"]);
  }

  public deleteEmployee(employee: EmployeeVM) {
    this.employeeService.deleteFromEmployeeList(employee);
  }

  private loadEmployeeList() {
    this.employeeList$ = this.employeeService.getEmployeeList();
  }
}
