import { observable, action } from 'mobx-angular';
import { Injectable } from '@angular/core';
import { DataserviceService } from '../service/dataservice.service';
import { Categorykey } from '../interface/category';

@Injectable()
export class Category {
    @observable public data;
  
    constructor(private ds:DataserviceService){}
  
    @action
    fetchData() {
      this.ds.categoryRef().valueChanges().subscribe(docs=>{
        this.data=docs;
      })
    }
    @action
    adddata(item:Categorykey,callback){
        this.ds.categoryRef().doc(item.key).set(item).then(()=>
        callback(true,null)).catch(error => { callback(false,error)})
    }
  }