interface Authority {
    id: number,
    authorityLevel: number,
    authority: string
}

export interface UserViewModel {
    id: number,
    username: string
    registrationDate: Date,
    authority: Authority
}
