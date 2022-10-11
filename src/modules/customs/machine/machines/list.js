import {
  inject
} from 'aurelia-framework';
import {
  Service
} from "./service";
import {
  Router
} from 'aurelia-router';
import moment from 'moment';
const CategoryLoader = require('../../../../loader/machine-category-loader');
const MachineLoader = require('../../../../loader/machine-custom-loader');
const MachineTypeLoader = require('../../../../loader/machine-custom-type-loader');
const BrandLoader = require('../../../../loader/machine-brand-loader');

@inject(Router, Service)
export class List {
  context = ["ubah"];

  //   columns = [
  //     { field: "Classification", title: "Classification" },
  //     { field: "MachineBrand", title: "MachineBrand" },
  //     // {
  //     //     field: "CreatedDate", title: "Tanggal Buat", formatter: function (value, data, index) {
  //     //         return moment(value).format("DD MMM YYYY");
  //     //     }
  //     // },
  //     // { field: "CreatedBy", title: "Dibuat Oleh" },
  // ];

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  search() {
    var args = {
      ctg: this.category ? this.category.CategoryName : "",
      tipe: this.tipe ? this.tipe.MachineType : "",
      serial: this.serial ? this.serial.IDNumber : ""
    }
    this.service.search(args)

      .then(result => {
        var index = 1;
        this.data = result.data;

      });

  }

  get categoryLoader() {
    return CategoryLoader;
  }


  get brandLoader() {
    return BrandLoader;
  }

  get tipeLoader() {
    return MachineTypeLoader;
  }

  get serialLoader() {
    return MachineLoader;
  }

  categoryView = (cat) => {
    return `${cat.CategoryName}`;
  }

  brandView = (brand) => {
    return `${brand.BrandName}`;
  }

  tipeView = (tipe) => {
    return `${tipe.MachineType}`;
  }

  serialView = (ser) => {
    return `${ser.IDNumber}`;
  }

  ClickCallback(event) {
    
    var data = event;
    this.router.navigateToRoute('edit', {
      id: data.MachineID
    });

  }

  reset() {
    this.category = null;
    this.tipe = null;
    this.serial = null;
    this.data = [];
    // this.newData = [];
  }

}
