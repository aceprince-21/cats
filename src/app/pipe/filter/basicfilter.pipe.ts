import { Pipe, PipeTransform } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';

@Pipe({
  name: 'basicfilter'
})

export class BasicfilterPipe implements PipeTransform {
  
  transform(items:any[], args?:any[], types?:boolean) {
   
  }
}
