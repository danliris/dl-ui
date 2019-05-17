import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    context = ["Update"];
    columns = [
        {field: "DailyOperationNumber", title: "No Operasi Harian"},
        {
            field: "DateOperated",
            title: "Tanggal Produksi",
            formatter: function (value, data, index) {
                return moment(new Date(value)).format("DD MMM YYYY");
            }
        },
        { field: "OrderNumber", title: "No Order Produksi" },
        {
            field: "WeavingUnit",
            title: "Unit",
            valign: "top",
            formatter: function (value, data, index) {
                if (value) {
                    return value.Name;
                } else {
                    return "-";
                }
            }
        },
        { field: "DailyOperationStatus", title: "Status Produksi" }
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order
        }

        // Test data
        var testData = [{
            Id : "32323424242",
            DailyOperationNumber : "001/DOL/Weaving/09080",
            DateOperated : "12/5/2018",
            OrderNumber : "Test Number",
            WeavingUnit : {Name : "TestUnit"},
            DailyOperationStatus : "Processing"
        }];

        return this.service.search(arg).then(result => {
            if (result.data && result.data.length > 0) {
                let getUnitPromises = result.data.map(datum =>
                    this.service.getUnitById(datum.UnitId)
                );

                return Promise.all(getUnitPromises).then(units => {
                    for (var datum of result.data) {
                        if (units && units.length > 0) {
                            let unit = units.find(
                                unitResult => datum.WeavingUnit == unitResult.Id
                            );
                            datum.WeavingUnit = unit;
                        }
                    }

                    return {
                        total: result.info.total,
                        data: result.data
                    };
                });
            } else {
                console.log("wow");
                return {
                    total: result.info.total,
                    // data: result.data
                    data: testData
                };
            }
        });
    }

    contextCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Update":
                this.router.navigateToRoute("update", { Id: data.Id });
                break;
        }
    }

    create() {
        this.router.navigateToRoute("create");
    }
}