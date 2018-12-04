import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/store/category.store';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Categorykey } from 'src/app/interface/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  links = ['Add Category', 'Edit Category', 'Fuk Category'];
  activeLink = this.links[0];
  background = '';
  form: FormGroup;
  name: AbstractControl;
  description: AbstractControl;
  constructor(public category: Category, private fb: FormBuilder ,private db :AngularFirestore) { }

  ngOnInit() {
    this.category.fetchData();
    this.buildForm();
  }
  buildForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required]
    })
    this.name = this.form.controls['name'];
    this.description = this.form.controls['description']
  }

  _save(f:any){
    if(this.form.valid){
      const key = this.db.createId();
      const item: Categorykey ={
        key:key,
        name:f.name,
        description:f.description,
      }
      this.category.adddata(item,(success , error)=>{
        if(success){
          alert("success")
        }
        else{
          alert(error)
        }
      })
    }
  }
}
