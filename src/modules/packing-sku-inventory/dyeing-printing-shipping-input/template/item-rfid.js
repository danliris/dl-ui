import { inject, bindable, computedFrom } from 'aurelia-framework'


export class ProductionOrderItem {

    rfidItems = [];
    activate(context) {
        this.context = context;
        this.data = context.data;
        //console.log(this.data);
      
        this.error = context.error;
        this.isShowing = false;
        //this.items = this.context.context.items;
        // console.log(this.error);
        this.options = context.options;
        this.contextOptions = context.context.options;
        this.isEdit = this.contextOptions.isEdit;
       
        this.listOptions = {
          isEdit: this.isEdit,
          destinationArea: this.destinationArea
        };
      
      }
    
      controlOptions = {
        control: {
          length: 12
        }
      };



}