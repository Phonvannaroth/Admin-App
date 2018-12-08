import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Category } from 'src/app/store/category.store';
import { Categorykey } from 'src/app/interface/category';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  msg:any;
  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public category: Category,
    private  snackBar:MatSnackBar) { }

  ngOnInit() {
    this.msg = this.data
  }
 _delete(item){
   this.category.deleteData(item,(success,error)=>{
     if(success){
      this.dialogRef.close();
      this.snackBar.open('Category Deleted.', 'done', { duration: 2000 });
     }
     else{
       alert(error);
     }
   })
 }
}
