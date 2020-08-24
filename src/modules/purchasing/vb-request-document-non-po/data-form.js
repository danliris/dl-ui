import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
import moment from 'moment';

const CurrencyLoader = require('../../../loader/garment-currencies-by-date-loader')

@inject(Service)
export class DataForm {
  @bindable title;
  @bindable readOnly;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
  };

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  cards = [];

  constructor(service) {
    this.service = service;
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
    this.hasPosting = this.context.hasPosting;

    let tempCards = [];
    this.data.Items.forEach((item, index) => {
      tempCards.push(item);
      console.log(item.Unit.VBDocumentLayoutOrder % 5);
      if (item.Unit.VBDocumentLayoutOrder % 5 == 0) {
        console.log(tempCards);
        this.cards.push(tempCards);
        tempCards = [];
      }
    });

    if (tempCards.length > 0) {
      this.cards.push(tempCards)
    }

    console.log(this.cards);
  }

  // columns = [
  //     { header: "No. Akun", value: "COA" },
  //     { header: "Nama Akun", value: "COA.name" },
  //     { header: "Keterangan", value: "Remark" },
  //     { header: "Debit", value: "Debit" },
  //     { header: "Kredit", value: "Credit" }
  // ]

  // get addItems() {
  //     return (event) => {
  //         this.data.Items.push({})
  //     };
  // }

  get currencyLoader() {
    return CurrencyLoader;
  }
}
