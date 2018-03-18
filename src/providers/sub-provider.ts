import { Injectable } from '@angular/core';

import { Sub } from './../models/Sub';

@Injectable()
export class SubProvider {

  private subs_: Array<Sub>;
  private subMap_: Map<string, Sub>;

  constructor(
  ) {
    this.initData();
  }

  initData(): void {
    this.subMap_ = new Map<string, Sub>();
    this.subs_ = new Array<Sub>();

    this.subs_.push({id: "sp", num: 1, name: "맞춤법"});
    this.subs_.push({id: "sl", num: 2, name: "표준어"});
    this.subs_.push({id: "lw", num: 3, name: "외래어"});
    this.subs_.push({id: "kw", num: 4, name: "어휘"});
    this.subs_.push({id: "cc", num: 5, name: "한자"});
    this.subs_.push({id: "c4", num: 6, name: "한자성어"});
    this.subs_.push({id: "ew", num: 7, name: "영단어"});

    this.subs_.forEach(sub => {
      this.subMap_.set(sub.id, sub);
    });
  }
    
  get subMap(): Map<string, Sub> {
    return this.subMap_;
  }

  get subs(): Array<Sub> {
    return this.subs_;
  }

  getSub(id: string): Sub {
    return this.subMap_.get(id);
  }

  getActiveName(param: string): string {
    let result: string;
    switch(param) {
        case "sp":
            result = "SpPage";
            break;
        case "sl":
            result = "SlPage";
            break;
        case "lw":
            result = "LwPage";
            break;
        case "kw":
            result = "KwPage";
            break;
        case "cc":
            result = "CcPage";
            break;
        case "c4":
            result = "C4Page";
            break;
        case "ew":
            result = "EwPage";
            break;
        case "setting":
            result = "SettingPage";
            break;
    }

    return result;
  }
}