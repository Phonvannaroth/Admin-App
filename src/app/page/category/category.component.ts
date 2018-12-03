import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  links = ['Add Category', 'Edit Category', 'Fuk Category'];
  activeLink = this.links[0];
  background = '';
  constructor() { }

  ngOnInit() {
  }

}
