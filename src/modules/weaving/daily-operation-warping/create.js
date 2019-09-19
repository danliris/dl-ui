import {
  inject,
  Lazy
} from "aurelia-framework";
import {
  Router
} from "aurelia-router";
import {
  Service
} from "./service";
import moment from 'moment';
@inject(Router, Service)
export class Create {

  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.error = {};
  }

  list() {
    this.router.navigateToRoute("list");
  }

  cancelCallback(event) {
    this.list();
  }

  saveCallback(event) {
    // var PreparationOrderContainer;
    // var PreparationMaterialTypeContainer;
    // var AmountOfConesContainer;
    // var ColourOfConeContainer;
    // var PreparationOperatorContainer;
    // var PreparationDateContainer;
    // var PreparationTimeContainer;
    // var ShiftDocumentIdContainer;

    this.error = {};
    var errorIndex = 0;

    if (this.data.PreparationOrder == "" || this.data.PreparationOrder == undefined) {
      this.error.PreparationOrder = "No. Order Produksi Tidak Boleh Kosong";
      errorIndex++;
    // } else {
    //   PreparationOrderContainer = this.data.PreparationOrder;
    }

    if (this.data.PreparationMaterialType == "" || this.data.PreparationMaterialType == undefined) {
      this.error.PreparationMaterialType = "Jenis Material Tidak Boleh Kosong";
      errorIndex++;
    // } else {
    //   PreparationMaterialTypeContainer = this.data.PreparationMaterialType;
    }

    if (this.data.AmountOfCones == 0 || this.data.AmountOfCones == undefined) {
      this.error.AmountOfCones = "Jumlah Cone Tidak Boleh Kosong";
      errorIndex++;
    // } else {
    //   AmountOfConesContainer = this.data.AmountOfCones;
    }

    if (this.data.ColourOfCone == "" || this.data.ColourOfCone == undefined) {
      this.error.ColourOfCone = "Warna Cone Tidak Boleh Kosong";
      errorIndex++;
    // } else {
    //   ColourOfConeContainer = this.data.ColourOfCone;
    }

    if (this.data.PreparationOperator == "" || this.data.PreparationOperator == undefined) {
      this.error.PreparationOperator = "Operator Tidak Boleh Kosong";
      errorIndex++;
    // } else {
    //   PreparationOperatorContainer = this.data.PreparationOperator;
    }

    if (this.data.PreparationDate == "" || this.data.PreparationDate == undefined) {
      this.error.PreparationDate = "Tanggal Pasang Tidak Boleh Kosong";
      errorIndex++;
    // } else {
    //   PreparationDateContainer = moment(this.data.PreparationDate).utcOffset("+07:00").format();
    }

    if (this.data.PreparationTime == "" || this.data.PreparationTime == undefined) {
      this.error.PreparationTime = "Waktu Pasang Tidak Boleh Kosong";
      errorIndex++;
    // } else {
    //   PreparationTimeContainer = this.data.PreparationTime;
    }

    if (this.data.PreparationShift == "" || this.data.PreparationShift == undefined) {
      this.error.Shift = "Shift Tidak Boleh Kosong";
      errorIndex++;
    // } else {
    //   PreparationShiftContainer = this.data.PreparationShift;
    }

    if (errorIndex === 0) {
      this.service
        .create(this.data)
        .then(result => {
          this.list();
        })
        .catch(e => {
          this.error = e;
        });
    }
  }
}
