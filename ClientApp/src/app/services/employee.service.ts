import { ReplaySubject, Observable } from "rxjs";
import { Injectable, OnDestroy } from "@angular/core";
import { EmployeeVM } from "../models/employee.model";
import { BackendService } from "./backend.service";
import { takeUntil } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class EmployeeService implements OnDestroy {
  private employeeSource = new ReplaySubject<EmployeeVM>();
  private employeeListSource = new ReplaySubject<EmployeeVM[]>();
  private destruction$: ReplaySubject<boolean> = new ReplaySubject(1);

  private employee: EmployeeVM;
  private employeeList: EmployeeVM[];

  public chosenDetailEmployee$ = this.employeeSource.asObservable();
  public employeeList$ = this.employeeListSource.asObservable();

  constructor(private backend: BackendService) {}

  // Service message commands
  setDetailEmployee(employee: EmployeeVM) {
    this.employee = employee;
    this.employeeSource.next(employee);
  }

  setEmployee(employee: EmployeeVM): Observable<boolean> {
    const isEmployeeUpdateSuccessfulSource = new ReplaySubject<boolean>();

    this.backend
      .udpateEmployee(employee)
      .pipe(takeUntil(this.destruction$))
      .subscribe((_) => {
        isEmployeeUpdateSuccessfulSource.next(true);
        this.employeeSource.next(employee);
      });

    return isEmployeeUpdateSuccessfulSource.asObservable();
  }

  getEmployee(): Observable<EmployeeVM> {
    return this.chosenDetailEmployee$;
  }

  getEmployeeList(): Observable<EmployeeVM[]> {
    if (this.employeeList == null) {
      this.backend
        .getEmployeeList()
        .pipe(takeUntil(this.destruction$))
        .subscribe((list) => {
          this.employeeList = list;
          this.employeeListSource.next(this.employeeList);
        });
    }

    return this.employeeList$;
  }

  deleteFromEmployeeList(employeeToDelete: EmployeeVM): Observable<boolean> {
    const isEmployeeDeleteSuccessfulSource = new ReplaySubject<boolean>();

    this.backend
      .deleteEmployee(employeeToDelete)
      .pipe(takeUntil(this.destruction$))
      .subscribe((_) => {
        isEmployeeDeleteSuccessfulSource.next(true);
        this.employeeList = this.employeeList.filter(
          (empl) => empl != employeeToDelete
        );
        this.employeeListSource.next(this.employeeList);
      });

    return isEmployeeDeleteSuccessfulSource.asObservable();
  }

  ngOnDestroy(): void {
    this.destruction$.next(true);
  }
}
