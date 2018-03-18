import { Sub } from './Sub';
import { Cat } from './Cat';
import { Lec } from './Lec';

export class WordSearch {
    sub: Sub;
    cat: Cat;
    lec: Lec;
    lecIds: Array<number>;
    levIds: Array<number>;
    count: number;
    randomed: boolean;
    uid: string;

    constructor(
        sub: Sub,
        cat: Cat, 
        lec: Lec, 
        lecIds: Array<number>,
        levIds: Array<number>, 
        count: number,
        randomed: boolean,
        uid: string
    ) {
        this.sub = sub;
        this.cat = cat;
        this.lec = lec;
        this.lecIds = lecIds;
        this.levIds = levIds;
        this.count = count;
        this.randomed = randomed;
        this.uid = uid;
    }
}