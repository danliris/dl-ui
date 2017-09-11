import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import {activationStrategy} from 'aurelia-router';
import {Dialog} from '../../../../components/dialog/dialog';
import {AlertView} from './custom-dialog-view/alert-view';
var moment = require("moment");

@inject(Router, Service, Dialog)
export class Reprocess {
  constructor(router, service, dialog) {
    this.router = router;
    this.service = service;
    this.dialog = dialog;
  }

  activate(params) {

  }

  bind() {
    this.data = this.data || {};
    this.error = {};
    this.invalidSteps = [];
    this.range = [];
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }

  saveCallback(event) {
    this.invalidSteps = [];
    this.range = [];

    if (this.validateStepsDurationEstimation()) {
      if (this.invalidSteps.length > 0) {
        this.dialog.show(AlertView, { message: this.generateMessage() })
          .then(response => {
            if (!response.wasCancelled) {
              this.save(event);
            }
          });
      }
      else
        this.save(event);
    }
    else
      this.save(event);
  }

  generateMessage() {
    var message = "<div>Terdapat step yang tidak sesuai dengan estimasi durasi</div>";
    message += "<div>Apakah anda yakin mau menyimpan kanban ini?</div>";

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

        if (Object.getOwnPropertyNames(r).length > 0 && step.deadline && (new Date(step.deadline) < new Date(r.startDate) || new Date(step.deadline) > new Date(r.endDate))) {
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

  save(event) {
    var stepsError = [];
    var hasError = false;
    var instruction = this.data.instruction ? this.data.instruction.steps : [];

    if (instruction.length != 0) {
      if (this.data.reprocess == this.data.SEBAGIAN) {
        instruction = this.data.reprocessSteps.Reproses;
      }

      for (var step of instruction) {
        var stepErrors = {};

        if (!step.process || step.process == "") {
          stepErrors["process"] = "Process is required";
        }

        stepsError.push(stepErrors);
      }

      for (var stepError of stepsError) {
        if (Object.getOwnPropertyNames(stepError).length > 0) {
          hasError = true;
          break;
        }
      }

      if (!hasError) {
        event.event.toElement.disabled = true;

        var createPromise = [];
        this.data.productionOrderId = this.data.productionOrder ? this.data.productionOrder._id : {};
        this.data.instructionId = this.data.instruction ? this.data.instruction._id : {};
        this.data.currentStepIndex = 0;

        for (var cart of this.data.carts) {
          this.data.cart = cart;
          this.data.currentQty = cart.qty;

          if (cart.reprocess == this.data.LANJUT_PROSES) {
            this.data.isReprocess = false;
            this.data.instruction.steps = this.data.reprocessSteps.LanjutProses;
          }
          else if (cart.reprocess == this.data.REPROSES) {
            this.data.isReprocess = true;
            this.data.instruction.steps = this.data.reprocessSteps.Reproses;
          } else {
            this.data.isReprocess = true;
          }

          createPromise.push(this.service.create(this.data));
        }

        if (createPromise.length <= 0) {
          createPromise.push(this.service.create(this.data));
        }

        Promise.all(createPromise)
          .then(responses => {
            alert("Data berhasil dibuat");
            this.router.navigateToRoute('reprocess', {}, { replace: true, trigger: true });
          })
          .catch(e => {
            delete this.data.cart;
            delete this.data.currentQty;
            this.error = e;
            event.event.toElement.disabled = false;
          })
      }
      else {
        this.error.steps = stepsError;
      }
    }
  }
}