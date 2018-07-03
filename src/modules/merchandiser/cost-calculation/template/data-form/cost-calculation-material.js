import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Dialog } from '../../../../../components/dialog/dialog';
import numeral from 'numeral';
numeral.defaultFormat("0,0.00");
const GarmentProductLoader = require('../../../../../loader/garment-product-loader');
const GarmentCategoryLoader = require('../../../../../loader/garment-category-loader');
import { Service } from '../../service';
import { ServiceCore } from '../../service-core';

const rateNumberFormat = "0,0.000";

// const materialLoader = require('../../../../../loader/material-md-loader');
const UomLoader = require('../../../../../loader/uom-loader');

@inject(Dialog, Service, ServiceCore)
export class CostCalculationMaterial {

    controlOptions = {
        control: {
            length: 12
        }
    };

    constructor(dialog, service, serviceCore) {
        this.dialog = dialog;
        this.service = service;
        this.serviceCore = serviceCore
    }

    @bindable isProcess = false;
    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = this.options.readOnly || false;
        this.disabled = true;
        this.data.showDialog = this.data.showDialog === undefined ? (this.data.Category === undefined ? true : false) : (this.data.showDialog === true ? true : false);
        this.data.isFabricCM = this.data.isFabricCM ? this.data.isFabricCM : false;

        if (this.data.Category) {
            this.selectedCategory = this.data.Category;
            this.categoryIsExist = this.data.Category.name.toUpperCase() == "FABRIC" ? true : false;

            if (this.data.Category.name.toUpperCase() == 'PROCESS') {
                this.isProcess = true;
                this.data.Price = this.data.Price || this.calculateProcessPrice();
            }
        }

