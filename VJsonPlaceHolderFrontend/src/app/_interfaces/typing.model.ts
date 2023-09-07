import { Category } from "./category.model";

export interface typing {
    Id: string,
    Name: string,
    Description?: string,
    DateCreated: Date,
    VotersCount: number,
    DueDate: Date,
    Categories: Category
}