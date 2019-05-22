import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import moment from "moment";

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

        //Test Data
        this.data = {
            OperationDate: moment(new Date("12/3/2018")),
            WeavingUnit: "testUnit",
            OrderNumber: "Test Number",
            MachineNumber: "007",
            FabricConstructionNumber: "Test Number"
        };



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

    start() {
        $("#Mulai").modal('hide');
        console.log(this.data);
    }

    stop() {
        $("#Berhenti").modal('hide');
        console.log(this.data);
    }

    resume() {
        $("#Melanjutkan").modal('hide');
        console.log(this.data);
    }

    finish() {
        $("#Melanjutkan").modal('hide');
        console.log(this.data);
    }
}