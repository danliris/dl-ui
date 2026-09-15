import { Service } from "./service";
import { PurchasingService } from "./service";
import { Router } from "aurelia-router";
import { inject } from "aurelia-framework";
import { Base64Helper } from '../../../utils/base-64-coded-helper';
import FileHelper from '../../../utils/file-helper'
import { Dialog } from "../../../au-components/dialog/dialog";
import { RejectReason } from "./dialog-template/reject-reason";

@inject(Router, Service, PurchasingService, Dialog)
export class View {
    constructor(router, service, purchasingService, dialog) {
        this.router = router;
        this.service = service;
        this.purchasingService = purchasingService;
        this.dialog = dialog;
        this.previewWidth = 60;
        this.previewHeight = 600;
    }

    controlOptions = {
        label: {
            align: "right",
            length: 5,
        },
        control: {
            length: 5,
            align: "right",
        },
    };

    formOptions = {
        cancelText: "Kembali",
        editText: "Approve",
        deleteText: "Reject"
    };

    async activate(params) {
        let decoded = Base64Helper.decode(params.dispotitionPurchaseId);
        this.data = await this.purchasingService.getById(decoded);

        let expeditionIdDecoded = Base64Helper.decode(params.expeditionId);
        this.expeditionId = expeditionIdDecoded;

        this.data.DocumentsFile = this.data.DocumentsFile || [];
        this.data.DocumentsFileName = this.data.DocumentsFileName || [];
        this.documentsPathTemp = [].concat(this.data.DocumentsPath);

        this.editCallback = this.approve;
        this.deleteCallback = this.reject;
    }

    bind(context) {
        this.context = context;
    }

    list() {
        this.router.navigateToRoute("list");
    }

    cancelCallback(event) {
        this.list();
    }

    approve(event) {
        if (confirm("Approve Disposition?")) {
            this.service.sendToCashier(this.expeditionId)
                .then(() => {
                    this.list();
                })
                .catch(e => {
                    this.error = e;
                    if (e.statusCode === 500) {
                        alert("Gagal menyimpan, silakan coba lagi!");
                    }
                });
        }
    }

    reject(event) {
        this.dialog.show(RejectReason, { message: "Silakan masukkan alasan reject:" })
            .then(response => {
                if (!response.wasCancelled) {
                    const reason = response.output;
                    if (!reason || String(reason).trim() === "") {
                        alert('Alasan tidak boleh kosong.');
                        return;
                    }
                    this.service
                        .sendToVerificationRejected(this.expeditionId, String(reason).trim())
                        .then(() => {
                            this.list();
                        })
                        .catch((e) => {
                            this.error = e;
                            if (e.statusCode === 500) {
                                alert("Gagal menyimpan, silakan coba lagi!");
                            }
                        });
                }
            });
    }

    downloadDocument(index) {
        FileHelper.downloadDocument(this.data.DocumentsFile, this.data.DocumentsFileName, index);
    }

    previewDocument(index) {
        FileHelper.previewDocument(this, this.data.DocumentsFile, this.data.DocumentsFileName, index);
    }
}