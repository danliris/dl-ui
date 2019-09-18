import {
  inject,
  bindable,
  BindingEngine
} from "aurelia-framework";
import {
  Router
} from "aurelia-router";
import {
  Service
} from "./service";
import moment from 'moment';
var OrderLoader = require("../../../loader/weaving-order-loader");
var MaterialLoader = require("../../../loader/weaving-material-type-loader");
var Operator = require("../../../loader/weaving-operator-loader");

@inject(Service, Router, BindingEngine)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable OrderDocument;
  @bindable FabricConstructionDocument;
  @bindable WeavingUnitDocument;
  @bindable MaterialType;
  @bindable AmountOfCones;
  @bindable ColourOfCone;
  @bindable OperatorDocument;
  @bindable WarpingPreparationDate;
  @bindable WarpingPreparationTime;
  @bindable Shift;

  constructor(service, router, bindingEngine) {
    this.service = service;
    this.router = router;
    this.bindingEngine = bindingEngine;
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
  }

  formOptions = {
    cancelText: 'Kembali',
    saveText: 'Simpan',
  };

  // Loaders
  get orders() {
    return OrderLoader;
  }

  get materialTypes() {
    return MaterialLoader;
  }

  get operators() {
    return Operator;
  }

  // Bindable Method
  OrderDocumentChanged(newValue) {
    if (newValue) {
      this.OrderDocument = newValue;
      this.data.OrderDocumentId = newValue.Id;
    }

    if (newValue.ConstructionId) {
      this.service.getConstructionNumberById(newValue.ConstructionId)
        .then(resultConstructionNumber => {
          if (resultConstructionNumber) {
            this.error.FabricConstructionDocument = "";
            this.FabricConstructionDocument = resultConstructionNumber;
          }
        })
        .catch(e => {
          this.FabricConstructionDocument = "";
          this.error.FabricConstructionDocument = " Nomor Konstruksi Tidak Ditemukan ";
        });
    }

    if (newValue.WeavingUnit) {
      this.service.getUnitById(newValue.WeavingUnit)
        .then(resultWeavingUnit => {
          if (resultWeavingUnit) {
            this.error.WeavingUnitDocument = "";
            this.WeavingUnitDocument = resultWeavingUnit.Name;
          }
        })
        .catch(e => {
          this.WeavingUnitDocument = "";
          this.error.WeavingUnitDocument = " Unit Weaving Tidak Ditemukan ";
        });
    }
  }

  MaterialTypeChanged(newValue) {
    this.data.MaterialTypeId = newValue.Id;
  }

  AmountOfConesChanged(newValue) {
    this.data.AmountOfCones = newValue;
  }

  ColourOfConeChanged(newValue) {
    this.data.ColourOfCone = newValue;
  }

  OperatorDocumentChanged(newValue) {
    this.data.OperatorDocumentId = newValue.Id;
  }

  WarpingPreparationDateChanged(newValue) {
    this.data.WarpingPreparationDate = newValue;
  }

  WarpingPreparationTimeChanged(newValue) {
    this.data.WarpingPreparationTime = newValue;
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.Shift = "";
        this.Shift = {};
        this.Shift = result;
        this.data.ShiftDocumentId = this.Shift.Id;
      })
      .catch(e => {
        this.Shift = {};
        this.data.ShiftDocumentId = this.Shift.Id;
        this.error.Shift = " Shift tidak ditemukan ";
      });
  }
}
