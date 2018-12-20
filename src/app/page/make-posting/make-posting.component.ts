import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl
} from "@angular/forms";
import {
  MatChipInputEvent,
  MatAutocompleteSelectedEvent,
  MatAutocomplete
} from "@angular/material";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { Category } from "src/app/store/category.store";
import { Company } from "src/app/store/company.store";
import { AngularFirestore } from "@angular/fire/firestore";
import { languages } from "src/app/dummy/languages";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
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
  langulagetest: AbstractControl;
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
  allFruits: string[] = languages.map(({ name }) => name);
  fruits: string[] = ['Khmer'];

  @ViewChild("fruitInput") fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  displayedColumns = ["item", "cost"];
  sexes: Sex[] = [
    { value: "Male", viewValue: "Male" },
    { value: "Female", viewValue: "Female" },
    { value: "Both", viewValue: "Both" }
  ];
  terms: Term[] = [
    { value: "Full Time", viewValue: "Full Time" },
    { value: "Part Tim", viewValue: "Part Time" },
    { value: "Internship", viewValue: "Internship" },
    { value: "Volunteer", viewValue: "Volunteer" }
  ];
  constructor(
    private _formBuilder: FormBuilder,
    private categoryfilter: Category,
    private companyfilter: Company,
    private db: AngularFirestore,
    public postjob: Postjob
  ) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allFruits.slice()
      )
    );
  }

  ngOnInit() {
    this.buildform();
    this.categoryfilter.fetchData(list => {
      if (list.length > 0) {
        this.FirstGroup.patchValue({
          jobcategory: list[0]
        });
      }
    });
    this.companyfilter.fetchData(list => {
      if (list.length > 0) {
        this.FirstGroup.patchValue({
          company: list[0]
        });
      }
    });
  }

  compareFn(user1: any, user2: any) {
    return user1 && user2 ? user1.key === user2.key : user1 === user2;
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
      language: [null],
      location: [null, Validators.required]
    });
    this.SecondGroup = this._formBuilder.group({
      requirement: [null, Validators.required]
    });
    this.ThirdGroup = this._formBuilder.group({
      description: [null, Validators.required]
    });
    this.langulagetest = this.FirstGroup.controls["location"];
  }

  // testing value
  // _onNext() {
  //   var properties = this.langulagetest.value.split(", ");
  //   var obj = {};
  //   properties.forEach(function(property) {
  //     var tup = property.split(":");
  //     obj[tup[0]] = tup[0];
  //   });
  //   console.log(obj);
    
  //   (this.langulagetest.value.split(",").forEach(element => {
  //     console.log(element)
  //   }))
  //   console.log(this.FirstGroup)
  // }

  _save(first: any, second: any, third: any, chipList) {
    if (
      this.FirstGroup.valid &&
      this.SecondGroup.valid &&
      this.ThirdGroup.valid
    ) {
      const key = this.db.createId();
      const item: Postjobkey = {
        key: key,
        company_name: first.company,
        category_name: first.jobcategory,
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
        language: this.fruits.map(lang => ({ [lang]: lang })),
        location: first.location.split(",").map((loca)=>({[loca]:loca})),
        requirement: second.requirement,
        description: third.description
      };
      // console item value
      // console.log(item);
      this.postjob.addData(item, (success, error) => {
        if (success) {
          alert("success");
        } else {
          alert(error);
        }
      });
    }
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const value = event.value;
      if ((value || "").trim()) {
        this.fruits.push(value.trim());
        this.FirstGroup.patchValue({
          language: this.fruits
        });
      }
    }
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits.splice(index, 1);
      this.FirstGroup.patchValue({
        language: this.fruits
      });
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = "";
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(
      fruit => fruit.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
