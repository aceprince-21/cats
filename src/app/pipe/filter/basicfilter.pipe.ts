import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'basicfilter'
})

export class BasicfilterPipe implements PipeTransform {
  
  transform(value: any[], args?:any ): any {
    let getnewItem;

    let keys = [];
    if(value.length >0 && args.length > 0){
   
    }
   
    return keys;
}  
}
