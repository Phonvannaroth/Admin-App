import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material-module';
import { from } from 'rxjs';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { ContentComponent } from './layout/content/content.component';
import { MenuComponent } from './component/menu/menu.component';
import { ContentHeaderComponent } from './component/content-header/content-header.component';
import { MakePostingComponent } from './page/make-posting/make-posting.component';
import { CategoryComponent } from './page/category/category.component';
import { JobDetailComponent } from './page/job-detail/job-detail.component';
import { JobRequirementComponent } from './page/job-requirement/job-requirement.component';
import { JobDescriptionComponent } from './page/job-description/job-description.component';
import { CompanyInfoComponent } from './page/company-info/company-info.component';
import { JobReviewComponent } from './page/job-review/job-review.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    AppLayoutComponent,
    ContentComponent,
    MenuComponent,
    ContentHeaderComponent,
    MakePostingComponent,
    CategoryComponent,
    JobDetailComponent,
    JobRequirementComponent,
    JobDescriptionComponent,
    CompanyInfoComponent,
    JobReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
