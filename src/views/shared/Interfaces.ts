export interface Authority {
    authorityId: number,
    authorityLevel: number,
    authority: string
}

export interface UserDetails {
    userId: number,
    username: string,
    accountNonLocked: boolean,
    registrationDate: Date,
    authority: Authority
}

interface User {
    userId: number,
    username: string,
    accountNonLocked: boolean,
    registrationDate: Date
}

export interface ProjectDetails {
    projectId: number,
    title: string,
    description: string,
    creationDate: Date,
    projectManager: User
}

interface Project {
    projectId: number,
    title: string,
    description: string,
    creationDate: Date,
}

export interface TicketDetails {
    ticketId: number,
    title: string,
    description: string,
    priority: string,
    category: string,
    status: string,
    creationDate: Date,
    submitter: User,
    assignedDeveloper: User
    project: Project,
}

interface Ticket {
    ticketId: number,
    title: string,
    description: string,
    priority: string,
    category: string,
    status: string,
    creationDate: Date,
}

export interface CommentDetails {
    commentId: number,
    description: string,
    creationDate: Date,
    submitter: User,
    ticket: Ticket
}

