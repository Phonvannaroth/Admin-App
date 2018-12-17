import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import { Category } from 'src/app/store/category.store';
import { Company } from 'src/app/store/company.store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  firstCtrl:FormGroup;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [
    {name: 'English'},
    {name: 'Chinese'},
    {name: 'Japanese'},
  ];
  displayedColumns = ['item', 'cost'];
  sexes: Sex[] = [
    {value: '1', viewValue: 'Male'},
    {value: '0', viewValue: 'Female'},
    {value: '2', viewValue: 'Both'}
  ];
  terms: Term[] = [
    {value: '1', viewValue: 'Full Time'},
    {value: '2', viewValue: 'Part Time'},
    {value: '3', viewValue: 'Internship'},
    {value: '4', viewValue: 'Volunteer'}
  ];
  states: string[] = [
    'Accounting', 'Administration', 'Architecture/Engineering',
    'Assistant/Secretary', 'Audit/Taxation', 'Bank/Insurance',
    'Cashier/Receptionist', 'Catering/Restaurant', 'Consultancy',
    'Cook/Cleaner/Maid', 'Customer Service', 'Design', 'Driver/Security',
    'Education/Training', 'Finance', 'Hotel/Hospitality', 'Human Resource',
    'IT',  'Lawyer/Legal', 'Service', 'Logistics/Shipping/Deliver/Warehouse',
    'Management', 'Manufacturing', 'Marketing', 'Media/Advertising ',
    'Medical/Health/Nursing', 'Merchandising/Purchasing', 'Operation/Production',
    'Others',  'Project Management', 'QC/QA' , 'Resort/Casino',  'Sales',
    'Technician/Maintenance', 'Telecommunication', 'Translation/Interpretation',
    'Travel', 'Agent/Ticket Sales'
  ];

  constructor(private categoryfilter:Category,private companyfilter:Company,public fb:FormBuilder) { }

  ngOnInit() {
    this.categoryfilter.fetchData(list=>{});
    this.companyfilter.fetchData(list=>{});
    this.buildform();
  }
  buildform(): void{
    this.firstCtrl = this.fb.group({
      jobtitle:[null,Validators.required],
      yearofexp:[null,Validators.required],
      hiring:[null],
      salary:[null],
      sex:[null,Validators.required],
      age:[null],
      closedate:[null,Validators.required],
      term:[null,Validators.required],
      jobcategory:[null,Validators.required],
      company:[null,Validators.required],
      qualification:[null,Validators.required],
      language:[null],
      location:[null,Validators.required]
    })
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

}
