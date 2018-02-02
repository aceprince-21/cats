import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from "@angular/router";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UploadComponent } from './upload/upload.component';
import { EditUploadComponent } from './editupload/edit-upload.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingComponent } from './setting/setting.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EdituploadService} from './editupload/editupload.service';
import { UploadService } from './upload/upload.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BasicfilterPipe } from './pipe/filter/basicfilter.pipe';
import { CommonModule, APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgDatepickerModule } from 'ng2-datepicker';
import { HelpComponent } from './help/help.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'mydocuments', pathMatch: 'full' },
  { path: 'mydocuments', component: UploadComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'help', component: HelpComponent  },
  { path: 'mydocuments/upload/:data', component: EditUploadComponent},
  { path: 'mydocuments/edit/:files', component: EditUploadComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UploadComponent,
    EditUploadComponent,
    ReportsComponent,
    AdminComponent,
    SettingComponent,
    DashboardComponent,
    BasicfilterPipe,
    HelpComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
  	HttpClientModule,
    CommonModule, 
    FormsModule,
    NgDatepickerModule,
    
    AngularFontAwesomeModule,
    NgxPaginationModule,
    RouterModule.forRoot(ROUTES),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [UploadService, EdituploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
