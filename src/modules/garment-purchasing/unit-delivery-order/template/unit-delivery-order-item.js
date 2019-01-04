import { bindable, computedFrom } from 'aurelia-framework'
import { factories } from 'powerbi-client';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

var UomLoader = require('../../../../loader/uom-loader');

const resource = 'master/garmentProducts';
const POresource= 'garment-internal-purchase-orders';
export class UnitDeliveryOrderItem {

  fabricOptions = ['NON FABRIC', 'MAIN FABRIC', 'CONTRASS', 'INTERLINING', 'LINING', 'SPINING', 'PIPING', 'SLEEK', 'FRONTING', 'FELT', 'RIB'];
  async activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;

  }

  bind() {
    
  }

  get uomLoader() {
    return UomLoader;
  }

  uomView = (uom) => {
    return uom.Unit
  }

  get prNo() {
    return `${this.data.PRNo} - ${this.data.PO_SerialNumber} - ${this.data.Article}`;
  }

  get product() {
    return this.data.Product.Name;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}