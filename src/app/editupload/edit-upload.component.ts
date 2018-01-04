import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EdituploadService } from './editupload.service';
import { UploadService } from '../upload/upload.service';
import { BasicfilterPipe } from '../pipe/filter/basicfilter.pipe';
import { DatepickerOptions } from 'ng2-datepicker';
import { uploadModel } from './exportmodel';
import { configs } from '../../environments/config'

@Component({
  selector: 'app-edit-upload',
  templateUrl: './edit-upload.component.html',
  styleUrls: ['./edit-upload.component.scss']
})
export class EditUploadComponent implements OnInit {
  constructor(private _passdata: UploadService, private _serveEdit: EdituploadService, private route: ActivatedRoute, private router: Router) { }
  private passData: any = [];
  private getHost: any = [];
  private getDocType: any = [];
  private id: any = [];
  private filterItem;
  private filterItemss: any = [];
  private hostapplist: any = [];
  private leftSelectedItem: any = [];
  private rightSelectedItem: any = [];
  private CollectData: any = [];
  private NewUploadData: any = [];
  private docSetting: boolean = false;
  private newEffectiveDate: any = null;
  private newTerminationDate: any = null;
  private fileName: any;
  private selfile: any;
  private fileSize: any;
  private CheckSize: boolean = false;
  private messageBox:boolean = false;

  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MM/DD/YYYY',
    barTitleFormat: 'MMMM YYYY',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
  };

  ngOnInit() {
    this.hostAppService();
    this.doctypeService();
    this.CollectData = uploadModel;

    this.route.params.subscribe((params: Params) => {
		/**files  / data**/
      this.filterItem = params;
      const get_path = this.router.url.split('/')[2];
	  console.log(get_path);
      if (get_path != 'upload') {
        this.uploadFetchService(0, this.filterItem.data);
        this.docSetting = true;
        this.SetUpformdata();
      }
      else {
        this.uploadFetchService(1, this.filterItem.data);
        this.CollectData = this.passData;
        this.newEffectiveDate = Date();
		this.newTerminationDate  = new Date();
		let newDate =  this.newEffectiveDate;
		newDate = parseInt(newDate.split(' ')[2]);
		this.newTerminationDate.setDate(newDate + 15);
      }
    });
  }

  SetUpformdata() {
    this.CollectData.uploadedDate = this.CurrentDate('-', 0);
    this.CollectData.effectiveDate = this.CurrentDate('-', 0);
    this.CollectData.terminationDate = this.CurrentDate('-', 2);
  }

  CurrentDate(sym, sel) {
    const Months = configs.Months;
    let getMontValue = 0;
    let date = Date();
    let month = date.split(' ')[1];
    let curentDate = parseInt(date.split(' ')[2]);
    let Year = date.split(' ')[3];
    month = month.toLowerCase();

    for (let i = 0; i < Months.length; i++) {
      if (Months[i] === month) {
        getMontValue = i + 1;
      }
    }
    return getMontValue + sym + (curentDate + sel) + sym + Year;
  }

  uploadFetchService(val, e) {
    this._serveEdit.EditPage(val, e).subscribe(
      data => {
        this.passData = data;
        this.filterItemss = data.hostAppList;
        this.filterExistingItems();
		
		/*Yet to Confirm this logic is required */
	    if(val === 1){
		
      	this.passData.dealerConsent = false;
		this.passData.customerConsent = false;
		this.passData.intUserConsent = false;
		this.passData.partCompConsent = false;
		this.passData.perUserAssentReq = false;
		
		this.CollectData.dealerConsent = true;
		this.CollectData.customerConsent = true;
		this.CollectData.intUserConsent = true;
		this.CollectData.partCompConsent = true;
		this.CollectData.perUserAssentReq = true;
	   }
	   
      })

  }

  doctypeService() {
    this._serveEdit.doctype().subscribe(
      data => {
        this.getDocType = data;
      })
  }


  hostAppService() {
    this._serveEdit.getHostapp().subscribe(
      data => {
        this.getHost = data;
      })
  }

  filterExistingItems() {
    let getHost = this.getHost;
    const applist = this.filterItemss;
    let keys = [];

    for (let i = 0; i < getHost.length; i++) {
      for (let j = 0; j < applist.length; j++) {
        if (getHost[i].hostAppID === applist[j].hostAppID) {
          getHost.splice(i, 1);
        }
      }
    }
    keys = getHost;
    const dataT = keys.filter((value, index, array) => {
      return array.indexOf(value) === index;
    });
    this.hostapplist = [];
    this.getHost = [];
    this.hostapplist = applist;
    this.getHost = dataT;
  }

  filterrightItems(x) {
    let getHost = x;
    const applist = this.filterItemss;
    let keyss = [];
    x.forEach((element) => {
      keyss = applist.filter(e => e !== element);
    });
    this.filterItemss = keyss;
    uploadModel.hostAppList = this.filterItemss;
  }

  leftSelectedArray(host, ind) {
    if (host.active === 'true') {
      host.active = '';
      console.log(host);
      const remIem = this.leftSelectedItem.filter(e => e !== host)
      this.leftSelectedItem = remIem;
      host.active = ''
    }
    else {
      this.leftSelectedItem.push(host);
      const newitem = this.leftSelectedItem.filter((value, index, array) => {
        return array.indexOf(value) === index;
      });
      this.leftSelectedItem = newitem;
      host.active = 'true'
    }
  }


  righttSelectedArray(host, ind) {
    if (host.active === 'true') {
      host.active = '';
      console.log(host);
      const remIem = this.rightSelectedItem.filter(e => e !== host)
      this.rightSelectedItem = remIem;
      host.active = ''
    }
    else {
      this.rightSelectedItem.push(host);

      const newitem = this.rightSelectedItem.filter((value, index, array) => {
        return array.indexOf(value) === index;
      });
      this.rightSelectedItem = newitem;
      host.active = 'true'
    }
  }

  moveAlltoright() {
    const rightTable = this.filterItemss;
    const leftTable = this.getHost;
    let MoveTable = rightTable.concat(leftTable);
    this.filterItemss = this.removeTrue(MoveTable);
    this.filterExistingItems();
  }

  moveSelectedtoright() {
    const rightTable = this.filterItemss;
    const leftTable = this.leftSelectedItem;
    let MoveTable = rightTable.concat(leftTable);
    this.filterItemss = this.removeTrue(MoveTable);
    this.leftSelectedItem = [];
    this.filterExistingItems();
  }

  moveSelectedtoleft() {
    const rightTable = this.rightSelectedItem;
    const leftTable = this.getHost;
    let MoveTable = leftTable.concat(rightTable);
    this.getHost = this.removeTrue(MoveTable);
    console.log(MoveTable);
    this.filterrightItems(this.rightSelectedItem);
    this.rightSelectedItem = [];
  }

  moveAlltoleft() {
    const rightTable = this.filterItemss;
    const leftTable = this.getHost;
    let MoveTable = rightTable.concat(leftTable);
    console.log(MoveTable);
    this.getHost = this.removeTrue(MoveTable);
    this.filterItemss = [];
    this.filterExistingItems();
  }

  removeTrue(array) {
    array.forEach((element, index) => {
      element.active = '';
    });
    return array;
  }


  editdata() {
		
    if (this.CollectData.dealerConsent === "") {
      this.CollectData.dealerConsent = this.passData.dealerConsent;
    }

    if (this.CollectData.customerConsent === "") {
      this.CollectData.customerConsent = this.passData.customerConsent;
    }

    if (this.CollectData.intUserConsent === ""){
      this.CollectData.intUserConsent = this.passData.intUserConsent;
    }

    if (this.CollectData.partCompConsent === "") {
      this.CollectData.partCompConsent = this.passData.partCompConsent;
    }

    if (this.CollectData.perUserAssentReq == "") {
      this.CollectData.perUserAssentReq = this.passData.perUserAssentReq;
    }

    if (this.filterItemss.length === 0) {
        this.NewUploadData.hostAppList === false;
    }else{
		 this.NewUploadData.hostAppList === true;
	}
	
    if (this.CollectData.effectiveDate == "") {
      this.CollectData.effectiveDate = this.passData.effectiveDate;
    }
	
	if (this.CollectData.terminationDate == "") {
      this.CollectData.terminationDate = this.passData.terminationDate;
    }
	
	if (this.CollectData.docTypeID == "") {
      this.CollectData.docTypeID = this.passData.docTypeID;
	  this.CollectData.docTypeName = this.passData.docTypeName;
    }
	
	
	
    this.CollectData.documentID = this.passData.documentID;
	this.CollectData.documentName =this.passData.documentName;
	this.CollectData.documentURL = this.passData.documentURL;
	this.CollectData.submittedUser = this.passData.submittedUser;

	
	if (this.filterItemss.length === 0) {
        this.NewUploadData.hostAppList === false;
    }else{
		
				let fileList = this.selfile;
				
				if (this.fileSize > 2899417) {
				  this.CheckSize = true;
				}
				else {
				  this.CheckSize = false;
				}

				if (this.fileSize < 2899417) {
				  let file = fileList;
				  console.log(fileList);
				  let formData: FormData = new FormData();
				  formData.append('file', file);
				  formData.append('Data', this.CollectData);
				  this._serveEdit.sendResponse(formData).subscribe(
					done => this.reuploadDocument(done),
					error =>  console.log(error))
				}
	}
}


