import { Injectable } from "@angular/core";
import { observable, action } from "mobx-angular";
import { DataserviceService } from "../service/dataservice.service";
import { Companykey } from "../interface/company";

@Injectable()
export class Company {
  @observable public data;
  @observable loading = false;
  constructor(private ds: DataserviceService) {}

  @action
  fetchData(callback) {
    this.loading = true;
    this.ds
      .companyRef()
      .valueChanges()
      .subscribe(docs => {
        this.loading = false;
        this.data = docs;
        callback(docs);
      });
  }
  @action
  addData(item: Companykey, callback) {
    this.loading = true;
    this.ds
      .companyRef()
      .doc(item.key)
      .set(item)
      .then(() => {
        this.loading = false;
        callback(true, null);
      })
      .catch(error => callback(false, error));
  }
  @action
  updateData(item: Companykey, callback) {
    this.loading = true;
    this.ds
      .companyRef()
      .doc(item.key)
      .update(item)
      .then(() => {
        this.loading = false;
        callback(true, null);
      })
      .catch(error => callback(false, error));
  }
  @action
  deleteData(item: Companykey, callback) {
    this.loading = true;
    this.ds
      .companyRef()
      .doc(item.key)
      .delete()
      .then(() => {
        this.loading = false;
        callback(true, null);
      })
      .catch(error => callback(false, error));
  }
}
