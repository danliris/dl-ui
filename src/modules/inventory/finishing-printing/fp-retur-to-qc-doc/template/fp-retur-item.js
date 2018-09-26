import {bindable} from 'aurelia-framework'
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

var PackingLoader = require('../../../../../loader/packing-loader');
var ProductionLoader = require('../../../../../loader/production-order-loader');
const resource = 'inventory/products-by-production-orders';

export class FPReturToQCItem {
  @bindable selectedPacking;

  itemsColumns = [
    { header: "Barang", value: "productName" },
    { header: "Design", value: "designName" },
    { header: "Keterangan", value: "remark" },
    { header: "CW", value: "colorName" },
    { header: "Jumlah Stock", value: "quantityBefore" },
    { header: "Jumlah Retur", value: "returQuantity" },
    { header: "Satuan", value: "uom" },
    { header: "Panjang (Meter)", value: "length" },
    { header: "Berat (Kg)", value: "weight" }
  ]

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.isShowing = false;
    this.filter = this.context.context.options ? this.context.context.options : {};
    if (this.data) {
      this.selectedPacking = this.data;
      if (this.data.details) {
        this.isShowing = true;
      }
    }
  }

  //packingFilter=this.filter;

  get packingLoader() {
    return PackingLoader;
  }

  get productionLoader(){
    return ProductionLoader;
  }

  async selectedPackingChanged(newValue) {
    debugger
    var items=[];
    if(newValue){
        if (newValue.Id) {
          this.data.packing=newValue;
          this.data.code=newValue.Code;
          this.data.packingId=newValue.Id;
          this.data.packingCode=newValue.Code;
          this.data.productionOrderId=newValue.ProductionOrderId;
          this.data.productionOrderNo=newValue.ProductionOrderNo;

          var config = Container.instance.get(Config);
          var endpoint = config.getEndpoint("inventory-azure");
          
          await endpoint.find(resource, { filter: JSON.stringify(newValue.Id)})
            .then((result) => {
              debugger
              for(var item of result.info){
                if(item.inventory.length>0){
                  var data={
                    productName:item.name,
                    productId:item._id,
                    designNumber:item.properties.designNumber,
                    designCode:item.properties.designCode,
                    remark:'',
                    colorWay:item.properties.colorName,
                    quantityBefore:item.inventory[0].quantity,
                    returQuantity:0,
                    uomId:item.uomId,
                    uom:item.uom.unit ? item.uom.unit : item.uom,
                    length:0,
                    weight:0,
                    storageId:item.inventory[0].storageId
                  }
                  items.push(data);
                }
              }
              this.data.details=items;
            });
            this.isShowing = true;
        }
      }
  }

  toggle() {
    if (!this.isShowing)
      this.isShowing = true;
    else
      this.isShowing = !this.isShowing;
  }

  packingLoaderView = (packing) => {
    if(packing.Code && packing.ProductionOrderNo)
      return `${packing.Code} - ${packing.ProductionOrderNo}`;
     //return packing.productionOrderNo
  }

  productionLoaderView = (productionOrder) =>{
    if(productionOrder.OrderNo)
      return `${productionOrder.OrderNo}`;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}