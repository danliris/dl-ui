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
var FabricConstruction = require("../../../loader/weaving-constructions-loader");

@inject(Service, Router, BindingEngine)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable OrderDocument;
  @bindable MaterialType;
  @bindable OperatorDocument;
  @bindable PreparationTime;

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

  PreparationTimeChanged(newValue) {
    this.data.TimeOperation = newValue;
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.Shift = "";
        this.Shift = {};
        this.Shift = result;
        this.data.ShiftId = this.Shift.Id;
      })
      .catch(e => {
        this.Shift = {};
        this.data.ShiftId = this.Shift.Id;
        this.error.Shift = " Shift tidak ditemukan ";
      });
  }
}
