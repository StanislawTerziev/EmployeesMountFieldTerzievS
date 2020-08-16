import { CountryVM } from "./country.model";
import { JobCategoryVM } from "./job-category.model";
import { GenderVM } from "./gender.model";

export class DropdownListsVM {
  countries: CountryVM[];
  jobCategories: JobCategoryVM[];
  genders: GenderVM[];
}
