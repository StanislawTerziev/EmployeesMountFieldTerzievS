import { EmployeeVM } from "../employee.model";
import { GenderVM } from "../gender.model";

export const EmployeesMock: EmployeeVM[] = [
  {
    id: 1,
    firstName: "Antonin",
    lastName: "Dvorak",
    birthDate: new Date(1985, 11, 17),
    country: {
      id: 1,
      name: "Czechia",
    },
    email: "antonin.dvorak@seznam.cz",
    joinedDate: new Date(2016, 4, 21),
    exitedDate: null,
    gender: {
      id: 2,
      value: "Male",
    },
    jobCategory: {
      id: 3,
      title: "Project Manager",
    },
    phoneNumber: "+420609495321",
  },
  {
    id: 2,
    firstName: "Martin",
    lastName: "Novak",
    birthDate: new Date(1989, 2, 13),
    country: {
      id: 2,
      name: "Slovakia",
    },
    email: "martin.novak@gmail.com",
    joinedDate: new Date(2015, 3, 1),
    exitedDate: new Date(2019, 5, 1),
    gender: {
      id: 2,
      value: "Male",
    },
    jobCategory: {
      id: 4,
      title: "Programmer",
    },
    phoneNumber: "+421720415391",
  },
];
