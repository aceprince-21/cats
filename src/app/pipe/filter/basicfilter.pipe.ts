import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'basicfilter',
   pure: false
})

export class BasicfilterPipe implements PipeTransform {
  
  transform(value: any[], args?:any, type?:boolean ): any {
	   let keys = [];
       if(type === false){
		     value.forEach(item => {
				  args.forEach(arg =>{
					 if(arg.hostAppID === item.hostAppID){
						 keys.push(item);
					 }
				  }); 
			 });
			 return keys;
	   }
	   if(type === true){
		     let newValue = value;
		      newValue.forEach((item,index) => {
				  args.forEach(arg =>{
					 if(arg.hostAppID != item.hostAppID){
						newValue.splice(index,1);	
					 }
				  }); 
			 });
			 return newValue;
	   }
  }  
}
