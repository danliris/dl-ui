import {bindable} from 'aurelia-framework'
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

var PackingLoader = require('../../../../../loader/packing-loader');
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

  async selectedPackingChanged(newValue) {
    var items=[];
    if(newValue){
        if (newValue._id) {
          this.data.packing=newValue;
          this.data.code=newValue.code;
          this.data.packingId=newValue._id;
          this.data.packingCode=newValue.code;
          this.data.productionOrderId=newValue.productionOrderId;
          this.data.productionOrderNo=newValue.productionOrderNo;

          var config = Container.instance.get(Config);
          var endpoint = config.getEndpoint("inventory");

          await endpoint.find(resource, { filter: JSON.stringify(newValue.productionOrderId)})
            .then((result) => {
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
    if(packing.code!="" && packing.productionOrderNo!="")
      return `${packing.code} - ${packing.productionOrderNo}`;
     //return packing.productionOrderNo
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}