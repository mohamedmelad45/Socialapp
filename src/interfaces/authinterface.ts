export interface IRegisterObject {
  name: string,
  username: string,
  email: string,
  dateOfBirth: string,
  gender: string,
  password: string,
  rePassword: string
}

export interface ILoginObject {
  email: string,
  password: string
}

export interface IUserData {
  _id: string,
  name: string,
  username: string,
  email: string,
  photo: string,
  cover: string
}