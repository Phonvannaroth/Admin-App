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

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { APP_SERVICE } from './service/app.service';
import { APP_STORE } from './store/app.store';
import { EditCategoryComponent } from './dialog/edit-category/edit-category.component';
import { DeleteComponent } from './dialog/delete/delete.component';

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
    JobReviewComponent,
    EditCategoryComponent,
    DeleteComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents:[
    EditCategoryComponent,
    DeleteComponent,
  ],
  providers: [
    APP_SERVICE,
    APP_STORE
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
