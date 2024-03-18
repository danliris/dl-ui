import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import { Dialog } from "../../../../au-components/dialog/dialog";
import { RejectDialog } from "./dialog/reject";

@inject(Router, Service, Dialog)
export class View {
  isView = true;
  constructor(router, service, dialog) {
    this.router = router;
    this.service = service;
    this.dialog = dialog;
  }

  formOptions = {
    cancelText: "Back",
    saveText: "Unpost",
  };

  async activate(params) {
    this.type = params.type;
    var id = params.id;
    this.data = await this.service.getById(id);
    this.supplier = this.data.buyer;
    this.kurs = this.data.kurs;
    this.remark = this.data.validatedMDRemark;

    if (this.data.items) {
      for (const item of this.data.items) {
        item.buyerAgent = this.data.buyerAgent;
        item.section = this.data.section;
      }
    }

    if (this.data.rejectTo == "MD")
      this.alertInfo =
        "<strong>Alasan Reject oleh Shipping: </strong> " +
        this.data.rejectReason;
  }

  cancel(event) {
    this.router.navigateToRoute("list");
  }

  approve() {
    var info = {};

    info.id = this.data.id;
    info.type = this.type;

    if (this.type == "MD") {
      info.kurs = this.kurs;
      info.approvedMDRemark = this.remark;
    }
    if (confirm(`Approve Data?`))
      this.service
        .approve(info)
        .then((result) => {
          this.cancel();
        })
        .catch((e) => {
          alert(e.kurs);
        });
  }

  reject(event) {
    this.dialog
      .show(RejectDialog, { title: `Alasan Reject ${event}` })
      .then((response) => {
        if (!response.wasCancelled) {
          var info = {};

          info.id = this.data.id;
          info.type = this.type;
          info.isReject = true;
          info.rejectTo = event;
          info.rejectReason = response.output;

          this.service
            .approve(info)
            .then((result) => {
              alert("Packing List berhasil diReject");
              this.cancel();
            })
            .catch((error) => {
              if (typeof error === "string") {
                alert(`Reject dibatalkan : ${error}`);
              } else {
                alert(`Error : ${error.message}`);
              }
            });
        }
      });
  }
}
