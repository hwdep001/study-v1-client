class RoleCat {
    id: number;
    name: string;
    isChecked: boolean;
}

export class RoleSubCat {
    id: string;
    name: string;
    isChecked: boolean;
    roleCats: Array<RoleCat>;
}