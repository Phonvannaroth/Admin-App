import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { MakePostingComponent } from './page/make-posting/make-posting.component';
import { CategoryComponent } from './page/category/category.component';
import { CompanyInfoComponent } from './page/company-info/company-info.component';

const routes: Routes = [
  {path: 'makePosting', component: MakePostingComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'company', component: CompanyInfoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
