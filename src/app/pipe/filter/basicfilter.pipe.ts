import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'basicfilter',
   pure: false
})

export class BasicfilterPipe implements PipeTransform {
  
  transform(value: any[], args?:any, type?:boolean ): any {
	   let keys = [];
       if(type === true){
		   return value;
	   }
	   if(type === false){
		   return args;
	   }
  }  
}
