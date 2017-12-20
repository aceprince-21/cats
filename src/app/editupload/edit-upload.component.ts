import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {EdituploadService } from './editupload.service';
import {UploadService} from '../upload/upload.service';
import { BasicfilterPipe } from '../pipe/filter/basicfilter.pipe';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';

@Component({
  selector: 'app-edit-upload',
  templateUrl: './edit-upload.component.html',
  styleUrls: ['./edit-upload.component.css']
})
export class EditUploadComponent implements OnInit {

  constructor(private _passdata: UploadService, private _serveEdit: EdituploadService, private route:ActivatedRoute,  private router: Router) { }
  private passData:any = [];
  private getHost:any = [];
  private getDocType:any = [];
  private id:any =[];
  private filterItem;
  private filterItemss:any = [];
  private hostapplist:any = [];
  private leftSelectedItem:any = [];
  private rightSelectedItem:any = [];
  
  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MMM D[,] YYYY',
    barTitleFormat: 'MMMM YYYY',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    locale: frLocale
  };

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
        this.filterItemss = data.hostAppList;
        this.filterExistingItems();
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
      })
  }

  filterExistingItems(){
    let getHost = this.getHost;
    let applist = this.filterItemss;
    let keys = [];
        for(let i=0; i<getHost.length; i++){
           for(let j=0; j<applist.length; j++){
                if(getHost[i].hostAppID === applist[j].hostAppID ){
                    getHost.splice(i, 1);
                }
           }
        }
        keys = getHost;
        const dataT =  keys.filter((value, index, array) => {
          return array.indexOf(value) === index;
        });

        applist =  applist.filter((value, index, array) => {
          return array.indexOf(value) === index;
        });

        this.hostapplist  = applist;
        this.getHost = dataT;
  }

  leftSelectedArray(host,ind){
    
    host.active = 'true';
    this.leftSelectedItem.push(host);
    const newitem = this.leftSelectedItem.filter((value, index, array) => {
        return array.indexOf(value) === index;
    });
    this.leftSelectedItem = newitem;
  }

  righttSelectedArray(host,ind){
    host.active = 'true';
    this.rightSelectedItem.push(host);
    const newitem = this.rightSelectedItem.filter((value, index, array) => {
        return array.indexOf(value) === index;
    });
    this.rightSelectedItem = newitem;
  }


  removeItem(host, ind){
    host.active = '';
    console.log(host);
     const remIem = this.leftSelectedItem.filter(e => e !== host)
     this.leftSelectedItem = remIem;
  }

  removerightItem(host, ind){
    host.active = '';
    console.log(host);
     const remIem = this.rightSelectedItem.filter(e => e !== host)
     this.leftSelectedItem = remIem;
  }

  moveAlltoright(){
    const rightTable = this.filterItemss;
    const leftTable =  this.getHost;
    let MoveTable = rightTable.concat(leftTable);
    this.filterItemss = MoveTable;
    this.filterExistingItems();
  }

  moveSelectedtoright(){
    const rightTable = this.filterItemss;
    const leftTable =  this.leftSelectedItem;
    let MoveTable = rightTable.concat(leftTable);
    this.filterItemss = MoveTable;
    this.leftSelectedItem = [];
    this.filterExistingItems();
  }

  moveSelectedtoleft(){
    const rightTable =  this.rightSelectedItem;
    const leftTable =  this.getHost;
    let MoveTable = leftTable.concat(rightTable);
    this.getHost = MoveTable;
    console.log(this.getHost);
    this.filterExistingItems();
  }

  moveAlltoleft(){
    const rightTable = this.filterItemss;
    const leftTable =  this.getHost;
    let MoveTable = rightTable.concat(leftTable);
    this.getHost = MoveTable;
    this.filterItemss = [];
    this.filterExistingItems();
  }

}
