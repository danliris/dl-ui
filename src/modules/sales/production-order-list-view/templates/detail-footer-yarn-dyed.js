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
    var uom=[];
    if(this.context.items.length>0){
      uom = this.context.items
      .map((item) => item.data.uom.unit);
        return uom
      .reduce((prev, curr, index) => { return curr });
      }
      else{
        return uom;
      }
    
  }
}
