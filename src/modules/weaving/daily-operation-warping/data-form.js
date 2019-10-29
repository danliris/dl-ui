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
  @bindable PreparationOrder;
  @bindable PreparationFabricConstruction;
  @bindable PreparationWeavingUnit;
  @bindable PreparationMaterialType;
  @bindable AmountOfCones;
  @bindable ColourOfCone;
  @bindable PreparationOperator;
  @bindable PreparationDate;
  @bindable PreparationTime;
  @bindable PreparationShift;

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
  PreparationOrderChanged(newValue) {
    if (newValue) {
      this.PreparationOrder = newValue;
      this.data.PreparationOrder = newValue.Id;
    }

    if (newValue.ConstructionId) {
      this.service.getConstructionNumberById(newValue.ConstructionId)
        .then(resultConstructionNumber => {
          if (resultConstructionNumber) {
            this.error.PreparationFabricConstruction = "";
            this.PreparationFabricConstruction = resultConstructionNumber;
          }
        })
        .catch(e => {
          this.PreparationFabricConstruction = "";
          this.error.PreparationFabricConstruction = " Nomor Konstruksi Tidak Ditemukan ";
        });
    }

    if (newValue.WeavingUnit) {
      this.service.getUnitById(newValue.WeavingUnit)
        .then(resultWeavingUnit => {
          if (resultWeavingUnit) {
            this.error.PreparationWeavingUnit = "";
            this.PreparationWeavingUnit = resultWeavingUnit.Name;
          }
        })
        .catch(e => {
          this.PreparationWeavingUnit = "";
          this.error.PreparationWeavingUnit = " Unit Weaving Tidak Ditemukan ";
        });
    }
  }

  PreparationMaterialTypeChanged(newValue) {
    this.data.PreparationMaterialType = newValue.Id;
  }

  AmountOfConesChanged(newValue) {
    this.data.AmountOfCones = newValue;
  }

  ColourOfConeChanged(newValue) {
    this.data.ColourOfCone = newValue;
  }

  PreparationOperatorChanged(newValue) {
    this.data.PreparationOperator = newValue.Id;
  }

  PreparationDateChanged(newValue) {
    this.data.PreparationDate = newValue;
  }

  PreparationTimeChanged(newValue) {
    this.data.PreparationTime = newValue;
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.PreparationShift = "";
        this.PreparationShift = {};
        this.PreparationShift = result;
        this.data.PreparationShift = this.PreparationShift.Id;
      })
      .catch(e => {
        this.PreparationShift = {};
        this.error.PreparationShift = " Shift tidak ditemukan ";
      });
  }
}
