import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EdituploadService } from './editupload.service';
import { UploadService} from '../upload/upload.service';
import { BasicfilterPipe } from '../pipe/filter/basicfilter.pipe';
import { DatepickerOptions } from 'ng2-datepicker';
import { uploadModel} from './exportmodel';
import { configs} from '../../environments/config'

@Component({
  selector: 'app-edit-upload',
  templateUrl: './edit-upload.component.html',
  styleUrls: ['./edit-upload.component.scss']
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
  private CollectData:any = [];
  private docSetting:boolean = false;
  private newEffectiveDate:any = null;
  private newTerminationDate:any = null;
  
  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MM-DD-YYYY',
    barTitleFormat: 'MMMM YYYY',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
  };

  ngOnInit() {
    this.hostAppService();
    this.doctypeService();
    this.CollectData = uploadModel;
    this.route.params.subscribe((params: Params) => {
          this.filterItem = params.data;
          const get_path = this.route.url.value[1].path; 
          console.log(this.filterItem);
          if(get_path!= 'upload'){
            this.uploadFetchService(this.filterItem);
            this.docSetting = true;
          }
          else{
         
          }
    });
    this.SetUpformdata();
  }

  SetUpformdata(){
    this.CollectData.uploadedDate = this.CurrentDate('-',0);
    this.CollectData.effectiveDate = this.CurrentDate('-',0);
    this.CollectData.terminationDate = this.CurrentDate('-',2);
  }

  CurrentDate(sym,sel){
    const Months =  configs.Months;
    let getMontValue = 0;
    let date = Date();
    let month = date.split(' ')[1];
    let curentDate  = parseInt(date.split(' ')[2]);
    let Year = date.split(' ')[3];
    month =  month.toLowerCase();

      for(let i=0; i< Months.length; i++){
        if(Months[i] === month){
          getMontValue = i+1;
        }
      }
      return getMontValue+sym+(curentDate+sel)+sym+Year;
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
        this.hostapplist =[];
        this.getHost = [];
        this.hostapplist  = applist;
        this.getHost = dataT;
  }

  filterrightItems(x){
    let getHost = x;
    let applist = this.filterItemss;
    let keyss = [];
    x.forEach((element) => {
              keyss = applist.filter(e => e !== element);
      });
        this.filterItemss  = keyss;
        uploadModel.hostAppList = this.filterItemss;
  }

  leftSelectedArray(host,ind){
    if(host.active === 'true'){
       host.active = '';
       console.log(host);
       const remIem = this.leftSelectedItem.filter(e => e !== host)
       this.leftSelectedItem = remIem;
       host.active = ''
    }
    else{
      this.leftSelectedItem.push(host);
      const newitem = this.leftSelectedItem.filter((value, index, array) => {
          return array.indexOf(value) === index;
      });
      this.leftSelectedItem = newitem;
      host.active = 'true'
    }
  }


  righttSelectedArray(host,ind){
    if(host.active === 'true'){
       host.active = '';
       console.log(host);
       const remIem = this.rightSelectedItem.filter(e => e !== host)
       this.rightSelectedItem = remIem;
       host.active = ''
    }
    else{
      this.rightSelectedItem.push(host);

      const newitem = this.rightSelectedItem.filter((value, index, array) => {
          return array.indexOf(value) === index;
      });
      this.rightSelectedItem = newitem;
      host.active = 'true'
    }
  }

  moveAlltoright(){
    const rightTable = this.filterItemss;
    const leftTable =  this.getHost;
    let MoveTable = rightTable.concat(leftTable);
    this.filterItemss = this.removeTrue(MoveTable);
    this.filterExistingItems();
  }

  moveSelectedtoright(){
    const rightTable = this.filterItemss;
    const leftTable =  this.leftSelectedItem;
    let MoveTable = rightTable.concat(leftTable);
    this.filterItemss =  this.removeTrue(MoveTable);
    this.leftSelectedItem = [];
    this.filterExistingItems();
  }

  moveSelectedtoleft(){
    const rightTable =  this.rightSelectedItem;
    const leftTable =  this.getHost;
    let MoveTable = leftTable.concat(rightTable);
    this.getHost = this.removeTrue(MoveTable);
    console.log(MoveTable);
    this.filterrightItems(this.rightSelectedItem);
    this.rightSelectedItem = [];
  }

  moveAlltoleft(){
    const rightTable = this.filterItemss;
    const leftTable =  this.getHost;
    let MoveTable = rightTable.concat(leftTable);
    console.log(MoveTable);
    this.getHost = this.removeTrue(MoveTable);
    this.filterItemss = [];
    this.filterExistingItems();
  }

  removeTrue(array){
    array.forEach((element,index) => {
       element.active = '';
    });
    return array;
 }

  uploadfile(event) {
    let fileList: FileList = event.target.files;  
    if (fileList.length > 0) {  
    let file: File = fileList[0];  
    let formData: FormData = new FormData();  
    formData.append('file', file, file.name); 
    console.log(formData); 
    this._passdata.getReposForUpload(formData).subscribe(error => console.log(error))
    } 
    window.location.reload();  
    }

    submit(){
       if(this.CollectData.dealerConsent === ""  || this.CollectData.dealerConsent  === null){ this.CollectData.dealerConsent = this.passData.dealerConsent };
       if(this.CollectData.customerConsent === ""  || this.CollectData.customerConsent  === null){ this.CollectData.customerConsent = this.passData.customerConsent };
       if(this.CollectData.intUserConsent === ""  || this.CollectData.intUserConsent  === null){ this.CollectData.intUserConsent = this.passData.intUserConsent };
       if(this.CollectData.partCompConsent === ""  || this.CollectData.partCompConsent  === null){ this.CollectData.partCompConsent = this.passData.partCompConsent };
       if(this.CollectData.perUserAssentReq === ""  || this.CollectData.perUserAssentReq  === null){ this.CollectData.perUserAssentReq = this.passData.perUserAssentReq };
       if(this.CollectData.docTypeID === ""  || this.CollectData.docTypeID  === null){ this.CollectData.docTypeID = this.passData.docTypeID };
       if(this.CollectData.effectiveDate === ""  || this.CollectData.effectiveDate  === null){ this.CollectData.effectiveDate = this.passData.effectiveDate };
       if(this.CollectData.terminationDate === ""  || this.CollectData.terminationDate  === null){ this.CollectData.terminationDate = this.passData.terminationDate };
       if(this.CollectData.hostAppList === ""  || this.CollectData.hostAppList  === null){ this.CollectData.hostAppList = this.passData.hostAppList };
       this.CollectData.hostAppList = this.filterItemss;
       this.CollectData.documentID = this.passData.documentID;
       this.CollectData.docTypeName = this.passData.docTypeName;
       this.CollectData.status = this.passData.status;
       this.CollectData.submittedUser = this.passData.submittedUser;
       this.CollectData.documentURL = this.passData.documentURL;

       //Pass this.CollectData into the Service...

       if(this.filterItemss !== '' || this.filterItemss !== null){
          this._serveEdit.sendResponse(this.CollectData).subscribe(error => console.log(error));
       }
       console.log(this.CollectData);
    }

    goBack(){
       this.router.navigate(['/upload']);
    }
}
