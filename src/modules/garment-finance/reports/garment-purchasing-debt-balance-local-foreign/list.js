import { inject } from "aurelia-framework";
import moment from "moment";
import numeral from "numeral";
import XLSX from "xlsx";
import { Service } from "./service";
const SupplierLoader = require("../../../../loader/garment-supplier-loader");

@inject(Service)
export class List {
  itemYears = [];
  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  tableOptions = {
    showColumns: false,
    search: false,
    showToggle: false,
    sortable: false,
  };

  constructor(service) {
    this.service = service;
    this.info = {};
    this.error = {};
    this.data = [];
    this.isEmpty = true;
    this.currency = "";
    this.purchase = 0;
    this.payment = 0;
    this.closingBalance = 0;
    this.itemMonths = [
      { text: "January", value: 1 },
      { text: "February", value: 2 },
      { text: "March", value: 3 },
      { text: "April", value: 4 },
      { text: "May", value: 5 },
      { text: "June", value: 6 },
      { text: "July", value: 7 },
      { text: "August", value: 8 },
      { text: "September", value: 9 },
      { text: "October", value: 10 },
      { text: "November", value: 11 },
      { text: "Desember", value: 12 },
    ];
    this.currentYear = moment().format("YYYY");

    for (var i = parseInt(this.currentYear); i >= 2018; i--) {
      this.itemYears.push(i.toString());
    }
  }

  supplierView = (supplier) => {
    return supplier.code +" - "+ supplier.name;
  };

  async search() {
    this.payment = 0;
    this.purchase = 0;

    if (this.info.supplier && this.info.supplier.Id)
      this.info.id = this.info.supplier.Id;
      
    let validationError = false;

    
    if (this.info && (!this.info.supplier || this.info.supplier.Id == null)) {
      this.error.supplier = "Supplier harus diisi";
      validationError = true;
    }

    if (!validationError) {
      this.error = {};
      // this.flag = true;
      // this.tableList.refresh();

      let params = {
        supplierId : this.info.id,
        month: this.info.month.value,
        year: this.info.year,
        isForeignCurrency:true,
        supplierIsImport:false
      };

      this.data = await this.service.search(params).then((result) => {
        this.summaryData = result.data.GroupTotalCurrency;
        if (result.data.Data.length == 0) this.isEmpty = true;
        else this.isEmpty = false;

        var newDatas = [];
        let subTotalPurchase = 0;
        let subTotalPayment = 0;
        for (var item of result.data.Data) {
          // if (item.InvoiceDate && item.MutationPurchase && item.MutationPayment) {
          //   if (item.Mutation > 0) {
          //     subTotalPurchase += item.Mutation;
          //     this.purchase += item.Mutation;
          //   } else {
          //     subTotalPayment += item.Mutation;
          //     this.payment += item.Mutation;
          //   }

            var newData = {
              SupplierName: item.SupplierCode +" - "+ item.SupplierName,
              CurrencyCode: item.CurrencyCode,
              CurrencyInitialBalance: item.CurrencyInitialBalance ? numeral(item.CurrencyInitialBalance).format("0,000.00") : 0,
              CurrencyPurchaseAmount: item.CurrencyPurchaseAmount ? numeral(item.CurrencyPurchaseAmount).format("0,000.00"): 0,
              CurrencyPaymentAmount: item.CurrencyPaymentAmount? numeral(item.CurrencyPaymentAmount).format("0,000.00"): 0,
              CurrencyCurrentBalance: item.CurrencyCurrentBalance ? numeral(item.CurrencyCurrentBalance).format("0,000.00") : 0,                            
              
              InitialBalance: item.InitialBalance ? numeral(item.InitialBalance).format("0,000.00") : 0,
              PurchaseAmount: item.PurchaseAmount ? numeral(item.PurchaseAmount).format("0,000.00") : 0,
              PaymentAmount: item.PaymentAmount ? numeral(item.PaymentAmount).format("0,000.00") : 0,
              CurrentBalance: item.CurrentBalance ? numeral(item.CurrentBalance).format("0,000.00") : 0,                            
              

            };
          // } else if (!item.InvoiceDate && item.Mutation != null) {
          //   continue;
          //   var newData = {
          //     Date: null,
          //     InvoiceNo: item.InvoiceNo,
          //     DPP: "null",
          //     Purchase: numeral(subTotalPurchase).format("0,000.00"),
          //     Payment: numeral(subTotalPayment).format("0,000.00"),
          //     FinalBalance: numeral(this.purchase + this.payment).format(
          //       "0,000.00"
          //     ),
          //   };

          //   subTotalPurchase = 0;
          //   subTotalPayment = 0;
          // } else {
          //   var newData = {
          //     Previous: null,
          //     FinalBalance:
          //       item.FinalBalance != null
          //         ? numeral(item.FinalBalance).format("0,000.00")
          //         : null,
          //   };

            subTotalPurchase = 0;
            subTotalPayment = 0;
          // }

          if (item.Currency) this.currency = item.Currency;
          newDatas.push(newData);
        }
        this.closingBalance = numeral(result.finalBalance).format("0,000.00");
        this.payment = numeral(this.payment).format("0,000.00");
        this.purchase = numeral(this.purchase).format("0,000.00");
        // this.mutation = numeral(result.finalBalance).format('0,00');

        return newDatas;
      });
      //console.log(this.data);

      this.summaryData = result.data.GroupTotalCurrency.map(item=>{
        var sumDat = {
          CurrencyCode: numeral(dataSum.CurrencyCode).format("0,000.00"),
          TotalCurrencyInitialBalance: numeral(dataSum.TotalCurrencyInitialBalance).format("0,000.00"),
          TotalCurrencyPurchase: numeral(dataSum.TotalCurrencyPurchase).format("0,000.00"),
          TotalCurrencyPayment: numeral(dataSum.TotalCurrencyPayment).format("0,000.00"),
          TotalCurrencyCurrentBalance: numeral(dataSum.TotalCurrencyCurrentBalance).format("0,000.00"),
          TotalInitialBalance: numeral(dataSum.TotalInitialBalance).format("0,000.00"),
          TotalPurchase: numeral(dataSum.TotalPurchase).format("0,000.00"),
          TotalPayment: numeral(dataSum.TotalPayment).format("0,000.00"),
          TotalCurrentBalance: numeral(dataSum.TotalCurrentBalance).format("0,000.00")
        }
        return sumdat;
      });
    }
  }

