

export class CategoryEntity {
    id: string;
    name: string;
    icon_name: string;
    display_order: number;
    is_active: boolean;


    constructor(partial: Partial<CategoryEntity>){
        Object.assign(this, partial)
    }
}
