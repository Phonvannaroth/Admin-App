import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Categorykey } from 'src/app/interface/category';
import { AngularFirestore } from '@angular/fire/firestore';
import { Category } from 'src/app/store/category.store';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  form: FormGroup;
  name: AbstractControl;
  description: AbstractControl;

  constructor(public dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,
    private db:AngularFirestore,
    public category: Category) { }

  ngOnInit() {
    this.buildForm();
    // console.log(this.data)
  }
  onNoClick(){
    this.dialogRef.close();
  }

  buildForm(): void {
    this.form = this.fb.group({
      name: [this.data.name, Validators.required],
      description: [this.data.description, Validators.required]
    })
    this.name = this.form.controls['name'];
    this.description = this.form.controls['description']
  }
  _edit(f:any){
    if(this.form.valid){
      const item: Categorykey ={
        key:this.data.key,
        name:f.name,
        description:f.description,
      }
      this.category.updateData(item,(success,error)=>{
        if(success){
          this.dialogRef.close();
        }
        else{
          alert(error);
        }
      })
    }
  }

}
