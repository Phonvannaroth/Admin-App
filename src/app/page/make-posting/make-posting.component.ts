import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { MatChipInputEvent, MatAutocompleteSelectedEvent, MatAutocomplete } from "@angular/material";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { Category } from "src/app/store/category.store";
import { Company } from "src/app/store/company.store";
import { AngularFirestore } from "@angular/fire/firestore";
import {languages} from 'src/app/dummy/languages'
import { Observable } from "rxjs";
import {map, startWith} from 'rxjs/operators';
import { Postjobkey } from "src/app/interface/postjob";
import { Postjob } from "src/app/store/postjob.store";

export interface Fruit {
  name: string;
}
export interface Transaction {
  item: string;
  cost: number;
}
export interface Sex {
  value: string;
  viewValue: string;
}

export interface Term {
  value: string;
  viewValue: string;
}
@Component({
  selector: "app-make-posting",
  templateUrl: "./make-posting.component.html",
  styleUrls: ["./make-posting.component.scss"]
})
export class MakePostingComponent implements OnInit {
  category:any;
  language:any;
  isLinear = false;
  SecondGroup: FormGroup;
  ThirdGroup: FormGroup;
  FirstGroup: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[]=[languages[2]['name']];
  allFruits: string[] = languages.map(({ name })=>name);

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  displayedColumns = ["item", "cost"];
  sexes: Sex[] = [
    { value: "1", viewValue: "Male" },
    { value: "0", viewValue: "Female" },
    { value: "2", viewValue: "Both" }
  ];
  terms: Term[] = [
    { value: "1", viewValue: "Full Time" },
    { value: "2", viewValue: "Part Time" },
    { value: "3", viewValue: "Internship" },
    { value: "4", viewValue: "Volunteer" }
  ];
  constructor(
    private _formBuilder: FormBuilder,
    private categoryfilter: Category,
    private companyfilter: Company,
    private db: AngularFirestore,
    public postjob:Postjob,
  ) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
}

  ngOnInit() {
    console.log(this.fruits);
    console.log(this.allFruits);
    this.buildform();
    this.categoryfilter.fetchData(list=>{
      if(list.length>0){
        this.FirstGroup.patchValue({
          jobcategory:list[4]['name']
        })
      }
    });
    this.companyfilter.fetchData();
  }

  compareFn(user1: any, user2: any) {
    return user1 && user2 ? user1.key === user2.key: user1 === user2;
}

  buildform(): void {
    this.FirstGroup = this._formBuilder.group({
      jobtitle: [null, Validators.required],
      yearofexp: [null, Validators.required],
      hiring: [null],
      salary: [null, Validators.required],
      sex: [null, Validators.required],
      age: [null],
      closedate: [null, Validators.required],
      term: [null, Validators.required],
      jobcategory: [null, Validators.required],
      company: [null, Validators.required],
      qualification: [null, Validators.required],
      language: [null,Validators.required],
      location: [null, Validators.required],
    });
    this.SecondGroup = this._formBuilder.group({
      requirement: [null, Validators.required]
    });
    this.ThirdGroup = this._formBuilder.group({
      description: [null, Validators.required]
    });
    this.language = this.FirstGroup.controls['language'];
    this.category = this.FirstGroup.controls['jobcategory'];
    console.log(this.language);
    console.log(this.category);
  }
  _save(first: any,second:any,third:any,chipList) {
    console.log(first);
    console.log(second);
    console.log(third);
    console.log(chipList);
    if (
      this.FirstGroup.valid &&
      this.SecondGroup.valid &&
      this.ThirdGroup.valid
    ) {
      const key = this.db.createId();
      const item: Postjobkey = {
        key: key,
        company_name: first.company,
        category_name: first.category,
        jobtitle: first.jobtitle,
        exp: first.yearofexp,
        hiring: first.hiring,
        salary: first.salary,
        sex: first.sex,
        age: first.age,
        postdate: new Date(),
        closedate: first.closedate,
        term: first.term,
        qualification: first.qualification,
        language: first.language,
        location: first.location,
        requirement: second.requirement,
        description: third.description
      };
      this.postjob.addData(item,(success,error)=>{
        if(success){
          alert("success")
        }
        else{
          alert(error)
        }
      })
    }
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.fruits.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.fruitCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
}
