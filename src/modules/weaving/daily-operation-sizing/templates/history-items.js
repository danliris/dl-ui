import {
  inject,
  bindable,
  BindingEngine
} from "aurelia-framework";
import {
  Service
} from "../service";
import { Dialog } from '../../../../au-components/dialog/dialog'
import moment from "moment";

// var ConstructionLoader = require("../../../../loader/weaving-constructions-loader");

@inject(BindingEngine, Service, Dialog)
export class HistoryItems {
  // @bindable Code;
  // @bindable OrderDocument;

  constructor(bindingEngine, service, dialog) {
    this.service = service;
    this.bindingEngine = bindingEngine;
    this.dialog = dialog;
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;

    if (this.data.DateTimeMachine) {
      var DateMachine = moment(this.data.DateTimeMachine).format('DD/MM/YYYY');
      var TimeMachine = moment(this.data.DateTimeMachine).format('LT');

      this.data.MachineDate = DateMachine;
      this.data.MachineTime = TimeMachine;
    }

    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
  }

  delete() {
    let operationId = this.options.Id;
    let lastBeamProduct = this.options.DailyOperationSizingBeamProducts[0];
    let lastBeamProductId = lastBeamProduct.Id;

    let historyId = this.data.Id;
    let historyStatus = this.data.MachineStatus;

    let sizingData = {};
    sizingData.Id = operationId;
    sizingData.HistoryId = historyId;
    sizingData.HistoryStatus = historyStatus;
    
    switch (historyStatus) {
      case "ENTRY":
          this.dialog.prompt("Apakah anda yakin akan menghapus data?", "Hapus Data")
          .then(response => {
              if (response.ok) {
                this.service.deleteEntry(this.options)
                .then(result => {
                  location.reload();
                })
                .catch(e => {
                  this.error = e;
                });
              }
          });
        break;
      case "START":
        sizingData.BeamProductId = lastBeamProductId;

        this.dialog.prompt("Apakah anda yakin akan menghapus data?", "Hapus Data")
        .then(response => {
            if (response.ok) {
              this.service.deleteStartOrCompleted(sizingData.Id, sizingData)
              .then(result => {
                location.reload();
              })
              .catch(e => {
                this.error = e;
              });
            }
        });
        break;
      case "STOP":
          this.dialog.prompt("Apakah anda yakin akan menghapus data?", "Hapus Data")
          .then(response => {
              if (response.ok) {
                this.service.deleteStopOrContinueOrFinish(sizingData.Id, sizingData)
                .then(result => {
                  location.reload();
                })
                .catch(e => {
                  this.error = e;
          });
              }
          });
        break;
      case "CONTINUE":
          this.dialog.prompt("Apakah anda yakin akan menghapus data?", "Hapus Data")
          .then(response => {
              if (response.ok) {
                this.service.deleteStopOrContinueOrFinish(sizingData.Id, sizingData)
                .then(result => {
                  location.reload();
                })
                .catch(e => {
                  this.error = e;
                });
              }
          });
        break;
      case "COMPLETED":
        sizingData.BeamProductId = lastBeamProductId;

        this.dialog.prompt("Apakah anda yakin akan menghapus data?", "Hapus Data")
          .then(response => {
              if (response.ok) {
                this.service.deleteStartOrCompleted(sizingData.Id, sizingData)
                .then(result => {
                  location.reload();
                })
                .catch(e => {
                  this.error = e;
                });
              }
          });
        break;
      case "FINISH":
          this.dialog.prompt("Apakah anda yakin akan menghapus data?", "Hapus Data")
          .then(response => {
              if (response.ok) {
                this.service.deleteStopOrContinueOrFinish(sizingData.Id, sizingData)
                .then(result => {
                  location.reload();
                })
                .catch(e => {
                  this.error = e;
                });
              }
          });
        break;
    }
  }
}
