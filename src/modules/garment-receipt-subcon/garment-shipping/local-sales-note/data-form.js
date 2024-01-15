import {
  inject,
  bindable,
  containerless,
  computedFrom,
  BindingEngine,
} from "aurelia-framework";
import { Service, CoreService } from "./service";

const SalesContractLoader = require("../../../../loader/garment-sales-contracts-loader");
import AccountBankLoader from "../../../../loader/account-banks-loader";

@inject(Service, CoreService)
export class DataForm {
  @bindable readOnly = false;
  @bindable isEdit = false;
  @bindable title;
  @bindable selectedAccountBank;
  @bindable selectedTransactionType;
  @bindable selectedSalesContract;
  @bindable selectedPaymentType;
  @bindable selectedVatTax;
  @bindable options = { useVat: false };

  constructor(service, coreService) {
    this.service = service;
    this.coreService = coreService;
  }

  controlOptions = {
    label: {
      length: 3,
    },
    control: {
      length: 5,
    },
  };

  bankFilter = {
    DivisionName: "G",
  };

  filterSC = {
    // "Items.Any(RemainingQuantity>0)":true
  };

  paymentTypeOptions = ["TUNAI", "TEMPO"];

  items = {
    columns: [
      "No Invoice",
      "Quantity",
      "Satuan",
      "Jumlah Kemasan ",
      "Satuan Kemasan",
      "Harga",
      "Total",
      // "Keterangan"
    ],
    onAdd: function () {
      this.data.items.push({});
    }.bind(this),
    onRemove: function () {
      return (event) => {
        this.error = null;
      };
    }.bind(this),
    // options: {
    //   transactionTypeId: 0,
    // },
  };

  get salesContractLoader() {
    return SalesContractLoader;
  }

  buyerView = (data) => {
    return `${data.Code || data.code} - ${data.Name || data.name}`;
  };

  async bind(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.isCreate = this.context.isCreate;
    // if (this.data && this.data.transactionType) {
    //   this.items.options.transactionTypeId = this.data.transactionType.id;
    // }

    if (this.data.id) {
      if (this.data.bank.id) {
        this.coreService
          .getBankAccountById(this.data.bank.id)
          .then((result) => {
            this.selectedAccountBank = {
              Id: this.data.bank.id,
              BankName: result.BankName,
              AccountNumber: result.AccountNumber,
              Currency: {
                Code: result.Currency.Code,
              },
            };
            this.data.bank = result.BankName;
          });
      }

      this.selectedSalesContract = {
        salesContractNo: this.data.salesContractNo,
      };
      if (this.data.paymentType) {
        this.selectedPaymentType = this.data.paymentType;
      }
    }

    this.selectedVatTax = this.data.vat || false;

    if (this.data.useVat) {
      this.options.useVat = true;
    }

    console.log("data2", this.data);
  }

  get dueDate() {
    if (!this.data.date) {
      return null;
    }

    this.data.dueDate = new Date(this.data.date || new Date());
    this.data.dueDate.setDate(this.data.dueDate.getDate() + this.data.tempo);

    return this.data.dueDate;
  }

  selectedSalesContractChanged(newValue, oldValue) {
    if (newValue && this.isCreate) {
      this.data.salesContractId = newValue.Id;
      this.data.salesContractNo = newValue.SalesContractNo;

      this.data.buyer = {};
      this.data.buyer.Id = newValue.BuyerBrandId;
      this.data.buyer.Code = newValue.BuyerBrandCode;
      this.data.buyer.Name = newValue.BuyerBrandName;
    }
  }

  selectedPaymentTypeChanged(newValue) {
    this.data.paymentType = newValue;
    if (this.data.paymentType == "TUNAI") {
      this.data.tempo = 0;
    }
  }

  selectedVatTaxChanged(newValue) {
    var _selectedVatTax = newValue;
    if (_selectedVatTax) {
      this.data.vat = {
        id: _selectedVatTax.Id || _selectedVatTax.id,
        rate: _selectedVatTax.Rate || _selectedVatTax.rate,
      };
    } else {
      this.data.vat = {};
    }
  }

  selectedAccountBankChanged(newValue, oldValue) {
    if (newValue) {
      this.data.bank = newValue;
    }
  }

  get subtotal() {
    this.data.subTotal = (this.data.items || []).reduce(
      (acc, cum) => acc + cum.amount,
      0
    );

    return this.data.subTotal;
  }

  @computedFrom("data.vat.rate", "data.subTotal")
  get ppn() {
    var ppn = 0;
    if (this.data.subTotal && this.data.useVat) {
      ppn = this.data.subTotal * (this.data.vat.rate / 100);
    }

    return ppn;
  }

  @computedFrom("data.vat.rate", "data.subTotal")
  get total() {
    var total = 0;
    if (this.data.subTotal) {
      if (this.data.useVat)
        total =
          this.data.subTotal * (this.data.vat.rate / 100) + this.data.subTotal;
      else total = this.data.subTotal;
    }
    return total;
  }

  get accountBankLoader() {
    return AccountBankLoader;
  }

  accountBankView = (acc) => {
    return `${acc.BankName} - ${acc.Currency.Code}`;
  };
}
