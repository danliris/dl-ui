import {
  bindable,
  inject,
  containerless,
  computedFrom,
  BindingEngine,
} from "aurelia-framework";
import { BindingSignaler } from "aurelia-templating-resources";
import { Service, GarmentService } from "./service";
import moment from "moment";
var SupplierLoader = require("../../../loader/garment-supplier-loader");
var CurrencyLoader = require("../../../loader/garment-currencies-by-date-loader");
var CustomsLoader = require("../../../loader/garment-customs-by-no-loader");
const ContractLoader = require("../../../loader/garment-subcon-contract-loader");

@containerless()
@inject(Service, BindingSignaler, BindingEngine, GarmentService)
export class DataForm {
  @bindable readOnly = false;
  @bindable readOnlyBCDL = true;
  @bindable readOnlyNoBCDL = false;
  @bindable options = { readOnly: false };
  @bindable hasView = false;
  @bindable data = {};
  @bindable title;
  @bindable amount;
  @bindable item;
  @bindable beacukai;
  @bindable selectedCustomType;
  @bindable selectedContract;
  @bindable selectedContract;
  @bindable DueDate;
  typeCustoms = ["", "BC 262", "BC 23", "BC 40", "BC 27"];
  importValueBC23 = [
    "EXW",
    "FCA",
    "FAS",
    "FOB",
    "CFR",
    "CIF",
    "CPT",
    "CIP",
    "DPU",
    "DAP",
    "DDP",
  ];