  excel() {

    if (this.info.supplier && this.info.supplier.Id)
    this.info.id = this.info.supplier.Id;
    
  let validationError = false;

  
  if (this.info && (!this.info.supplier || this.info.supplier.Id == null)) {
    this.error.supplier = "Supplier harus diisi";
    validationError = true;
  }

    if (!validationError) {
      this.error = {};
      // this.flag = true;
      // this.tableList.refresh();

      let params = {
        supplierId : this.info.id,
        month: this.info.month.value,
        year: this.info.year,
        isForeignCurrency:true,
        supplierIsImport:false
      };

      console.log("params",params);
      console.log("info",this.info);
      this.service.getXls(params);
    }
    // this.getExcelData();
  }

  pdf() {

    if (this.info.supplier && this.info.supplier.Id)
      this.info.supplierId = this.info.supplier.Id;

    let validationError = false;

    if (this.info && (!this.info.supplier || this.info.supplier.Id == null)) {
      this.error.supplier = "Supplier harus diisi";
      validationError = true;
    }

    if (!validationError) {
      this.error = {};
      // this.flag = true;
      // this.tableList.refresh();

      let params = {
        supplierId: this.info.supplierId,
        month: this.info.month.value,
        year: this.info.year,
        isForeignCurrency:true,
        supplierIsImport:false
      };

      this.service.getPdf(params);
    }
    // this.getExcelData();
  }

  reset() {
    this.error = {};
    this.isEmpty = true;
    // this.flag = false;
    this.info.supplier = undefined;
    this.info.supplierName = "";
    this.currency = "";
    this.closingBalance = 0;
    this.purchase = 0;
    this.payment = 0;
    this.data = [];
    // this.tableList.refresh();
    this.info.year = moment().format("YYYY");
    this.info.month = { text: "January", value: 1 };
  }

  get supplierLoader() {
    return SupplierLoader;
  }
}

export class KeysValueConverter {
  toView(obj) {
    return Reflect.ownKeys(obj);
  }
}
