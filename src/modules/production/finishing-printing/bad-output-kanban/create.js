import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import {activationStrategy} from 'aurelia-router';
import {Dialog} from '../../../../components/dialog/dialog';
import {AlertView} from './custom-dialog-view/alert-view';
var moment = require("moment");

@inject(Router, Service, Dialog)
export class Create {
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
    return activationStrategy.replace; //replace the viewmodel with a new instance
    // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
    // or activationStrategy.noChange to explicitly use the default behavior
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
    message += "<div>Apakah anda yakin mau menyimpan kanban ini?</div>";

    for (var invalidStep of this.invalidSteps) {
      message += "<div>" + invalidStep.no + ". " + invalidStep.process + "</div>";
    }

    message += "<br>";
    
    let removeData = ["length", "PPIC", "PREPARING"];
    let areas = Object.getOwnPropertyNames(this.range);

    for(let j = 0; j < removeData.length; j++)
    {
      let index = areas.indexOf(removeData[j]);
      if (index >= 0) {
        areas.splice( index, 1 );
      }
    }

    for(let i = areas.length - 1; i >= 0; i--)
    {
      message += "<div>" + this.range[areas[i]].area + ": " + moment(this.range[areas[i]].startDate).format("DD MMM YYYY") + " - " + moment(this.range[areas[i]].endDate).format("DD MMM YYYY") + "</div>";
    }

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
        if (r && Object.getOwnPropertyNames(r).length > 0 && step.deadline && (step.deadline < r.startDate || step.deadline > r.endDate)) {
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
    var createPromise = [];
    this.data.productionOrderId = this.data.productionOrder ? this.data.productionOrder._id : {};
    this.data.instructionId = this.data.instruction ? this.data.instruction._id : {};
    this.data.isBadOutput = true;

    for (var cart of this.data.carts) {
      this.data.cart = cart;
      this.data.currentQty = cart.qty;
      createPromise.push(this.service.create(this.data));
    }

    if (createPromise.length <= 0) {
      createPromise.push(this.service.create(this.data));
    }

    Promise.all(createPromise)
      .then(responses => {
        alert("Data berhasil dibuat");
        this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
      })
      .catch(e => {
        delete this.data.cart;
        delete this.data.currentQty;
        this.error = e;
      })
  }
}