import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {EdituploadService } from './editupload.service';
@Component({
  selector: 'app-edit-upload',
  templateUrl: './edit-upload.component.html',
  styleUrls: ['./edit-upload.component.css']
})
export class EditUploadComponent implements OnInit {

  constructor(private _serveEdit: EdituploadService, private route:ActivatedRoute,  private router: Router) { }

  ngOnInit() {
    
  }

}
