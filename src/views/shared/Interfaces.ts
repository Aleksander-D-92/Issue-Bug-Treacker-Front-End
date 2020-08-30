export interface AuthorityViewModel {
    id: number,
    authorityLevel: number,
    authority: string
}

export interface UserViewModel {
    id: number,
    username: string,
    accountNonLocked: boolean,
    registrationDate: Date,
    authority: AuthorityViewModel
}

export interface TicketViewModel {
    id: number,
    projectId: number,
    submitterId: number,
    assignedDeveloperId: number,
    title: string,
    projectTitle: string,
    submitterName: string,
    assignedDeveloperName: string,
    priority: string,
    category: string,
    status: string,
    creationDate: Date
}

export interface ProjectViewModel {
    id: number,
    projectManagerId: number,
    title: string,
    description: string,
    creationDate: Date,
    projectManagerName: string
}
