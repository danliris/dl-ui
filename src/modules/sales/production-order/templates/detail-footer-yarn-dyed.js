import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

export class DetailFooter {
  activate(context) {
    this.context = context;
  }

  get itemSum() {
    var qty = this.context.items
      .map((item) => item.data.quantity);
    return qty
      .reduce((prev, curr, index) => { return prev + curr }, 0);
  }

  get uom() {
    // var uom=[];
    // if(this.context.items.length>0){
    //   if(this.context.items[0].data.uom.unit){
    //     uom = this.context.items
    //     .map((item) => item.data.uom.unit);
    //       return uom.unit
    //     .reduce((prev, curr, index) => { return curr });
    //   }
    //   else{
    //     var uom="MTR";
    //     return "MTR";
    //   }
    // }
    // else{
    //   return uom;
    // }

    var uom;
    if(this.context.items.length>0){
      if(this.context.items[0].data.uom.unit){
          return this.context.items[0].data.uom.unit;
      }
      else{
        uom="MTR";
        return uom;
      }
    }
    else{
      return uom;
    }
  }
}
