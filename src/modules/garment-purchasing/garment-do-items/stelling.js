import { inject, bindable, computedFrom } from 'aurelia-framework';
import {
  Router
} from 'aurelia-router';
import {
  Service
} from './service';


@inject(Router, Service)
export class Stelling {
  hasCancel = true;
  hasSave = true;
  hasView = false;
  hasCreate = true;
  hasEdit = false;

  Id = {};

  constructor(router, service) {
    this.service = service;
    this.router = router;

    this.formOptions = {
      cancelText: "Kembali",
      saveText: "Simpan",
    };
  }

  bind() {
    this.error = {};
    this.checkedAll = true;
  }

  async activate(params) {
    var id = params.id;
    this.Id = id;
    this.data = await this.service.getStelling(id);

    this.receipt = this.data.slice(0, 1);

  }

  getPdf(arg) {
    this.service.getPdfById(arg)
      .then((result) => {

      })
      .catch(e => {
        this.error = e;
        this.data = this.service.getStelling(arg);

      })
  }

  cancel(event) {
    this.router.navigateToRoute('list');
  }

  cancel(event) {
    this.router.navigateToRoute('list');
  }


  //   bind(context) {
  //     this.context = context;
  //     this.data = {
  //         items: []
  //       };
  //       this.error = {};

  //     this.cancelCallback = this.context.cancelCallback;
  //     // this.deleteCallback = this.context.deleteCallback;
  //     // this.editCallback = this.context.editCallback;
  //     this.saveCallback = this.context.saveCallback;
  //   }





}