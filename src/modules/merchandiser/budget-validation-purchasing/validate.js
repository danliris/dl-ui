import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { PurchaseRequestService } from './service';
import moment from 'moment';
import { AuthService } from "aurelia-authentication";

const costCalculationGarmentLoader = require('../../../loader/cost-calculation-garment-loader');

@inject(Router, Service, PurchaseRequestService, AuthService)
export class Validate {
    @bindable data = {};
    @bindable error = {};

    @bindable costCalculationGarment;
    @bindable validationType;
    @bindable buyer;
    @bindable article;

    options = {
        cancelText: "Clear",
        saveText: "Approve",
    };

    length = {
        label: {
            align: "right",
            length: 4
        }
    };

    columns = [
        { header: "No.", value: "No" },
        { header: "Seksi", value: "Section" },
        { header: "No. PO", value: "PO_SerialNumber" },
        { header: "Kode", value: "ProductCode" },
        { header: "Item Barang", value: "ProductName" },
        { header: "Deskripsi Barang", value: "Description" },
        { header: "Qty", value: "BudgetQuantityString" },
        { header: "Satuan", value: "UOMPriceUnit" },
        { header: "Shipment", value: "DeliveryDate" },
        { header: "Status", value: "Status" },
    ];

    get costCalculationGarmentLoader() {
        return costCalculationGarmentLoader;
    }

    get costCalculationGarmentUnpostedFilter() {
        return {
            IsApprovedMD: true,
            IsApprovedPurchasing: false,
        };
    }

    constructor(router, service, purchaseRequestService, authService) {
        this.router = router;
        this.service = service;
        this.purchaseRequestService = purchaseRequestService;
        this.data = {};
        this.error = {};

        if (authService.authenticated) {
            this.me = authService.getTokenPayload();
        }
        else {
            this.me = {};
        }
    }

    async costCalculationGarmentChanged(newValue) {
        if (newValue && newValue.Id) {
            this.data.CostCalculationGarment = await this.service.getCostCalculationGarmentById(newValue.Id);

            if (this.data.CostCalculationGarment && this.data.CostCalculationGarment.CostCalculationGarment_Materials) {

                // Ambil semua Products di GarmentPurchaseRequests untuk mengecek
                // Product di CostCalculation_Materials adalah MASTER (IsPRMaster) atau JOB ORDER
                let productsInPRMaster = [];
                if (this.data.CostCalculationGarment.PreSCId) {
                    const info = {
                        select: JSON.stringify({ Id: 1, PRNo: 1, SCId: 1, SCNo: 1, "Items.ProductId": 1, "Items.ProductCode": 1 }),
                        filter: JSON.stringify({ SCId: this.data.CostCalculationGarment.PreSCId, PRType: "MASTER" })
                    };
                    let purchaseRequest = await this.purchaseRequestService.getProducts(info);

                    if (purchaseRequest.data && purchaseRequest.data.length > 0) {
                        productsInPRMaster = purchaseRequest.data.reduce(
                            (acc, cur) => acc.concat(cur.Items.map(i => i.ProductCode))
                            , []);
                    }
                }

                this.buyer = `${this.data.CostCalculationGarment.BuyerBrand.Code} - ${this.data.CostCalculationGarment.BuyerBrand.Name}`;
                this.article = this.data.CostCalculationGarment.Article;

                this.data.CostCalculationGarment_Materials = this.data.CostCalculationGarment.CostCalculationGarment_Materials;

                let no = 0;
                this.data.CostCalculationGarment_Materials.map(material => {
                    material.No = ++no;
                    material.Section = this.data.CostCalculationGarment.Section;
                    material.ProductCode = material.Product.Code;
                    material.ProductName = material.Product.Name;
                    material.UOMPriceUnit = material.UOMPrice.Unit;
                    material.DeliveryDate = moment(this.data.CostCalculationGarment.DeliveryDate).format("DD MMM YYYY");
                    material.BudgetQuantityString = material.BudgetQuantity.toFixed(2);
                    material.IsPRMaster = productsInPRMaster.indexOf(material.ProductCode) > -1;
                    material.Status = material.IsPRMaster ? "MASTER" : "JOB ORDER";
                });
            }
        }
        else {
            this.clear();
        }
    }

    clear() {
        this.data = {};
        this.error = {};

        this.costCalculationGarmentVM.editorValue = "";
        this.costCalculationGarment = null;
        this.validationType = "";
        this.buyer = "";
        this.article = "";
    }

    cancelCallback(event) {
        this.clear();
    }

    saveCallback() {
        if (this.data.CostCalculationGarment) {
            if (confirm("Approve Budget?")) {
                const jsonPatch = [
                    { op: "replace", path: `/IsApprovedPurchasing`, value: true },
                    { op: "replace", path: `/ApprovedPurchasingBy`, value: this.me.username },
                    { op: "replace", path: `/ApprovedPurchasingDate`, value: new Date() }
                ];

                this.service.replace(this.data.CostCalculationGarment.Id, jsonPatch)
                    .then(result => {
                        alert("Berhasil Approve Budget");
                        this.clear();
                    })
                    .catch(e => {
                        if (e.statusCode === 500) {
                            this.error = JSON.parse(e.message);
                        } else {
                            this.error = e;
                        }
                    })
            }
        } else {
            this.error = { RONo: "No. RO harus diisi." };
        }
    }
}
