export type IUser = {
    id: string
    firstName: string
    lastName: string
    email: string
    companyName?: string
    userTypeName: string
    userTypeId: number
    createdAt: Date
    balance: number
}
