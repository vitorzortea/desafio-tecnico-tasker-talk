export type Project = {
    id?: string,
    imagem: string,
    empresa: string,
    title: string,
    createdAt: string,
    endAt: string,
    status: number,
    userId: string,
    user:{namw:string, avatar:string}
    porcent: number,
    editedAt: string,
    listTask?: any[],
}
export type ProjectList = {
        items: Project[],
        count: number
}