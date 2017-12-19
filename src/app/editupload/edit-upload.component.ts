import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {EdituploadService } from './editupload.service';
import {UploadService} from '../upload/upload.service';
import { BasicfilterPipe } from '../pipe/filter/basicfilter.pipe';

@Component({
  selector: 'app-edit-upload',
  templateUrl: './edit-upload.component.html',
  styleUrls: ['./edit-upload.component.css']
})
export class EditUploadComponent implements OnInit {

  constructor(private _passdata: UploadService, private _serveEdit: EdituploadService, private route:ActivatedRoute,  private router: Router) { }
  private passData;
  private getHost;
  private getDocType;
  private get
  private filterItem;
  ngOnInit() {
   
    this.hostAppService();
    this.doctypeService();
    this.route.params.subscribe((params: Params) => {
          this.filterItem = params.data;
    });
    this.uploadFetchService(this.filterItem);
  }

  uploadFetchService(e){
    this._serveEdit.EditPage(e).subscribe(
      data => {
        this.passData = data;
      })
  }

  doctypeService(){
    this._serveEdit.doctype().subscribe(
      data => {
        this.getDocType = data;
      })
  }

  hostAppService(){
    this._serveEdit.getHostapp().subscribe(
      data => {
        this.getHost = data;
        console.log(this.getHost);
      })
  }

}
