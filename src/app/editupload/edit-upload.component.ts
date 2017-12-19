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
  private filterItem;
  ngOnInit() {
    this.uploadFetchService();
    this.route.params.subscribe((params: Params) => {
          this.filterItem = params.data;
    });
    
  }

  uploadFetchService(){
    this._passdata.getReposForUser().subscribe(
      data => {
        this.passData = data;
      })
  }

}