  constructor(service, bindingSignaler, bindingEngine, garmentService) {
    this.service = service;
    this.signaler = bindingSignaler;
    this.bindingEngine = bindingEngine;
    this.garmentService = garmentService;
  }
  @computedFrom("data.Id")
  get isEdit() {
    return false;
  }
  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 5,
    },
  };

  get dataAmount() {
    this.amount = this.amount || 0;
    return this.amount;
  }
  async beacukaiChanged(newValue, oldValue) {
    var selectedBeacukai = newValue;

    if (selectedBeacukai) {
      if (selectedBeacukai.BCId) {
        this.data.beacukaiNo = selectedBeacukai.BCNo;
        this.data.beacukaiDate = selectedBeacukai.TglBCNo;
        this.data.customType = selectedBeacukai.JenisBC;
        this.selectedCustomType = selectedBeacukai.JenisBC;
        this.data.billNo = selectedBeacukai.BCId;
        this.data.arrivalDate = selectedBeacukai.Hari;
        this.data.netto = selectedBeacukai.Netto;
        this.data.bruto = selectedBeacukai.Bruto;
        this.context.beacukaiAU.editorValue = "";
      } else {
        this.data.beacukaiDate = null;
        this.data.beacukaiNo = null;
        this.data.customType = null;
        this.selectedCustomType = null;
        this.data.billNo = "";
        this.data.arrivalDate = null;
        this.data.netto = 0;
        this.data.bruto = 0;
        this.DueDate = null;
      }
      //     if (oldValue) {
      //         this.data.beacukaiDate = null;
      //         this.data.beacukaiNo = null;
      //         this.data.customType=null;
      //         this.data.billNo="";
      //     }
      // } else {
      //     this.data.beacukaiDate = null;
      //     this.data.beacukaiNo = null;
      //     this.data.customType=null;
      //     this.data.billNo="";
    }
  }
  isBCDLChanged(e) {
    var selectedisBCDL = e.srcElement.checked || false;

    if (selectedisBCDL == true) {
      this.beacukai = {};
      this.readOnlyBCDL = false;
      this.readOnlyNoBCDL = true;
      this.data.beacukaiDate = undefined;
      this.data.beacukaiNo = undefined;
      this.data.customType = undefined;
      this.selectedCustomType = undefined;
      this.data.arrivalDate = undefined;
    } else {
      this.beacukai = {};
      this.readOnlyBCDL = true;
      this.readOnlyNoBCDL = false;
      this.data.beacukaiDate = undefined;
      this.data.beacukaiNo = undefined;
      this.data.customType = undefined;
      this.selectedCustomType = undefined;
      this.data.arrivalDate = undefined;
    }
  }
  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.selectedCustomType = this.context.data.customType;
    this.selectedContract = this.data.SubconContractNo;
    this.error = this.context.error;
    this.hasView = this.context.hasView ? this.context.hasView : false;
    this.deliveryOrderColumns = this.hasView
      ? [
          { header: "No Surat Jalan", value: "no" },
          { header: "Tanggal Surat Jalan", value: "supplierDate" },
          { header: "Tanggal Datang Barang", value: "date" },
          { header: "Total Jumlah", value: "quantity" },
          { header: "Total Harga", value: "price" },
        ]
      : [
          { header: "", value: "selected" },
          { header: "No Surat Jalan", value: "no" },
          { header: "Tanggal Surat Jalan", value: "supplierDate" },
          { header: "Tanggal Datang Barang", value: "date" },
          { header: "Total Jumlah", value: "quantity" },
          { header: "Total Harga", value: "price" },
        ];

    if (this.data.Id) {
      var a;
      for (var i of this.data.deliveryOrders) {
        a = i.isView;
        break;
      }

      if (a === true) {
        this.options.hasView = true;
      } else {
        this.options.hasView = false;
      }
      if (this.data.billNo.includes("BP")) {
        this.data.isBCDL = false;
        this.readOnlyBCDL = true;
      } else {
        this.showCustoms = false;
        this.readOnlyBCDL = false;
        this.data.isBCDL = true;
      }
    } else {
      this.options.hasView = true;
      this.showCustoms = true;
    }

    this.today = moment(new Date()).format("YYYY-MM-DD");
  }
  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || "").toString() != "";
  }
  deliveryOrderColumns = [];

  get supplierLoader() {
    return SupplierLoader;
  }

  get currencyLoader() {
    return CurrencyLoader;
  }
  get customsLoader() {
    return CustomsLoader;
  }

  get isSupplier() {
    return this.data && this.data.supplierId && this.data.supplierId !== "";
  }

  valueChange(e) {}
  customsView = (customs) => {
    if (customs.BCNo)
      //    return `${customs.BCNo} - ${customs.JenisBC}- ${customs.TglBCNo.toString()}`;
      return `${customs.BCNo} - ${customs.JenisBC}- ${moment(
        customs.TglBCNo
      ).format("YYYY-MM-DD")}`;
  };
  currencyView = (currency) => {
    if (this.data.Id) {
      return currency.Code;
    } else {
      return currency.code;
    }
  };
  supplierView = (supplier) => {
    if (this.data.Id) {
      return `${supplier.Code} - ${supplier.Name}`;
    } else {
      return `${supplier.code} - ${supplier.name}`;
    }
  };

  supplierChange(e) {
    if (this.data.supplier && this.data.supplier._id) {
      this.data.supplierId = this.data.supplier._id;
    } else {
      delete this.data.supplierId;
    }
    this.data.deliveryOrders = [];
    this.data.deliveryOrderNonPO = [];
    delete this.data.currencyId;
    this.data.currency = {};
  }

  async currencyChange(e) {
    this.data.deliveryOrders = [];
    this.data.deliveryOrderNonPO = [];


    if (this.data.currency && this.data.currency.Id) {
      this.data.currencyId = this.data.currency.Id;
      if (!this.hasView) {
        var result = await this.service.searchDeliveryOrder({
          supplier: `${this.data.supplier.Id}`,
          currency: `${this.data.currency.code}`,
          billNo: this.data.billNo,
        });
        var dataDelivery = [];

        for (var a of result.data) {
          var data = a;
          data["selected"] = false;
          data["doNo"] = a.doNo;
          data["doId"] = a.Id;
          data["doDate"] = a.doDate;
          data["arrivalDate"] = a.arrivalDate;
          data["isView"] = !this.hasView ? true : false;
          data["IsPO"] = true;
          var quantity = 0;
          var totPrice = 0;
          for (var b of a.items) {
            for (var c of b.fulfillments) {
              quantity += c.doQuantity;
              var priceTemp = c.doQuantity * c.pricePerDealUnit;
              totPrice += priceTemp;
            }
          }
          data["quantity"] = quantity;
          data["price"] = totPrice.toFixed(3);
          dataDelivery.push(data);
        }
        this.data.deliveryOrders = dataDelivery;

        if (this.data.customType == "BC 262") {
          var result = await this.service.searchDeliveryOrderNonPO({
            supplier: `${this.data.supplier.Id}`,
            currency: `${this.data.currency.code}`,
            billNo: this.data.billNo,
          });

          var dataDeliveryNonPO = [];

          for (var a of result.data) {
            var data = a;
            data["selected"] = false;
            data["doNo"] = a.doNo;
            data["doId"] = a.Id;
            data["doDate"] = a.doDate;
            data["arrivalDate"] = a.arrivalDate;
            data["isView"] = !this.hasView ? true : false;
            data["IsPO"] = false;
            var quantity = 0;
            var totPrice = 0;
            for (var b of a.items) {
                quantity += b.Quantity;
                var priceTemp = b.Quantity * b.PricePerDealUnit;
                totPrice += priceTemp;
            }
            data["quantity"] = quantity;
            data["price"] = totPrice.toFixed(3);
            dataDeliveryNonPO.push(data);
          }
          this.data.deliveryOrderNonPO = dataDeliveryNonPO;
        }
      }
    } else {
      delete this.data.currencyId;
    }
  }
  selectedCustomTypeChanged(o, n) {
    // console.log(n);
    // console.log(o);
    this.data.customType = o;
    if (o == "BC 23") this.data.IsBC23 = true;
    else this.data.IsBC23 = false;
    this.data.importValue = null;
  }

  contractView = (contract) => {
    return `${contract.ContractNo}`;
  };

  get contractLoader() {
    return ContractLoader;
  }

  get contractFilter() {
    if (this.data.supplier) {
      var filter = {
        IsUsed: true,
        SupplierCode: this.data.supplier.code,
        IsCustoms:true,
      };

      filter[
        `DueDate >= ${JSON.stringify(
          moment(new Date()).subtract(17, "h").format("YYYY-MM-DD")
        )} `
      ] = true;
      return filter;
    }
  }

  get warningDueDate() {
    var selisih = "";
    if (this.DueDate) {
      var dueDatee = moment(this.DueDate);
      dueDatee.add(7, "h");

      selisih = dueDatee.diff(this.today, "days").toString();
      if (selisih === "0") {
        selisih = "Hari Ini";
      } else {
        selisih = selisih + " Hari";
      }
    }
    return selisih;
  }

  async selectedContractChanged(newValue) {
    if (newValue && !this.hasView) {
      this.data.SubconContractId = newValue.Id;
      this.data.SubconContractNo = newValue.ContractNo;
      this.data.FinishedGoodType = newValue.FinishedGoodType;
      this.DueDate = newValue.DueDate;

      //GetQuantityFromCustomsIn with same Contract ID
      const dataCusIN = await this.service.search({
        filter: JSON.stringify({ SubconContractId: newValue.Id }),
      });
      var QtyCustomIn = 0;

      dataCusIN.data.forEach((datas) => {
        datas.items.forEach((item) => {
          QtyCustomIn += item.quantity;
        })
       
      });

      console.log("QtyCustomIn",QtyCustomIn);

      //GetQuantityFromCustomsOutSubcok with same Contract ID
      const dataCusOUT = await this.garmentService.searchCustomsComplete({
        filter: JSON.stringify({ SubconContractId: newValue.Id }),
      });
      const dataJumlahCustomsOut = dataCusOUT.data.map((x) => {
        return x.Items.reduce((acc, cur) => (acc += cur.Quantity), 0);
      });

      console.log("dataJumlahCustomsOut",dataJumlahCustomsOut);

      const QtyCustomOut = dataJumlahCustomsOut.reduce(
        (acc, cur) => (acc += cur),
        0
      );
console.log("QtyCustomOut",QtyCustomOut)

      this.data.QuantityContract = QtyCustomOut - QtyCustomIn;
    }
  }
}
