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

    loomHistory = [
        { header: "Tanggal", value: "DateOrdered" },
        { header: "No. SOP", value: "OrderNumber" },
        { header: "No. Konstruksi", value: "ConstructionNumber"},
        { header: "Total Gram", value: "TotalGramEstimation" },
        { header: "Jumlah Order(Meter)", value: "WholeGrade" }
      ];

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
        this.error = {};
        var startDataDummy = {
            DateOrdered :  moment(new Date("12/3/2018")),
            OrderNumber : '12131411',
            ConstructionNumber : '231313213',
            TotalGramEstimation : 120000,
            WholeGrade : 990000
        }

        this.data.loomHistory.push(startDataDummy);

        // this.service
        //     .updateForStartProcess(this.data)
        //     .then(result => {
                
                
        //         // Refereshing list of history
        //     });
    }

    stop() {
        $("#Berhenti").modal('hide');
        console.log(this.data);
        this.error = {};

        this.service
            .updateForStopProcess(this.data)
            .then(result => {
                // Refereshing list of history
            });
    }

    resume() {
        $("#Melanjutkan").modal('hide');
        console.log(this.data);
        this.error = {};

        this.service
            .updateForResumeProcess(this.data)
            .then(result => {
                // Refereshing list of history
            });
    }

    finish() {
        $("#Melanjutkan").modal('hide');
        console.log(this.data);
        this.error = {};

        this.service
            .updateForFinishProcess(this.data)
            .then(result => {
                // Refereshing list of history
            });
    }
}