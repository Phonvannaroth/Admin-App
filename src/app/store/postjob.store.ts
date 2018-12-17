import { Injectable } from "@angular/core";
import { DataserviceService } from "../service/dataservice.service";
import { observable, action } from "mobx-angular";
import { Postjobkey } from "../interface/postjob";

@Injectable()
export class Postjob {
  @observable public data;
  constructor(private db: DataserviceService) {}

  @action
  addData(item: Postjobkey, callback) {
    this.db
      .postjobRef()
      .doc(item.key)
      .set(item)
      .then(() => callback(true, null))
      .catch(error => callback(false, error));
  }
}
