import { Sub } from './../Sub';
import { Cat } from './../Cat';
import { Lec } from './../Lec';
import { Level } from './../Level';

export class SearchCondition {

    lecList?: Array<Lec>;
    levelList?: Array<Level>;
    countList?: Array<number>;

    sub?: Sub;
    cat?: Cat;
    lec?: Lec;
    lecIdList?: Array<number>;
    levelIdList?: Array<number>;
    count?: number;
    randomed?: boolean;
    uid?: string;

    constructor(
        sub: Sub,
        cat: Cat, 
        lec: Lec, 
        lecIdList: Array<number>,
        levelIdList: Array<number>, 
        count: number,
        randomed: boolean,
        uid: string
    ) {
        this.sub = sub;
        this.cat = cat;
        this.lec = lec;
        this.lecIdList = lecIdList;
        this.levelIdList = levelIdList;
        this.count = count;
        this.randomed = randomed;
        this.uid = uid;
    }
}