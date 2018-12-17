import { Injectable } from "@angular/core";
import { observable, action } from "mobx-angular";
import { DataserviceService } from "../service/dataservice.service";
import { Companykey } from "../interface/company";

@Injectable()
export class Company {
  @observable public data;
  constructor(private ds: DataserviceService) {}

  @action
  fetchData() {
    this.ds
      .companyRef()
      .valueChanges()
      .subscribe(docs => {
        this.data = docs;
      });
  }
  @action
  addData(item: Companykey, callback) {
    this.ds
      .companyRef()
      .doc(item.key)
      .set(item)
      .then(() => callback(true, null))
      .catch(error => callback(false, error));
  }
  @action
  updateData(item: Companykey, callback) {
    this.ds
      .companyRef()
      .doc(item.key)
      .update(item)
      .then(() => callback(true, null))
      .catch(error => callback(false, error));
  }
  @action
  deleteData(item: Companykey, callback) {
    this.ds
      .companyRef()
      .doc(item.key)
      .delete()
      .then(() => callback(true, null))
      .catch(error => callback(false, error));
  }
}
