export interface User{
    id:number
    email:string
    nameuser:string
    name:string
    image:string
    admin:boolean
    friends:User[]
}