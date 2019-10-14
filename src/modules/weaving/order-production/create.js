import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Create {
  createOnly = false;
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.error = {};
  }

  activate(params) {}

  //Dipanggil ketika tombol "Kembali" ditekan
  list() {
    this.router.navigateToRoute("list");
  }

  //Tombol "Kembali", panggil list()
  cancelCallback(event) {
    this.list();
  }

  //Tombol "Simpan", menyimpan nilai masukan
  saveCallback(event) {
    this.error = {};
    var CodeRegEx = new RegExp("([1-9])");
    var CurrentDate = new Date();
    this.data.DateOrdered = CurrentDate;

    if (this.data.Period) {
      if (!this.data.Period.Month) {
        this.data.Period.Month = "";
      }
      if (!this.data.Period.Year) {
        this.data.Period.Year = "";
      }
    } else {
      this.data.Period = "";
    }

    if (!this.data.FabricConstructionDocument) {
      this.data.FabricConstructionDocument = {};
      this.data.FabricConstructionDocument.Id = "";
      this.data.FabricConstructionDocument.ConstructionNumber = "";
    }

    if (
      this.WarpOrigin == null ||
      this.WarpOrigin == undefined ||
      this.WarpOrigin == ""
    ) {
      this.data.WarpOriginId = "";
    } else{
      this.data.WarpOriginId = this.WarpOrigin.Id
    }

    if (
      this.WeftOrigin == null ||
      this.WeftOrigin == undefined ||
      this.WeftOrigin == ""
    ) {
      this.data.WeftOriginId = "";
    } else{
      this.data.WeftOriginId = this.WeftOrigin.Id
    }

    if (!this.data.WarpComposition) {
      this.data.WarpComposition = {};
      this.data.WarpComposition.CompositionOfPoly = 0;
      this.data.WarpComposition.CompositionOfCotton = 0;
      this.data.WarpComposition.OtherComposition = 0;
    }

    if (!this.data.WeftComposition) {
      this.data.WeftComposition = {};
      this.data.WeftComposition.CompositionOfPoly = 0;
      this.data.WeftComposition.CompositionOfCotton = 0;
      this.data.WeftComposition.OtherComposition = 0;
    }

    if (!this.data.YarnType) {
      this.data.YarnType = "";
    }

    if (!this.data.WholeGrade) {
      this.data.WholeGrade = 0;
    }

    if (!this.data.WeavingUnit) {
      this.data.WeavingUnit = {};
      this.data.WeavingUnit.Id = 0;
      this.data.WeavingUnit.Code = "";
      this.data.WeavingUnit.Name = "";
    } else {
      var Unit = this.data.WeavingUnit;
      this.data.WeavingUnit = {};
      this.data.WeavingUnit.Id = Unit.Id;
      this.data.WeavingUnit.Code = Unit.Code;
      this.data.WeavingUnit.Name = Unit.Name;
    }
    
    this.service
      .create(this.data)
      .then(result => {
        this.list();
      })
      .catch(e => {
        this.error = e;
        this.error.ConstructionNumber =
          e["FabricConstructionDocument.ConstructionNumber"];
        this.error.WeavingUnit = e["WeavingUnit.Id"];
      });
  }
}
