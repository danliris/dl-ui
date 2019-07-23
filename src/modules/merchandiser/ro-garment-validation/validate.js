import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';

const costCalculationGarmentLoader = require('../../../loader/cost-calculation-garment-loader');
const buyerLoader = require('../../../loader/buyers-loader');

@inject(Router, Service)
export class Create {
    @bindable data = {};
    @bindable error = {};

    @bindable costCalculationGarment;
    @bindable validationType;
    @bindable buyer;
    @bindable article;

    options = {
        cancelText: "Clear",
        saveText: "Process",
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
    ];

    get costCalculationGarmentLoader() {
        return costCalculationGarmentLoader;
    }

    get buyerLoader() {
        return buyerLoader;
    }

    get costCalculationGarmentUnpostedFilter() {
        return { "CostCalculationGarment_Materials.Any(IsPosted == false) && SCGarmentId > 0 && IsValidatedROSample == true && IsValidatedROPPIC == false": true };
    }

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
        this.error = {};
    }

    async costCalculationGarmentChanged(newValue) {
        if (newValue && newValue.Id) {
            this.data.CostCalculationGarment = await this.service.getCostCalculationGarmentById(newValue.Id);

            if (this.data.CostCalculationGarment && this.data.CostCalculationGarment.CostCalculationGarment_Materials) {
                this.buyer = `${this.data.CostCalculationGarment.BuyerBrand.Code} - ${this.data.CostCalculationGarment.BuyerBrand.Name}`;
                this.article = this.data.CostCalculationGarment.Article;

                let isAnyPostedMaterials = this.data.CostCalculationGarment.CostCalculationGarment_Materials.reduce((acc, cur) => {
                    return acc || cur.IsPosted || false;
                }, false);

                this.validationType = (isAnyPostedMaterials === true) ? "Process" : "Non Process";

                this.data.CostCalculationGarment_Materials = this.data.CostCalculationGarment.CostCalculationGarment_Materials.filter(mtr => {
                    let processOrNot = (isAnyPostedMaterials === true) ? (mtr.Category.name.toUpperCase() === "PROCESS") : (mtr.Category.name.toUpperCase() !== "PROCESS");
                    return true
                        && mtr.IsPosted !== true
                        // && mtr.Category.Name.toUpperCase() !== "PROCESS"
                        // && mtr.Category.Name.toUpperCase() === "PROCESS"
                        && processOrNot
                });

                let no = 0;
                this.data.CostCalculationGarment_Materials.map(material => {
                    material.No = ++no;
                    material.Section = this.data.CostCalculationGarment.Section;
                    material.ProductCode = material.Product.Code;
                    material.ProductName = material.Product.Name;
                    material.UOMPriceUnit = material.UOMPrice.Unit;
                    material.DeliveryDate = moment(this.data.CostCalculationGarment.DeliveryDate).format("DD MMM YYYY");
                    material.BudgetQuantityString = material.BudgetQuantity.toFixed(2);
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
            var sentData = this.data.CostCalculationGarment || {};
            sentData.CostCalculationGarment_Materials = this.data.CostCalculationGarment_Materials;
            this.service.create(sentData)
                .then(result => {
                    alert("Berhasil Validasi RO Garment");
                    this.clear();
                })
                .catch(e => {
                    if (e.statusCode === 500) {
                        this.error = JSON.parse(e.message);
                    } else {
                        this.error = e;
                    }
                });
        } else {
            this.error = { RONo: "No. RO harus diisi." };
        }
    }
}
