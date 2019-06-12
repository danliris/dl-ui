import {
  inject,
  bindable,
  BindingEngine,
  Lazy
} from "aurelia-framework";
import {
  Router
} from "aurelia-router";
import {
  Service
} from "./service";
import moment from 'moment';
var UnitLoader = require("../../../loader/unit-loader");
var MachineLoader = require("../../../loader/weaving-machine-loader");
var ConstructionLoader = require("../../../loader/weaving-constructions-loader");
var OperatorLoader = require("../../../loader/weaving-operator-loader");

@inject(Service, Router, BindingEngine)
export class Create {
  @bindable readOnly;
  @bindable MachineDocument;
  @bindable WeavingDocument;
  @bindable ConstructionDocument;
  @bindable OperatorDocument;
  @bindable EntryTime;
  @bindable BeamsWarping;
  // @bindable Netto;

  // beamColumns = [{
  //   value: "__check"
  // }, {
  //   value: "BeamNumber",
  //   header: "No. Beam"
  // }, {
  //   value: "EmptyWeight",
  //   header: "Berat Kosong Beam"
  // }];

  beamColumns = [{
    value: "BeamNumber",
    header: "No. Beam"
  }, {
    value: "EmptyWeight",
    header: "Berat Kosong Beam"
  }];

  constructor(service, router, bindingEngine) {
    this.router = router;
    this.service = service;
    this.bindingEngine = bindingEngine;

    this.data = {};
    this.data.Details = {};
    // this.data.Details.History = {};
    this.data.Weight = {};
    this.data.Weight.Netto = "";
    this.BeamsWarping = [];

    this.error = {};

    // if (this.readOnly) {
    //   //Collections Columns on readOnly state
    //   this.beamColumns = [{
    //     value: "BeamNumber",
    //     header: "No. Beam"
    //   }, {
    //     value: "EmptyWeight",
    //     header: "Berat Kosong Beam"
    //   }];
    // } else {
    //   this.beamColumns = [{
    //     value: "__check"
    //   }, {
    //     value: "BeamNumber",
    //     header: "No. Beam"
    //   }, {
    //     value: "EmptyWeight",
    //     header: "Berat Kosong Beam"
    //   }];
    // }
  }

  formOptions = {
    cancelText: 'Kembali',
    saveText: 'Simpan',
  };

  get machines() {
    return MachineLoader;
  }

  get units() {
    return UnitLoader;
  }

  get constructions() {
    return ConstructionLoader;
  }

  get operators() {
    return OperatorLoader;
  }

  OperatorDocumentChanged(newValue) {
    // this.data.SizingGroup = {};
    this.SizingGroup = newValue.Group;
  }

  EntryTimeChanged(newValue) {
    this.data.Details.PreparationTime = newValue;
    this.service.getShiftByTime(newValue)
      .then(result => {
        // if (result) {
        this.error.Shift = "";
        this.Shift = {};
        this.Shift = result;
        this.data.Details.ShiftId = this.Shift.Id;
        // }
      })
      .catch(e => {
        this.Shift = {};
        this.data.ShiftId = this.Shift.Id;
        this.error.Shift = " Shift tidak ditemukan ";
      });
  }

  get addBeamsWarping() {
    return event => {
      this.BeamsWarping.push({});
    };
  }

  beamDetail(data) {
    var beam = {};
    beam.Id = data.Id;
    beam.EmptyWeight = data.EmptyWeight;

    // if (data.Id) {
    //   this.data.ConstructionNumber = this.ConstructionNumber;
    // }
    return beam;
  }

  get Netto() {
    let result = 0;

    if (this.BeamsWarping) {
      if (this.BeamsWarping.length > 0) {
        this.data.WarpingBeamsId = [];
        for (let beam of this.BeamsWarping) {
          // if (beam.BeamDocument && beam.BeamDocument.Id && beam.BeamDocument.EmptyWeight != 0) {
          //   this.data.WarpingBeamCollectionDocumentId.push(this.beamDetail(beam));
          //   result += beam.BeamDocument.EmptyWeight;
          // }
          if (beam.BeamDocument && beam.BeamDocument.EmptyWeight != 0) {
            result += beam.BeamDocument.EmptyWeight;
          }
        }
      }

      this.data.Weight.Netto = result.toString();
    }
    return result;

  }

  // BeamsWarpingChanged(n, o) {
  //   console.log(n);
  // }

  saveCallback(event) {
    // this.error = {};
    // if(this.data.Weight.Netto == "" || this.data.Weight.Netto == 0 || this.data.Weight.Netto == null || this.data.Weight.Netto == undefined){
    //   e.Netto = "Counter Awal Harus Diisi";
    //   this.error = e;
    // }

    this.BeamId = this.BeamsWarping.map((beam) => beam.BeamDocument.Id);
    this.BeamId.forEach(id => {
      var BeamId = id;
      this.data.WarpingBeamsId.push(BeamId);
    });

    this.data.MachineDocumentId = this.MachineDocument.Id;
    this.data.WeavingUnitId = this.WeavingUnitDocument.Id;
    this.data.ConstructionDocumentId = this.ConstructionDocument.Id;
    this.data.Details.OperatorDocumentId = this.OperatorDocument.Id;
    // debugger;
    // var formatDate = this.data.Details.History.MachineDate.split(" ");
    // this.data.Details.History.MachineDate = new Date(formatDate[2], formatDate[1] - 1, formatDate[0]);
    
    this.service
      .create(this.data)
      .then(result => {
        this.router.navigateToRoute('list');
      })
      .catch(e => {
        this.error = e;
      });
  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }
}