        if (this.data.Product) {
            if (this.data.Product.code) {
                this.productCode = this.data.Product.code;
                this.productCodeIsExist = true;
            }
            if (this.data.Product.composition) {
                this.data.Product.description = this.data.Product.composition;
                this.compositionIsExist = true;
                this.selectedComposition = Object.assign({}, this.data.Product);
            }

            this.data.Product.properties = [];
            if (this.data.Product.construction) {
                this.data.Product.properties.push(this.data.Product.construction);
                this.constructionIsExist = true;
                this.selectedConstruction = Object.assign({}, this.data.Product);
            }

            if (this.data.Product.yarn) {
                this.data.Product.properties.push(this.data.Product.yarn);
                this.yarnIsExist = true;
                this.selectedYarn = Object.assign({}, this.data.Product);
            }

            if (this.data.Product.width) {
                this.data.Product.properties.push(this.data.Product.width);
                this.selectedWidth = Object.assign({}, this.data.Product);
            }
        }
    }

    bind() {

    }

    // @bindable productCode = "Test";
    @bindable selectedCategory;
    @bindable categoryIsExist = false;
    async selectedCategoryChanged(newVal, oldVal) {
        this.data.Category = newVal;
        if (newVal) {
            this.selectedComposition = null;
            this.data.Desription = "";
            this.data.Quantity = 0;
            this.data.UOMQuantity = null;
            this.data.Price = 0;
            this.data.UOMPrice = null;
            this.data.Conversion = 0;
            this.data.ShippingFeePortion = 0;

            // this.productCode = "Change";
            if (this.data.Category.name.toUpperCase() === "FABRIC") {
                this.categoryIsExist = true;
                this.dialog.prompt("Apakah fabric ini menggunakan harga CMT?", "Detail Fabric Material")
                    .then(response => {
                        if (response == "ok") {
                            this.data.isFabricCM = true;
                        }
                        this.data.showDialog = false;
                    });
            } else if (this.data.Category.name.toUpperCase() === "PROCESS") {
                this.data.Product = await this.serviceCore.getByName(newVal.name);
                let UOM = await this.serviceCore.getUomByUnit("PCS");

                this.data.UOMQuantity = UOM;
                this.data.UOMPrice = UOM;

                this.isProcess = true;
                this.data.Quantity = 1;
                this.data.Conversion = 1;

                this.categoryIsExist = false;

                this.productCode = this.data.Product ? this.data.Product.code : "";

                this.data.Price = this.calculateProcessPrice();

            } else {
                this.categoryIsExist = false;
                this.data.Product = await this.serviceCore.getByName(newVal.name);
                this.productCode = this.data.Product ? this.data.Product.code : "";
            }
        } else if (!newVal) {
            this.selectedComposition = null;
            this.categoryIsExist = false;
        }
    }

    calculateProcessPrice() {

        let CuttingFee = this.data.Wage.Value * this.data.SMV_Cutting * (100 / 75);
        let SewingFee = this.data.Wage.Value * this.data.SMV_Sewing * (100 / this.data.Efficiency.Value);
        let FinishingFee = this.data.Wage.Value * this.data.SMV_Finishing * (100 / 90);
        let THR = this.data.THR.Value * this.data.SMV_Total;

        let result = CuttingFee + SewingFee + FinishingFee + THR;

        return numeral(numeral(result).format(rateNumberFormat)).value();

    }

    @bindable selectedComposition;
    filterProductQuery = {};
    compositionIsExist = false;
    selectedCompositionChanged(newVal, oldVal) {
        if (newVal) {
            this.selectedConstruction = null;
            this.compositionIsExist = true;

            this.filterProductQuery.description = newVal.description
        } else if (!newVal) {
            this.selectedConstruction = null;
            this.compositionIsExist = false;
        }
    }

    @bindable selectedConstruction;
    constructionIsExist = false;
    selectedConstructionChanged(newVal, oldVal) {
        if (newVal) {
            // this.data
            this.selectedYarn = null;
            this.constructionIsExist = true;
            this.filterProductQuery.properties = { "$elemMatch": { "$in": [newVal.properties[0]] } };
        } else if (!newVal) {
            this.selectedYarn = null;
            this.constructionIsExist = false;
        }
    }

    @bindable selectedYarn;
    yarnIsExist = false;
    selectedYarnChanged(newVal, oldVal) {
        if (newVal) {
            this.yarnIsExist = true;
            this.selectedWidth = null;
            this.filterProductQuery.properties["$elemMatch"]["$in"].push(newVal.properties[1]);
        } else if (!newVal) {
            this.selectedWidth = null;
            this.yarnIsExist = false;
        }
    }

    @bindable productCode = "";
    productCodeIsExist = false;
    productCodeChanged(newVal, oldVal) {
        if (newVal) {
            this.productCodeIsExist = true;
        } else {
            this.productCodeIsExist = false;
        }
    }

    @bindable selectedWidth;
    selectedWidthChanged(newVal, oldVal) {
        this.data.Product = newVal;
        if (newVal) {
            // this.
            this.productCode = newVal.code;
            this.data.Product.width = newVal.properties[2];
            this.filterProductQuery.properties["$elemMatch"]["$in"].push(newVal.properties[2]);

            if (this.selectedComposition.description) {
                this.data.Product.composition = this.selectedComposition.description;
            }

            if (this.selectedConstruction.properties.length > 0) {
                this.data.Product.construction = this.selectedConstruction.properties[0];
                this.data.Product.yarn = this.selectedYarn.properties[1];
                this.data.Product.width = this.selectedWidth.properties[2];
            }
        } else if (!newVal) {
            this.productCode = "";
            this.data.Product = null;
        }
    }

    get garmentCategoryLoader() {
        return GarmentCategoryLoader;
    }

    getWidthText = (product) => {
        return product ? `${product.properties[2]}` : '';
    }

    getYarnText = (product) => {
        return product ? `${product.properties[1]}` : '';
    }

    getConstructionText = (product) => {
        return product ? `${product.properties[0]}` : '';
    }

    async getGarmentByFilter() {
        return await this.garmentProductLoader('', this.filterProductQuery);
    }

    get garmentProductLoader() {
        return (keyword) => {
            var filter = "";

            if (this.selectedCategory && this.selectedCategory.name) {
                if (this.selectedComposition && this.selectedComposition.description) {
                    if (this.selectedConstruction && this.selectedConstruction.properties && this.selectedConstruction.properties.length > 0) {
                        if (this.selectedYarn && this.selectedYarn.properties && this.selectedYarn.properties.length > 0) {
                            filter = JSON.stringify({ "name": this.selectedCategory.name, "description": this.selectedComposition.description, "properties.0": this.selectedConstruction.properties[0], "properties.1": this.selectedYarn.properties[1] });
                        } else {
                            filter = JSON.stringify({ "name": this.selectedCategory.name, "description": this.selectedComposition.description, "properties.0": this.selectedConstruction.properties[0] });
                        }
                    } else {
                        filter = JSON.stringify({ "name": this.selectedCategory.name, "description": this.selectedComposition.description });
                    }
                } else {
                    if (this.selectedCategory.name.toUpperCase() == 'FABRIC') {
                        filter = JSON.stringify({ "name": this.selectedCategory.name })
                    }
                }
            }

            return this.service.getGarmentProducts(keyword, filter)
                .then((result) => {
                    return result;
                });
        }
    }

    get garmentProductDistinctDescriptionLoader() {
        return (keyword) => {
            var filter = "";

            if (this.selectedCategory && this.selectedCategory.name) {
                if (this.selectedComposition && this.selectedComposition.description) {
                    if (this.selectedConstruction && this.selectedConstruction.properties && this.selectedConstruction.properties.length > 0) {
                        if (this.selectedYarn && this.selectedYarn.properties && this.selectedYarn.properties.length > 0) {
                            filter = JSON.stringify({ "name": this.selectedCategory.name, "description": this.selectedComposition.description, "properties.0": this.selectedConstruction.properties[0], "properties.1": this.selectedYarn.properties[1] });
                        } else {
                            filter = JSON.stringify({ "name": this.selectedCategory.name, "description": this.selectedComposition.description, "properties.0": this.selectedConstruction.properties[0] });
                        }
                    } else {
                        filter = JSON.stringify({ "name": this.selectedCategory.name, "description": this.selectedComposition.description });
                    }
                } else {
                    if (this.selectedCategory.name.toUpperCase() == 'FABRIC') {
                        filter = JSON.stringify({ "name": this.selectedCategory.name })
                    }
                }
            }

            return this.service.getGarmentProductsDistinctDescription(keyword, filter)
                .then((result) => {
                    return result;
                });
        }
    }

    get uomLoader() {
        return UomLoader;
    }

    @computedFrom('data.Quantity', 'data.Price', 'data.Conversion', 'data.isFabricCM')
    get total() {
        let total = this.data.Quantity && this.data.Conversion && this.data.Price ? this.data.Price / this.data.Conversion * this.data.Quantity : 0;
        total = numeral(total).format();
        if (this.data.isFabricCM) {
            this.data.Total = 0;
            this.data.TotalTemp = numeral(total).value();
            this.data.CM_Price = numeral(total).value();
        }
        else {
            this.data.Total = numeral(total).value();
            this.data.TotalTemp = numeral(total).value();
            this.data.CM_Price = null;
        }
        return total;
    }

    @computedFrom('data.ShippingFeePortion', 'data.TotalTemp')
    get totalShippingFee() {
        let totalShippingFee = numeral(this.data.ShippingFeePortion / 100 * this.data.TotalTemp).format();
        this.data.TotalShippingFee = numeral(totalShippingFee).value();
        return totalShippingFee;
    }

    @computedFrom('data.Category', 'data.Quantity', 'data.Conversion', 'data.QuantityOrder', 'data.FabricAllowance', 'data.AccessoriesAllowance')
    get budgetQuantity() {
        let allowance = 0;
        if (this.data.Category) {
            if (this.data.Category.name.toUpperCase() === "FABRIC") {
                allowance = this.data.FabricAllowance / 100;
            } else {
                allowance = this.data.AccessoriesAllowance / 100;
            }
        }
        let budgetQuantity = this.data.Quantity && this.data.Conversion ? this.data.Quantity * this.data.QuantityOrder / this.data.Conversion + allowance * this.data.Quantity * this.data.QuantityOrder / this.data.Conversion : 0;
        budgetQuantity = numeral(budgetQuantity).format();
        this.data.BudgetQuantity = numeral(budgetQuantity).value();
        return budgetQuantity;
    }
}
