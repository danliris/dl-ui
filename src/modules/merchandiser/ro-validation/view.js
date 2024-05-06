import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { AuthService } from "aurelia-authentication";
import { RejectDialog } from "./dialog/reject";
import { Dialog } from "../../../au-components/dialog/dialog";

@inject(Router, Service, AuthService, Dialog)
export class View {
    readOnly = true;
    hasApprove = true;
    hasReject = false;
    // hasUnApprove = false;


    constructor(router, service, authService, dialog) {
        this.router = router;
        this.service = service;
        this.authService = authService;
        this.dialog = dialog;
    }

    async activate(params, routeConfig, navigationInstruction) {
        let id = params.id;
        this.data = await this.service.read(id);

        const instruction = navigationInstruction.getAllInstructions()[0];
        const parentInstruction = instruction.parentInstruction;
        this.title = parentInstruction.config.title;
        const type = parentInstruction.config.settings.type;

        switch (type) {
            case "kabagmd":
                this.type = "MD";
                break;
            case "sample":
                this.type = "Sample";
                this.saveCallback = () => {
                    this.service.getPdfById(id);
                };
                this.hasReject = true;
                break;
            default: break;
        }

        if (this.authService.authenticated) {
            this.me = this.authService.getTokenPayload();
        }
        else {
            this.me = null;
        }

        if (this.data.IsRejected) {
            this.alertInfo =
                "<strong>Alasan Reject: </strong> " +
                this.data.RejectReason;
        }

    }

    backToList() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
        this.backToList();
    }

    // editCallback(event) {
    //     this.router.navigateToRoute('edit', { id: this.data.Id });
    // }

    // deleteCallback(event) {
    //     if (confirm(`Hapus Data?`))
    //         this.service.delete(this.data)
    //             .then(result => {
    //                 this.backToList();
    //             });
    // }

    approveCallback(event) {
        if (confirm(`Approve Data?`)) {
            let jsonPatch = [
                { op: "replace", path: `/IsValidatedRO${this.type}`, value: true },
                { op: "replace", path: `/Validation${this.type}By`, value: this.me.username },
                { op: "replace", path: `/Validation${this.type}Date`, value: new Date() }
            ];

            if (this.type === "Sample") {
                jsonPatch.push(
                    { op: "replace", path: `/IsValidatedROPPIC`, value: true },
                    { op: "replace", path: `/ValidationPPICBy`, value: this.me.username },
                    { op: "replace", path: `/ValidationPPICDate`, value: new Date() },
                    { op: "replace", path: `/IsROAccepted`, value: true },
                    { op: "replace", path: `/ROAcceptedBy`, value: this.me.username },
                    { op: "replace", path: `/ROAcceptedDate`, value: new Date() },
                );
            }

            this.service.replaceCostCalculation(this.data.CostCalculationGarment.Id, jsonPatch)
                .then(result => {
                    this.backToList();
                })
                .catch(e => {
                    this.error = e;
                });
        }
    }

    rejectCallback(event) {
        this.dialog
        .show(RejectDialog, { title: `Alasan Reject ${event}` })
        .then((response) => {
          if (!response.wasCancelled) {
            var info = {};
  
            info.id = this.data.Id;
            info.rejectReason = response.output;
  
            this.service
              .reject(info)
              .then((result) => {
                alert("RO berhasil diReject");
                this.backToList();
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

    // unapproveCallback(event) {
    //     if (confirm(`UnApprove Data?`))
    //         this.service.unapprove({ Id: this.data.Id })
    //             .then(result => {
    //                 this.backToList();
    //             });
    // }
}