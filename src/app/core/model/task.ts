export type Task = {
    createdAt:string,
    description:string,
    endAt:string,
    id?:string,
    projectId:string,
    status:string,
    subTasks:string,
    title:string,
    porcent:number
}
export type TasktList = {
        items: Task[],
        count: number
}