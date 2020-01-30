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
import moment from "moment";

@inject(Router, Service)
export class View {
  detailEditOnly = true;
  createOnly = true;
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    var Id = params.Id;
    this.data = await this.service
      .getById(Id)
      .then(result => {
        if (result.Period) {
          result.Month = moment(result.Period).format("MMMM");
          result.Year = moment(result.Period).format("YYYY");
        }
        return result;
      });

    if (this.data.Id) {
      this.Month = this.data.Month;
      this.Year = this.data.Year;
      this.Construction = this.data.ConstructionNumber;
      this.WarpOrigin = this.data.WarpOrigin;
      this.WeftOrigin = this.data.WeftOrigin;
      this.Unit = this.data.Unit;
    }
  }

  //Dipanggil ketika tombol "Kembali" ditekan
  list() {
    this.router.navigateToRoute("list");
  }

  //Tombol "Kembali", panggil list()
  cancelCallback(event) {
    this.list();
  }

  //Tombol "Ubah", routing ke 'edit'
  editCallback(event) {
    this.router.navigateToRoute("edit", {
      Id: this.data.Id
    });
  }

  //Tombol "Hapus", hapus this.data, redirect ke list
  deleteCallback(event) {
    this.service.delete(this.data).then(result => {
      this.list();
    });
  }
}
