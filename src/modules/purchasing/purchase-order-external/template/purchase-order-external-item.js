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
      if (this.data.items) {
        this.isShowing = true;
      }
    }
  }

  get purchaseOrderLoader() {
    return PurchaseOrderLoader;
  }

  async selectedPurchaseOrderChanged(newValue) {
    if (newValue._id) {
      Object.assign(this.data, newValue);
      var productList = this.data.items.map((item) => { return item.product._id });
      productList = [].concat.apply([], productList);
      productList = productList.filter(function (elem, index, self) {
        return index == self.indexOf(elem);
      })
      var config = Container.instance.get(Config);
      var endpoint = config.getEndpoint("core");

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
  }

  toggle() {
    if (!this.isShowing)
      this.isShowing = true;
    else
      this.isShowing = !this.isShowing;
  }

  purchaseOrderView = (purchaseOrder) => {
    return purchaseOrder.purchaseRequest.no
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}