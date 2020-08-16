import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
} from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

import { EmployeeVM } from "src/app/models/employee.model";
import { EmployeeService } from "src/app/services/employee.service";

import { ReplaySubject, Observable } from "rxjs";
import { configDateFormat } from "src/app/configs/app-constants.config";
import { DropdownListsVM } from "src/app/models/dropdown-lists.model";
import { BackendService } from "src/app/services/backend.service";
import { takeUntil } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "app-employee-detail",
  templateUrl: "./employee-detail.component.html",
  styleUrls: ["./employee-detail.component.css"],
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {
  readonly dateFormat: string = configDateFormat;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  lists$: Observable<DropdownListsVM>;
  dbOperationFailed: boolean = false;
  employee: EmployeeVM;
  employeeForm: FormGroup;

  @ViewChild("countryDropdownTemplate", { static: true })
  public countryTmplt: TemplateRef<any>;

  @ViewChild("jobCategoryDropdownTemplate", { static: true })
  public jobCategoryTmplt: TemplateRef<any>;

  @ViewChild("genderDropdownTemplate", { static: true })
  public genderTmplt: TemplateRef<any>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService,
    private backend: BackendService
  ) {}

  ngOnInit(): void {
    this.loadEmployeeDetail();
    this.loadDropdownData();
  }

  changeDropdownValue(item: any, propName: string, dropdown: any) {
    this.employeeForm.get(propName).setValue(item);
    dropdown.toggle();
  }

  saveEmployee() {
    Object.keys(this.employeeForm.getRawValue()).forEach((propName) => {
      this.employee[propName] = this.employeeForm.get(propName).value;
    });

    this.employeeService.setEmployee(this.employee);
  }

  deleteEmployee() {
    this.employeeService
      .deleteFromEmployeeList(this.employee)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((isSuccessful) => {
        if (isSuccessful) this.router.navigate([""]);
        else {
          this.dbOperationFailed = true;
          setTimeout((_) => (this.dbOperationFailed = false), 3500);
        }
      });
  }

  navigateToList() {
    this.router.navigate([""]);
  }

  private setEmployee(employee: EmployeeVM) {
    this.employee = employee;
    this.employeeForm = this.defineForm(employee);
  }

  private loadEmployeeDetail() {
    this.employeeService.chosenDetailEmployee$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((employee) => {
        this.setEmployee(employee);
      });
  }

  private loadDropdownData() {
    this.lists$ = this.backend
      .getDropdownLists()
      .pipe(takeUntil(this.destroyed$));
  }

  private defineForm(employee: EmployeeVM): FormGroup {
    if (this.employeeForm == null)
      return this.formBuilder.group({
        name: [
          {
            value: `${employee.firstName} ${employee.lastName}`,
            disabled: true,
          },
        ],
        birthDate: [{ value: `${employee.birthDate}`, disabled: true }],
        gender: [{ value: employee.gender, disabled: false }],
        jobCategory: [{ value: employee.jobCategory, disabled: false }],
        email: [{ value: `${employee.email}`, disabled: false }],
        phoneNumber: [{ value: `${employee.phoneNumber}`, disabled: false }],
        country: [{ value: employee.country, disabled: false }],
        joinedDate: [{ value: employee.joinedDate, disabled: false }],
        exitedDate: [{ value: employee.exitedDate, disabled: false }],
      });
    else return this.employeeForm;
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
