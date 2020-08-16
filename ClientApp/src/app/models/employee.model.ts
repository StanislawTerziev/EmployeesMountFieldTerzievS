import { JobCategoryVM } from "./job-category.model";
import { GenderVM } from "./gender.model";
import { CountryVM } from "./country.model";

export class EmployeeVM {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: GenderVM;
  jobCategory: JobCategoryVM;
  email: string;
  phoneNumber: string;
  country: CountryVM;
  joinedDate: Date;
  exitedDate: Date;
}
