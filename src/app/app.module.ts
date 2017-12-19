import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from "@angular/router";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UploadComponent } from './upload/upload.component';
import { EditUploadComponent } from './editupload/edit-upload.component';
import { EdituploadService} from './editupload/editupload.service';
import { UploadService } from './upload/upload.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BasicfilterPipe } from './pipe/filter/basicfilter.pipe';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'upload', pathMatch: 'full' },
  { path: 'upload', component: UploadComponent },
  { path: 'upload/edit/:data', component: EditUploadComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UploadComponent,
    EditUploadComponent,
    BasicfilterPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(ROUTES),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [UploadService, EdituploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
