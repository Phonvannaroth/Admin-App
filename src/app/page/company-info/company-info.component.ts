import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";
import { Company } from "src/app/store/company.store";
import { AngularFirestore } from "@angular/fire/firestore";
import { Companykey } from "src/app/interface/company";

@Component({
  selector: "app-company-info",
  templateUrl: "./company-info.component.html",
  styleUrls: ["./company-info.component.scss"]
})
export class CompanyInfoComponent implements OnInit {
  form: FormGroup;
  name: AbstractControl;
  employees: AbstractControl;
  email: AbstractControl;
  website: AbstractControl;
  facebook: AbstractControl;
  phone: AbstractControl;
  address_1: AbstractControl;
  address_2: AbstractControl;

  getErrorMessage() {
    return this.email.hasError("required")
      ? "You must enter a value"
      : this.email.hasError("email")
      ? "Not a valid email"
      : "";
  }
  constructor(
    private fb: FormBuilder,
    public company: Company,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    this.buildform();
    this.company.fetchData(list=>{});
  }
  buildform(): void {
    this.form = this.fb.group({
      companyname: [null, Validators.required],
      companyemail: [null, Validators.required],
      companyemployees: [null],
      companywebsite: [null],
      companyfb: [null],
      companyphone: [null, Validators.required],
      companyaddress1: [null, Validators.required],
      companyaddress2: [null]
    });
    this.name = this.form.controls["companyname"];
    this.email = this.form.controls["companyemail"];
    this.employees = this.form.controls["companyemployees"];
    this.website = this.form.controls["companywebsite"];
    this.facebook = this.form.controls["companyfb"];
    this.phone = this.form.controls["companyphone"];
    this.address_1 = this.form.controls["companyaddress1"];
    this.address_2 = this.form.controls["companyaddress2"];
  }

  _save(f: any) {
    if (this.form.valid) {
      const key = this.db.createId();
      const item: Companykey = {
        key: key,
        name: f.companyname,
        employees: f.companyemployees,
        email: f.companyemail,
        website: f.companywebsite,
        facebook: f.companyfb,
        phone_number: f.companyphone,
        address_1: f.companyaddress1,
        address_2: f.companyaddress2,
        date_create:new Date(),
      };
      this.company.addData(item, (success, error) => {
        if (success) {
          alert("success");
        } else {
          alert(error);
        }
      });
    }
  }


}
