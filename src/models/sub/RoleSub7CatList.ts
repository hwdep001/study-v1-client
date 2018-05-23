class RoleCat {
    id: number;
    name: string;
    isChecked: boolean;
}

export class RoleSub7CatList {
    id: string;
    name: string;
    isChecked: boolean;
    roleCatList: Array<RoleCat>;
}