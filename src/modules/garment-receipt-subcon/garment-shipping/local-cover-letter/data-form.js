import { inject, bindable } from "aurelia-framework";
import { Service, CoreService } from "./service";

var SalesNoteLoader = require("../../../../loader/garment-shipping-local-sales-note-loader");
var ShippingStaffLoader = require("../../../../loader/garment-shipping-staff-loader");

@inject(Service, CoreService)
export class DataForm {
  constructor(service, CoreService) {
    this.service = service;
    this.coreService = CoreService;
  }

  @bindable readOnly = false;
  @bindable isEdit = false;
  @bindable title;

  @bindable selectedSalesNote;

  controlOptions = {
    label: {
      length: 3,
    },
    control: {
      length: 5,
    },
  };

  filter = {
    IsApproveFinance: true,
  };

  get salesNoteLoader() {
    return SalesNoteLoader;
  }

  get shippingStaffLoader() {
    return ShippingStaffLoader;
  }

  buyerView = (data) => {
    return `${data.code} - ${data.name}`;
  };

  shippingStaffView = (data) => {
    return `${data.Name || data.name}`;
  };

  bind(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
  }

  get salesNoteLoader() {
    return (keyword) => {
      var info = {
        keyword: keyword,
        filter: JSON.stringify({}),
      };
      return this.service.getLocalSalesNoteTS(info).then((result) => {
        var noList = [];
        for (var a of result.data) {
          noList.push(a);
        }
        return noList;
      });
    };
  }

  selectedSalesNoteChanged(newValue) {
    if (newValue) {
      this.data.localSalesNoteId = newValue.id;
      this.data.noteNo = newValue.noteNo;

      this.data.buyer = newValue.buyer || {};
      if (this.data.buyer.id) {
        var info = {
          filter: JSON.stringify({
            Code: this.data.buyer.code,
          }),
        };
        this.coreService.getBuyerByCode(info).then((buyerResult) => {
          this.data.buyer.address = buyerResult.data[0].Address;
        });
      }
    } else {
      this.data.salesNoteId = 0;
      this.data.noteNo = null;
      this.data.buyer = null;
    }
  }
}
