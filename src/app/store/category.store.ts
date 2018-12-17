import { observable, action } from "mobx-angular";
import { Injectable } from "@angular/core";
import { DataserviceService } from "../service/dataservice.service";
import { Categorykey } from "../interface/category";

@Injectable()
export class Category {
  @observable public data;
  @observable loading = false;
  constructor(private ds: DataserviceService) {}

  @action
  fetchData(callback) {
    this.loading = true;
    this.ds
      .categoryRef()
      .valueChanges()
      .subscribe(docs => {
        this.loading = false;
        this.data = docs;
        callback(docs);
      });
  }
  @action
  addData(item: Categorykey, callback) {
    this.loading = true;
    this.ds
      .categoryRef()
      .doc(item.key)
      .set(item)
      .then(() => {
        this.loading = false;
        callback(true, null);
      })
      .catch(error => {
        callback(false, error);
      });
  }
  @action
  updateData(item: Categorykey, callback) {
    this.loading = true;
    this.ds
      .categoryRef()
      .doc(item.key)
      .update(item)
      .then(() => {
        this.loading = false;
        callback(true, null);
      })
      .catch(error => {
        callback(false, error);
      });
  }
  @action
  deleteData(item: Categorykey, callback) {
    this.loading = true;
    this.ds
      .categoryRef()
      .doc(item.key)
      .delete()
      .then(() => {
        this.loading = false;
        callback(true, null);
      })
      .catch(error => {
        callback(false, error);
      });
  }
}
