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
    var OrderDocumentIdContainer;
    var MaterialTypeIdContainer;
    var AmountOfConesContainer;
    var ColourOfConeContainer;
    var OperatorDocumentIdContainer;
    var PreparationDateContainer;
    var PreparationTimeContainer;
    var ShiftDocumentIdContainer;

    this.error = {};
    var errorIndex = 0;

    if (this.data.OrderDocumentId == "" || this.data.OrderDocumentId == undefined) {
      this.error.OrderDocument = "No. Order Produksi Tidak Boleh Kosong";
      errorIndex++;
    } else {
      OrderDocumentIdContainer = this.data.OrderDocumentId;
    }

    if (this.data.MaterialTypeId == "" || this.data.MaterialTypeId == undefined) {
      this.error.MaterialType = "Jenis Material Tidak Boleh Kosong";
      errorIndex++;
    } else {
      MaterialTypeIdContainer = this.data.MaterialTypeId;
    }

    if (this.data.AmountOfCones == 0 || this.data.AmountOfCones == undefined) {
      this.error.AmountOfCones = "Jumlah Cone Tidak Boleh Kosong";
      errorIndex++;
    } else {
      AmountOfConesContainer = this.data.AmountOfCones;
    }

    if (this.data.ColourOfCone == "" || this.data.ColourOfCone == undefined) {
      this.error.ColourOfCone = "Warna Cone Tidak Boleh Kosong";
      errorIndex++;
    } else {
      ColourOfConeContainer = this.data.ColourOfCone;
    }

    if (this.data.OperatorDocumentId == "" || this.data.OperatorDocumentId == undefined) {
      this.error.OperatorDocument = "Operator Tidak Boleh Kosong";
      errorIndex++;
    } else {
      OperatorDocumentIdContainer = this.data.OperatorDocumentId;
    }

    if (this.data.PreparationDate == "" || this.data.PreparationDate == undefined) {
      this.error.PreparationDate = "Tanggal Pasang Tidak Boleh Kosong";
      errorIndex++;
    } else {
      PreparationDateContainer = moment(this.data.PreparationDate).utcOffset("+07:00").format();
    }

    if (this.data.PreparationTime == "" || this.data.PreparationTime == undefined) {
      this.error.PreparationTime = "Waktu Pasang Tidak Boleh Kosong";
      errorIndex++;
    } else {
      PreparationTimeContainer = this.data.PreparationTime;
    }

    if (this.data.ShiftDocumentId == "" || this.data.ShiftDocumentId == undefined) {
      this.error.Shift = "Shift Tidak Boleh Kosong";
      errorIndex++;
    } else {
      ShiftDocumentIdContainer = this.data.ShiftDocumentId;
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
