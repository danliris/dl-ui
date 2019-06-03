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
        { header: "Tanggal", value: "DateOperation" },
        { header: "Waktu", value: "TimeOperation" },
        { header: "Operator", value: "BeamOperatorName" },
        { header: "Group", value: "BeamOperatorGroup" },
        { header: "Status", value: "OperationStatus" }
    ];

    async activate(params) {
        var Id = params.Id;
        var dataResult;

        this.data = await this.service.getById(Id)
            .then(result => {
                dataResult = result;
                return this.service.getUnitById(result.WeavingUnit);
            })
            .then(unit => {

                if (unit) {
                    dataResult.WeavingUnit = unit;
                }

                return dataResult;
            });

        if (this.data.LoomHistory.length > 0) {

            var result = this.remappingModels(this.data.LoomHistory);

            this.data.LoomHistory = result;
        }
    }

    remappingModels(data) {
        var result = data.map(item => {
            var DateOperation = moment(item.DateTimeOperation).format('DD/MM/YYYY');
            var TimeOperation = moment(item.DateTimeOperation).format('LT');

            item.DateOperation = DateOperation;
            item.TimeOperation = TimeOperation;

            return item;
        });

        return result;
    }

    start() {
        $("#Mulai").modal('hide');
        this.error = {};

        this.service
            .updateForStartProcess(this.data)
            .then(result => {

                this.data.LoomHistory = [];

                if (result.length > 0) {
                    result = this.remappingModels(result);
                }

                this.data.LoomHistory = result;
            });
    }

    stop() {
        $("#Berhenti").modal('hide');
        this.error = {};

        this.service
            .updateForStopProcess(this.data)
            .then(result => {

                this.data.LoomHistory = [];

                if (result.length > 0) {
                    result = this.remappingModels(result);
                }

                this.data.LoomHistory = result;
            });
    }

    resume() {
        $("#Melanjutkan").modal('hide');
        this.error = {};

        this.service
            .updateForResumeProcess(this.data)
            .then(result => {

                this.data.LoomHistory = [];

                if (result.length > 0) {
                    result = this.remappingModels(result);
                }

                this.data.LoomHistory = result;
            });
    }

    finish() {
        $("#Selesai").modal('hide');
        this.error = {};

        this.service
            .updateForFinishProcess(this.data)
            .then(result => {
                
                this.data.LoomHistory = [];

                if (result.length > 0) {
                    result = this.remappingModels(result);
                }

                this.data.LoomHistory = result;
            });
    }

    onBack(event) {
        this.router.navigateToRoute("list");
    }
}