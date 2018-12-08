import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(private db: AngularFirestore) {
    
   }
   categoryRef(){
    return this.db.collection('category')
   }
   companyRef(){
     return this.db.collection('companyInfo')
   }
}
