import { GenderVM } from "../models/gender.model";

export function convertFromBackendGender(genderId: number): GenderVM {
  let genderModel: GenderVM = new GenderVM();
  genderModel.id = genderId;
  switch (genderId) {
    case 1:
      genderModel.value = "Female";
      break;
    case 2:
      genderModel.value = "Male";
      break;
    case 3:
      genderModel.value = "Other";
      break;
  }

  return genderModel;
}

export function convertToBackendGender(genderModel: GenderVM): number {
  return genderModel.id;
}
