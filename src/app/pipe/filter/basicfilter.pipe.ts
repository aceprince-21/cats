import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'basicfilter',
   pure: false
})

export class BasicfilterPipe implements PipeTransform {
  //documentIds:selectedItems:uploaderCws:doucmentName:UploadedDate:selectedStatus

	transform(items: any, documentIds: string, selectedItems: string, uploaderCws: string, doucmentName: string, UploadedDate: string, selectedStatus:String ){
        if (items && items.length){
            return items.filter(item =>{
                if (documentIds && item.documentID.toLowerCase().indexOf(documentIds.toLowerCase()) === -1){
                    return false;
                }
                if (selectedItems && item.docTypeName.toLowerCase().indexOf(selectedItems.toLowerCase()) === -1){
                    return false;
                }
                if (uploaderCws && item.submittedUser.toLowerCase().indexOf(uploaderCws.toLowerCase()) === -1){
                    return false;
				}
				
				if (doucmentName && item.company.toLowerCase().indexOf(doucmentName.toLowerCase()) === -1){
                    return false;
				}
				
				if (selectedStatus && item.status.toLowerCase().indexOf(selectedStatus.toLowerCase()) === -1){
                    return false;
				}
                return true;
           })
        }
        else{
            return items;
        }
    }
}
