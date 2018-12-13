import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
  context = ["detail"];

  columns = [
    { field: "sopNo", title: "No SOP" },
    {
      field: "tglsp", title: "Tanggal SOP", formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      }
    },
    { field: "unit", title: "Unit" },
    { field: "jenismesin", title: "Mesin" },
    { field: "konstruksi.jenis", title: "Konstruksi" },
    { field: "blended.poly", title: "Blended (%)" }

  ];

  loader = (info) => {
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      // select: ["", "", "", "", "", ""],
      order: order
    }

    return {
      total: 1,
      // total: result.info.total,
      data: [{
        sopNo: "1",
        tglsp: new Date(),
            periode: {
                bulan: "Januari",
                tahun: "2018"
            },
            unit: "Weaving 1",
            konstruksi: {
                jenis: "CD 133",
                tipe: "72",
                lusi: "63",
                pakan: "Rf Rf",
                lebar: "B B",
            },
            kodebenang: {
                jenislusi: "AC",
                asallusi: "A",
                jenispakan: "BC",
                asalpakan: "B"
            },
            blended: {
                poly: "60%",
                cotton: "30%",
                lainnya: "10%"
            },
            delivery: new Date(),
            jenismesin: "AJL",
            jenisbenang: "CT",
            allgrade: "AG"
      }, {
        sopNo: "2",
        tglsp: new Date(),
            periode: {
                bulan: "Januari",
                tahun: "2018"
            },
            unit: "Weaving 1",
            konstruksi: {
                jenis: "CD 133",
                tipe: "72",
                lusi: "63",
                pakan: "Rf Rf",
                lebar: "B B",
            },
            kodebenang: {
                jenislusi: "AC",
                asallusi: "A",
                jenispakan: "BC",
                asalpakan: "B"
            },
            blended: {
                poly: "60%",
                cotton: "30%",
                lainnya: "10%"
            },
            delivery: new Date(),
            jenismesin: "AJL",
            jenisbenang: "CT",
            allgrade: "AG"
      }]
    }

    // return this.service.search(arg)
    //   .then(result => {
    //     return {
    //       total: result.info.total,
    //       data: result.data
    //     }
    //     // .catch(error=>{
    //     //     console.log(error);
    //     // })
    //   });
  }

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        this.router.navigateToRoute('view', { id: data.sopNo });
        // this.router.navigateToRoute('view', { id: data._id });
        break;
      }
  }

  create() {
    this.router.navigateToRoute('create');
  }
}