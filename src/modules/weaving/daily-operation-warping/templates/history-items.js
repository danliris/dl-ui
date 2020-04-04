import {
  inject,
  bindable,
  BindingEngine
} from "aurelia-framework";
import {
  Service
} from "../service";
import {
  Router
} from "aurelia-router";
import { Dialog } from '../../../../au-components/dialog/dialog'
import moment from 'moment';

@inject(BindingEngine, Service,Router,Dialog)
export class HistoryItems {

  constructor(bindingEngine, service,router,dialog) {
    this.service = service;
    this.bindingEngine = bindingEngine;
    this.router = router;
    this.dialog = dialog;
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;

    if (this.data.DateTimeMachine) {
      var DateMachine = moment(this.data.DateTimeMachine).format('DD/MM/YYYY');
      var TimeMachine = moment(this.data.DateTimeMachine).format('LT');

      this.data.DateMachine = DateMachine;
      this.data.TimeMachine = TimeMachine;
    }

    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
    console.log(context);
  }

  delete() {
    let operationId = this.options.Id;
    let lastBeamProduct = this.options.DailyOperationWarpingBeamProducts[0];
    let lastBeamProductId = "";
    if (lastBeamProduct != null || lastBeamProduct != undefined) {
      lastBeamProductId = lastBeamProduct.Id;
    }

    let historyId = this.data.Id;
    let historyStatus = this.data.MachineStatus;

    let warpingData = {};
    warpingData.Id = operationId;
    warpingData.HistoryId = historyId;
    warpingData.HistoryStatus = historyStatus;
    warpingData.BeamProductId = lastBeamProductId;
    switch (historyStatus) {
      case "ENTRY":
          this.dialog.prompt("Apakah anda yakin akan menghapus data?", "Hapus Data")
          .then(response => {
              if (response.ok) {
                this.service.deleteHistoryEntryStatus(warpingData)
                .then(result => {
                  this.router.navigateToRoute('list');
                })
                .catch(e => {
                  this.error = e;
                });
              }
          });
        break;
      case "START":
        this.dialog.prompt("Apakah anda yakin akan menghapus data?", "Hapus Data")
        .then(response => {
            if (response.ok) {
              this.service.deleteHistoryStartOrCompleteStatus(warpingData.Id, warpingData)
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
        this.dialog.prompt("Apakah anda yakin akan menghapus data?", "Hapus Data")
          .then(response => {
              if (response.ok) {
                this.service.deleteHistoryStartOrCompleteStatus(warpingData.Id, warpingData)
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
                this.service.deleteHistoryContinueOrFinishStatus(warpingData.Id, warpingData)
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