uploadData(){
	
	if (!this.CollectData.docTypeID) {
      this.NewUploadData.docTypeID = false;
    }else{
		 this.NewUploadData.docTypeID = true;
	}
	
	if (!this.CollectData.dealerConsent) {
      this.NewUploadData.dealerConsent = false
    }else{
		this.NewUploadData.dealerConsent = true
	}

    if (!this.CollectData.customerConsent) {
      this.NewUploadData.customerConsent = false
    }else{
		this.NewUploadData.customerConsent = true;
	}

    if (!this.CollectData.intUserConsent){
      this.NewUploadData.intUserConsent = false
    }else{
	   this.NewUploadData.intUserConsent = true;
	}

    if (!this.CollectData.partCompConsent) {
      this.NewUploadData.partCompConsent = false
    }else{
	  this.NewUploadData.partCompConsent = true;
	}

    if (!this.CollectData.perUserAssentReq) {
      this.NewUploadData.perUserAssentReq = false
    }else{
	   this.NewUploadData.perUserAssentReq = true
	}

    if (this.filterItemss.length === 0) {
        this.NewUploadData.hostAppList = false;
		return;
    }else{
		 this.NewUploadData.hostAppList = true;
	}
	
     if (!this.CollectData.effectiveDate) {
      this.NewUploadData.effectiveDate = false
    }else{
		  this.NewUploadData.effectiveDate = true
	}
	
	if (!this.CollectData.terminationDate) {
      this.NewUploadData.terminationDate = false
    }else{
		  this.NewUploadData.terminationDate = true
	} 
	
	if(this.NewUploadData.docTypeID ===  this.NewUploadData.terminationDate === this.NewUploadData.effectiveDate === this.NewUploadData.hostAppList === this.NewUploadData.perUserAssentReq === this.NewUploadData.partCompConsent === this.NewUploadData.intUserConsent === this.NewUploadData.customerConsent === this.NewUploadData.dealerConsent === true){
		             this.messageBox = true;
		           //  this._serveEdit.getReposForUpload(formData).subscribe(
					// done => this.reuploadDocument(done),
					// error =>  console.log(error))
	}
}

  reuploadDocument(e){
  console.log(e.document_id);
          setTimeout(() => {
		 this.messageBox = false;
          this.router.navigate(['/mydocuments']);
          },2000);
  }
 
  goBack() {
    this.router.navigate(['/upload']);
  }

  DateValidation(x,y){
    console.log(x);
    let startData = x.split(" ");
    let endDate = y.split(" ");

    if(startData[2] <= endDate[2]){
       if(startData[1] <= endDate[1]){
          if(startData[0] < endDate[0]){
             return true;
          }
          else{
            return false;
          }
       }
    }
  }

  fileEvent(event) {
    let file = event.target.files[0];
    this.selfile = file;
    this.fileName = file.name;
    this.fileSize = file.size;

  }

  uploadfile() {
    if (this.fileSize > 2899417) {
      this.CheckSize = true;
    }
    else {
      this.CheckSize = false;
    }
  }
}
