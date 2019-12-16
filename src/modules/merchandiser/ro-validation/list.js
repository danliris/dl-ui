import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import { AuthService } from "aurelia-authentication";

import moment from 'moment';
@inject(Router, Service, AuthService)
export class List {
    context = ["Rincian"];
    columns = [
        { field: "CostCalculationGarment.RO_Number", title: "No RO"},
        { field: "CostCalculationGarment.Article", title: "Artikel" },
        { field: "CostCalculationGarment.UnitName", title: "Unit"},
        { field: "Total", title: "Kuantitas RO"}
    ];

    loader = (info) => {
        let order = {};
        if (info.sort) {
          order[info.sort] = info.order;
        }

        let arg = {
          page: parseInt(info.offset / info.limit, 10) + 1,
          size: info.limit,
          keyword: info.search,
          // select: ["PRNo", "RONo", "ShipmentDate", "Buyer.Name", "Unit.Name", "IsPosted"],
          order: order,
          filter: JSON.stringify(this.filter)
        }

        return this.service.search(arg)
        .then(result => {
            // result.data.forEach(data => {
            // data.BuyerCode = data.Buyer.Code;
            // data.BuyerName = data.Buyer.Name;
            // });
            return {
            total: result.info.total,
            data: result.data
            }
        });
    }

    constructor(router, service, authService) {
        this.service = service;
        this.router = router;
        this.authService = authService;
    }

    activate(params, routeConfig, navigationInstruction) {
        const instruction = navigationInstruction.getAllInstructions()[0];
        const parentInstruction = instruction.parentInstruction;
        this.title = parentInstruction.config.title;
        const type = parentInstruction.config.settings.type;

        switch (type) {
            case "kabagmd":
                this.filter = {
                    "RO_Garment_SizeBreakdowns.Any(RO_GarmentId != null)": true,
                    "CostCalculationGarment.IsValidatedROMD": false,
                    "CostCalculationGarment.IsValidatedROSample": false,
                    "IsPosted": true
                };
                break;
            case "sample":
                this.filter = {
                    "RO_Garment_SizeBreakdowns.Any(RO_GarmentId != null)": true,
                    "CostCalculationGarment.IsValidatedROMD": true,
                    "CostCalculationGarment.IsValidatedROSample": false,
                    "IsPosted": true
                };
                break;
            default:
                break;
        }
    }

    contextCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }
}