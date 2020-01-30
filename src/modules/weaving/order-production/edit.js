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
export class Edit {
  detailEditOnly = true;
  createOnly = true;
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.error = {};
  }

  async activate(params) {
    var Id = params.Id;
    var mappedResult = {};
    this.data = await this.service
      .getById(Id)
      .then(result => {
        mappedResult = result;
        if (result.Period) {
          moment.locale("id");
          mappedResult.Month = moment(result.Period).format("MMMM");
          mappedResult.Year = moment(result.Period).format("YYYY");
        }
        return this.service.getUnitById(mappedResult.UnitId);
      }).then(unitResult => {
        mappedResult.Unit = unitResult;
        return this.service.getSupplierById(mappedResult.WarpOriginId);
      }).then(warpResult => {
        mappedResult.WarpOrigin = warpResult;
        return this.service.getSupplierById(mappedResult.WeftOriginId);
      }).then(weftResult => {
        mappedResult.WeftOrigin = weftResult;
        return mappedResult;
      });
    console.log(this.data);
    if (this.data.Id) {
      this.Month = this.data.Month;
      this.Year = this.data.Year;
      this.Construction = this.data.ConstructionNumber;
      this.WarpOrigin = this.data.WarpOrigin;
      this.WeftOrigin = this.data.WeftOrigin;
      this.Unit = this.data.Unit;
    }

    // var dataResult;
    // this.data = await this.service
    //   .getById(Id)
    //   .then(result => {
    //     dataResult = result;
    //     return this.service.getUnitById(result.WeavingUnit);
    //   })
    //   .then(unit => {
    //     dataResult.WeavingUnit = unit;
    //     return dataResult;
    //   });
    // if (typeof this.data.Period.Year === "string") {
    //   this.Year = parseInt(this.data.Period.Year);
    // }
  }

  cancelCallback(event) {
    this.router.navigateToRoute("view", {
      Id: this.data.Id
    });
  }

  saveCallback(event) {
    debugger;
    this.error = {};
    var errorIndex = 0;

    var currentDate = new Date();
    this.data.Day = currentDate.getDate();

    var sumWarp = this.data.WarpCompositionPoly + this.data.WarpCompositionCotton + this.data.WarpCompositionOthers;
    if (sumWarp < 100) {
      this.error.SumWarp = "Jumlah Komposisi Lusi Tidak Boleh Kurang Dari 100%";
      errorIndex++;
    } else if (sumWarp > 100) {
      this.error.SumWarp = "Jumlah Komposisi Lusi Tidak Boleh Lebih Dari 100%";
      errorIndex++;
    }

    var sumWeft = this.data.WeftCompositionPoly + this.data.WeftCompositionCotton + this.data.WeftCompositionOthers;
    if (sumWeft < 100) {
      this.error.SumWeft = "Jumlah Komposisi Pakan Tidak Boleh Kurang Dari 100%";
      errorIndex++;
    } else if (sumWeft > 100) {
      this.error.SumWeft = "Jumlah Komposisi Pakan Tidak Boleh Lebih Dari 100%";
      errorIndex++;
    }
    console.log(this.data);
    if (errorIndex == 0) {
      this.service
        .update(this.data)
        .then(result => {
          this.router.navigateToRoute("view", {
            Id: this.data.Id
          });
        })
        .catch(e => {
          this.error = e;
        });
    }
  }
}
