import {
  inject
} from "aurelia-framework";
import {
  Router
} from "aurelia-router";
import {
  Service
} from "./service";
import moment from "moment";

@inject(Router, Service)
export class View {

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah"
  };

  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.historyList = [];
  }

  async activate(params) {
    var Id = params.Id;
    var number = params.Number;
    this.data = await this.service
      .getById(Id, number)
      .then(result => {

        var movementDetails = result.BeamMovementDetails.map(element => {
          element.DateTimeOperation = moment(element.DateTimeOperation).format('DD/MM/YYYY hh:mm A');
          return element;
        });

        result.BeamMovementDetails = movementDetails;
        return result;
      });
  }

  cancelCallback(event) {
    this.router.navigateToRoute("list");
  }

  deleteCallback(event) {
    this.service.delete(this.data).then(result => {
      this.cancelCallback(event);
    });
  }
}
