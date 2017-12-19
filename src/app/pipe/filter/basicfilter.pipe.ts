import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'basicfilter'
})

export class BasicfilterPipe implements PipeTransform {
  transform(items: any[], filter): any {  
    console.log(filter.documentID);
    if (!items || !filter) {  
        return items;  
    }  
    return items.filter(item => item.documentID.indexOf(filter.documentID) !== -1);  
}  
}
