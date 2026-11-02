import type { ILoginObject, IRegisterObject } from "../interfaces/authinterface";

export const RegistrationDefaultValues: IRegisterObject = {
  name: "",
  username: "",
  email: "",
  dateOfBirth: "",
  gender: "",
  password: "",
  rePassword: ""
}
export const LoginDefaultValues: ILoginObject = {
  email: "",
  password: "",
  
}