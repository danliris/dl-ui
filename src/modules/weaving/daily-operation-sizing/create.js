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
    this.data.Details.History = {};
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
    this.data.Details.History.MachineTime = newValue;
    this.service.getShiftByTime(newValue)
      .then(result => {
        if (result) {
          this.Shift = result;
          this.data.Details.ShiftDocumentId = result.Id;
        }
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
        this.data.WarpingBeamCollectionDocumentId = [];
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
    this.data.WarpingBeamCollectionDocumentId = this.BeamsWarping.map((beam) => beam.BeamDocument.Id);

    debugger;

    this.data.MachineDocumentId = this.MachineDocument.Id;
    this.data.WeavingUnitId = this.WeavingUnitDocument.Id;
    this.data.ConstructionDocumentId = this.ConstructionDocument.Id;
    this.data.Details.OperatorDocumentId = this.OperatorDocument.Id;

    console.log(this.data);

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
