import {bindable} from 'aurelia-framework'
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";
var PurchaseOrderLoader = require('../../../../loader/purchase-order-unposted-loader');
const resource = 'master/products/byId';

export class PurchaseOrderItem {
  @bindable selectedPurchaseOrder;

  itemsColumns = [
    { header: "Barang", value: "product" },
    { header: "Jumlah", value: "defaultQuantity" },
    { header: "Satuan", value: "defaultUom" },
    { header: "Jumlah", value: "dealQuantity" },
    { header: "Satuan", value: "dealUom" },
    { header: "Konversi", value: "conversion" },
    { header: "Harga", value: "priceBeforeTax" },
    { header: "Include Ppn?", value: "useIncomeTax" },
    { header: "Keterangan", value: "remark" }
  ]

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.isUseIncomeTax = this.context.context.options.isUseIncomeTax || false;
    this.isShowing = false;
    if (this.data) {
      this.selectedPurchaseOrder = this.data;
      if (this.data.details) {
        console.log(this.data.details)
        this.data.items=this.data.details;
        this.isShowing = true;
      }
      if (this.data.items) {
        this.isShowing = true;
      }

    }
    this.filter={
      "UnitName":this.context.context.options.unitCode,
      "IsPosted":false
    };
  }

  get purchaseOrderLoader() {
    return PurchaseOrderLoader;
  }

  async selectedPurchaseOrderChanged(newValue) {
    if (newValue._id) {
      console.log(newValue);
      Object.assign(this.data, newValue);
      var productList = this.data.items.map((item) => { return item.product._id });
      productList = [].concat.apply([], productList);
      productList = productList.filter(function (elem, index, self) {
        return index == self.indexOf(elem);
      })
      var config = Container.instance.get(Config);
      var endpoint = config.getEndpoint("core");
      for(var a of this.data.items){
        a.defaultUom=a.product.uom;
        a.defaultQuantity=a.quantity;
      }
      await endpoint.find(resource, { productList: JSON.stringify(productList) })
        .then((result) => {
          for (var product of result.data) {
            var item = this.data.items.find((_item) => _item.product._id.toString() === product._id.toString())
            if (item) {
              item.product.price = product.price;
            }
          }
        });
      this.isShowing = true;
    }
    this.data.details=this.data.items;
  }

  toggle() {
    if (!this.isShowing)
      this.isShowing = true;
    else
      this.isShowing = !this.isShowing;
  }

  purchaseOrderView = (purchaseOrder) => {
    console.log(purchaseOrder)
    return purchaseOrder.prNo
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}