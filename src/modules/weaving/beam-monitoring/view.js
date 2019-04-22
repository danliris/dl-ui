import {
  inject,
  bindable,
  Lazy
} from "aurelia-framework";
import {
  Router
} from "aurelia-router";
import {
  Service
} from "./service";

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
  }

  async activate(params) {
    // var Id = params.Id;
    // this.data = await this.service.getById(Id);
    this.data = {
      BeamNumber: "TS 108",
      LatestStatus: "Warping",
      History: {
        BeamDate: "21 March, 2014",
        Status: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, et elementum lorem ornare. Maecenas placerat facilisis mollis. Duis sagittis ligula in sodales vehicula...."
      }
    };
  }

//   list() {
//     this.router.navigateToRoute("list");
//   }

  cancelCallback(event) {
    this.router.navigateToRoute("list");
  }

  deleteCallback(event) {
    this.service.delete(this.data).then(result => {
      this.cancelCallback(event);
    });
  }
}
