import {bindable} from 'aurelia-framework'

export class DeliveryOrder {
  activate(context) {
    this.data = context.data;
    this.options = context.options; 
    this.context = context;
  console.log(this.data);
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
  
  valueChange(dataDeliveryOrder){
      console.log(this.context);
      console.log(dataDeliveryOrder);
      var selectedData = dataDeliveryOrder.srcElement.checked || false;
      if(selectedData){
        this.context.context.options += this.data.price;
        console.log(this.context.context.options);
        console.log(this.context);
      }else{
        this.context.context.options -= this.data.price;
        console.log(this.context.context.options);
      }
  }
}