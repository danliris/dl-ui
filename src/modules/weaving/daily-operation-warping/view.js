import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import moment from "moment";

@inject(Router, Service)
export class View {

  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
  }

  async activate(params) {
    var Id = params.Id;
    this.data =
      await this.service.getById(Id)
        .then(result => {
          return result;
        });
  }

  loomHistory = [
    { header: "Beam", value: "BeamNumber" },
    { header: "Operator", value: "BeamOperatorName" },
    { header: "Group", value: "BeamOperatorGroup" },
    {
      field: "DateTimeMachine",
      title: "Waktu",
      formatter: function(value, data, index) {
        return moment(new Date(value)).format("DD MMM YYYY");
      }
    },
    { header: "Status", value: "OperationStatus" },
    { header: "Shift", value: "ShiftName" }
];

  //Dipanggil ketika tombol "Kembali" ditekan
  list() {
    this.router.navigateToRoute("list");
  }

  //Tombol "Kembali", panggil list()
  cancelCallback(event) {
    this.list();
  }

  //Tombol "Hapus", hapus this.data, redirect ke list
  deleteCallback(event) {
    this.service.delete(this.data).then(result => {
      this.list();
    });
  }
}
