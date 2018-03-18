declare global {

    interface Array<T> {
        shuffleArray(): Array<T>;
    }
}

Array.prototype.shuffleArray = function () {
    let m = this.length, t, i;

    while (m) {
        i = Math.floor(Math.random() * m--);

        t = this[m];
        this[m] = this[i];
        this[i] = t;
    }

    return this;
};

export class CommonUtil {
    public static void(): void { };
}