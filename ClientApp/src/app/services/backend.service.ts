import { Injectable, Inject } from "@angular/core";
import { EmployeeVM } from "../models/employee.model";
import { Observable, of } from "rxjs";
import { EmployeesMock } from "../models/mocks/employees.mock";
import { DropdownListsMock } from "../models/mocks/dropdown-lists.mock";
import { DropdownListsVM } from "../models/dropdown-lists.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { GenderVM } from "../models/gender.model";
import { convertFromBackendGender } from "../helpers/gender.convertor";
import { GenderTable } from "../helpers/gender.table";

@Injectable({
  providedIn: "root",
})
export class BackendService {
  private readonly httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  baseUrl: string;

  constructor(private http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getEmployeeList(): Observable<EmployeeVM[]> {
    return this.http
      .get<EmployeeVM[]>(this.baseUrl + "api/employee/getemployees")
      .pipe(
        map((employees: EmployeeVM[]) => {
          return employees.map((employee) => {
            return {
              ...employee,
              gender: convertFromBackendGender(<number>+employee.gender),
            };
          });
        })
      );
    // return of(EmployeesMock);
  }

  getDropdownLists(): Observable<DropdownListsVM> {
    return this.http
      .get<DropdownListsVM>(this.baseUrl + "api/employee/getitems")
      .pipe(
        map((lists) => {
          return {
            ...lists,
            genders: GenderTable,
          };
        })
      );
    // return of(DropdownListsMock);
  }

  deleteEmployee(employee: any): Observable<any> {
    let backendEmployee: any = { ...employee };
    delete backendEmployee["gender"];
    backendEmployee = { ...backendEmployee, gender: employee.gender.id };

    return this.http.post<any>(
      this.baseUrl + "api/employee/delete",
      backendEmployee,
      this.httpOptions
    );
  }

  udpateEmployee(employee: any): Observable<any> {
    let backendEmployee: any = { ...employee };
    delete backendEmployee["gender"];
    backendEmployee = { ...backendEmployee, gender: employee.gender.id };

    return this.http.post<any>(
      this.baseUrl + "api/employee/update",
      backendEmployee,
      this.httpOptions
    );
  }
}
