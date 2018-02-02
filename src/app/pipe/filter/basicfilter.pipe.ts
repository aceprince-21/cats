import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'basicfilter',
   pure: false
})

export class BasicfilterPipe implements PipeTransform {
  //documentIds:selectedItems:uploaderCws:doucmentName:UploadedDate:selectedStatus

	transform(items: any, documentIds: string, selectedItems: string, uploaderCws: string, documentName: string, uploadedDate:number, selectedStatus:String ){
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
				
				if (documentName && item.documentName.toLowerCase().indexOf(documentName.toLowerCase()) === -1){
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
