import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Update {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
        this.error = {};
    }

    async activate(params) {
        var Id = params.Id;
        var dataResult;

        // this.data = await this.service.getById(Id)
        //     .then(result => {
        //         dataResult = result;
        //         return this.service.getUnitById(result.UnitDepartementId);
        //     })
        //     .then(unit => {

        //         if (unit) {
        //             dataResult.WeavingUnit = unit;
        //         }

        //         return dataResult;
        //     });
    }
}