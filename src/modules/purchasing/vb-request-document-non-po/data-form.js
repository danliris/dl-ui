import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
import moment from 'moment';

const CurrencyLoader = require('../../../loader/garment-currencies-by-date-loader')
const UnitVBNonPO = require('../../../loader/unit-vb-non-po-loader')
const UnitLoader = require('../../../loader/unit-loader');

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

  controlOptionsLabel = {
    label: {
      length: 8
    },
    control: {
      length: 3
    }
  }

  controlOptionsDetail = {
    control: {
      length: 10
    }
  }

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

    if (this.data.Currency) {
      this.data.Currency.code = this.data.Currency.Code;
    }
    let tempCards = [];
    this.data.Items.forEach((item, index) => {
      tempCards.push(item);
      // console.log(item.Unit.VBDocumentLayoutOrder % 5);
      if (item.Unit.VBDocumentLayoutOrder % 5 == 0) {
        // console.log(tempCards);
        this.cards.push(tempCards);
        tempCards = [];
      }
    });

    if (tempCards.length > 0) {
      this.cards.push(tempCards)
    }

    console.log(this.cards);
  }

  get currencyLoader() {
    return CurrencyLoader;
  }

  unitQuery = { VBDocumentLayoutOrder: 0 }
  get unitVBNonPOLoader() {
    return UnitVBNonPO;
  }

  otherUnitSelected(event, data) {
    data.VBDocumentLayoutOrder = 10;
  }

  @bindable selectedUnit;
  selectedUnitChanged(newValue, oldValue) {
    if (this.selectedUnit && this.selectedUnit.Id) {
      this.data.unit = {};
      this.data.unit.id = this.selectedUnit.Id;
      this.data.unit.name = this.selectedUnit.Name;
      this.data.unit.code = this.selectedUnit.Code;

      if (this.selectedUnit.Division) {
        this.data.division = {};
        this.data.division.id = this.selectedUnit.Division.Id;
        this.data.division.name = this.selectedUnit.Division.Name;
      }
      else {
        this.data.division = {};
        this.data.division.id = this.data.Division.Id;
        this.data.division.name = this.data.Division.Name;
      }

    }
    else {
      this.data.unit.id = this.selectedUnit.id;
      this.data.unit.name = this.selectedUnit.name;
      this.data.unit.code = this.selectedUnit.code;
      this.data.unit.Division.Id = this.selectedUnit.divisionname;
      this.data.unit.Division.Name = this.selectedUnit.divisionid;
    }
  }

  unitView = (unit) => {
    return `${unit.Code} - ${unit.Name}`

  }

  get unitLoader() {
    return UnitLoader;
  }
}
