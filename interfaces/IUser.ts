import IRegister from "../interfaces/IRegister";


export interface IUser extends IRegister {
    id: string,
    permissionPolicies: string[]
}