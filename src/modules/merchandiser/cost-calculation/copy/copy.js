import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "../service";

@inject(Router, Service)
export class Copy {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
        this.error = {};
    }

    identityProperties = [
        "Id",
        "Active",
        "CreatedUtc",
        "CreatedBy",
        "CreatedAgent",
        "LastModifiedUtc",
        "LastModifiedBy",
        "LastModifiedAgent",
    ];

    async activate(params) {
        this.id = params.id;
        this.data = await this.service.getById(this.id);
        this.copiedROFrom = this.data.RO_Number;
        this.clearDataProperties();
    }

    clearDataProperties() {
        this.identityProperties.concat([
            "PreSCNo",
            "Code",
            "RO_Number",
            "ImagePath",
            "RO_RetailId",
            "IsDeleted",
            "Article"
        ]).forEach(prop => delete this.data[prop]);
        this.data.CostCalculationGarment_Materials.forEach(ccm => {
            this.identityProperties.concat([
                "Code",
                "PO",
                "PO_SerialNumber",
            ]).forEach(prop => delete ccm[prop]);
        });
    }

    list() {
        this.router.navigateToRoute("list");
    }

    cancelCallback(event) {
        this.list();
    }

    saveCallback(event) {
        this.service
            .create(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.list();
            })
            .catch(e => {
                if (e.statusCode === 500) {
                    alert("Gagal menyimpan, silakan coba lagi!");
                } else {
                    this.error = e;
                }
            });
    }
}
