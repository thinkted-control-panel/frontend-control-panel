export interface IUpdateUser {
    email?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    birthday?: Date,
    institution?: string,
    objective?: string,
    isActive?: boolean,
    permissionPolicies?: string[]
}
