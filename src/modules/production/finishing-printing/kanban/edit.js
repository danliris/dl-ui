import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import {Dialog} from '../../../../components/dialog/dialog';
import {AlertView} from './custom-dialog-view/alert-view';
var moment = require("moment");

@inject(Router, Service, Dialog)
export class Edit {

  selectedProductionOrderDetail = {};

  constructor(router, service, dialog) {
    this.router = router;
    this.service = service;
    this.dialog = dialog;
  }

  async activate(params) {
    var id = params.id;
    await this.service.getById(id)
      .then((result) => {
        this.data = result;
        this.service.getDurationEstimation(this.data.productionOrder.processType.code, ["areas"])
          .then((result) => {
            if (result.data.length > 0) {
              this.data.durationEstimation = result.data[0];
            }
          });
      });
    this.data.cart.uom = this.data.cart.uom ? this.data.cart.uom.unit : 'MTR';

    var currentIndex = 0, countDoneStep = 0;
    for (var step of this.data.instruction.steps) {
      if (step.isNotDone) {
        if (step.isNotDone == false) {
          currentIndex++;
        }
        else {
          countDoneStep++;
        }
      }
    }

    if (this.data.isReprocess) {
      this.data.output = "Kanban Reproses";
    } else if (this.data.oldKanban._id && !this.data.isReprocess) {
      this.data.output = "Kanban Lanjut Proses";
    } else {
      this.data.output = "Kanban Baru";
    }

    this.data.countDoneStep = countDoneStep;
    this.data.currentIndex = currentIndex;
    this.productionOrder = this.data.productionOrder;
    this.instruction = this.data.instruction;
  }

  bind() {
    if (this.data.selectedProductionOrderDetail.colorRequest) {
      this.data.selectedProductionOrderDetail.toString = function () {
        return `${this.colorRequest}`;
      };
    }

    this.error = {};

    this.invalidSteps = [];
    this.range = [];
  }

  cancelCallback(event) {
    this.router.navigateToRoute('view', { id: this.data._id });
  }

  saveCallback(event) {
    this.invalidSteps = [];
    this.range = [];

    if (this.validateStepsDurationEstimation()) {
      if (this.invalidSteps.length > 0) {
        this.dialog.show(AlertView, { message: this.generateMessage() })
          .then(response => {
            if (!response.wasCancelled) {
              this.save();
            }
          });
      }
      else
        this.save();
    }
    else
      this.save();
  }

  generateMessage() {
    var message = "<div>Terdapat step yang tidak sesuai dengan estimasi durasi</div>";
    message += "<div>Apakah anda yakin mau mengubah kanban ini?</div>";

    for (var invalidStep of this.invalidSteps) {
      message += "<div>" + invalidStep.no + ". " + invalidStep.process + "</div>";
    }

    message += "<br>";
    message += "<div>" + this.range["PRE TREATMENT"].area + ": " + moment(this.range["PRE TREATMENT"].startDate).format("DD MMM YYYY") + " - " + moment(this.range["PRE TREATMENT"].endDate).format("DD MMM YYYY") + "</div>";
    message += "<div>" + this.range["DYEING"].area + ": " + moment(this.range["DYEING"].startDate).format("DD MMM YYYY") + " - " + moment(this.range["DYEING"].endDate).format("DD MMM YYYY") + "</div>";
    message += "<div>" + this.range["PRINTING"].area + ": " + moment(this.range["PRINTING"].startDate).format("DD MMM YYYY") + " - " + moment(this.range["PRINTING"].endDate).format("DD MMM YYYY") + "</div>";
    message += "<div>" + this.range["FINISHING"].area + ": " + moment(this.range["FINISHING"].startDate).format("DD MMM YYYY") + " - " + moment(this.range["FINISHING"].endDate).format("DD MMM YYYY") + "</div>";

    return message;
  }

  validateStepsDurationEstimation() {
    if (this.data.durationEstimation) {
      var deliveryDate = this.data.productionOrder.deliveryDate;
      var sumDay = 0;

      for (var i = this.data.durationEstimation.areas.length - 1; i >= 0; i--) {
        var area = this.data.durationEstimation.areas[i];
        var d = new Date(deliveryDate);
        d.setHours(0, 0, 0, 0);
        sumDay += area.duration;

        d.setDate(d.getDate() - sumDay + 1);
        var start = new Date(d);

        d.setDate(d.getDate() + (area.duration - 1));
        var end = new Date(d);

        this.range[area.name] = {
          area: area.name,
          startDate: start,
          endDate: end
        };
      }
      var index = 1;
      for (var step of this.data.instruction.steps) {
        var r = {};
        if(step.processArea && step.processArea != "") {
          r = this.range[step.processArea.toUpperCase().replace("AREA ", "")];
        }
        if (Object.getOwnPropertyNames(r).length > 0  && step.deadline && (new Date(step.deadline) < r.startDate || new Date(step.deadline) > r.endDate)) {
          this.invalidSteps.push({ no: index, process: step.process });
        }

        index++;
      }

      return true;
    }
    else {
      return false;
    }
  }

  save() {
    this.data.productionOrderId = this.data.productionOrder ? this.data.productionOrder._id : {};
    this.data.instructionId = this.data.instruction ? this.data.instruction._id : {};

    this.service.update(this.data)
      .then(result => {
        this.cancelCallback();
      })
      .catch(e => {
        this.error = e;
      })
  }

  get isEdit() {
    return true;
  }
}
