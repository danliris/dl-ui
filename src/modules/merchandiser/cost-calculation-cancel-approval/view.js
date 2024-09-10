import { inject, bindable, Lazy, BindingEngine } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import { Dialog } from "../../../au-components/dialog/dialog";
import numeral from "numeral";
numeral.defaultFormat("0,0.00");
const US = "US$. ";
const RP = "Rp. ";
import { AuthService } from "aurelia-authentication";
import moment from 'moment';
import { AlertView } from './custom-dialog-view/alert-view';

@inject(BindingEngine,Router, Service, Dialog, AuthService)
export class View {
    @bindable type;
    readOnly = true;
    length4 = {
        label: {
            align: "left",
            length: 4
        }
    };
    length6 = {
        label: {
            align: "left",
            length: 6
        }
    };
    length7 = {
        label: {
            align: "left",
            length: 7
        }
    };

    formOptions = {
        cancelText: "Kembali",
        deleteText: "Cancel Approval"
    };

    costCalculationGarment_MaterialsInfo = {
        columns: [
            { header: "No", value: "MaterialIndex" },
            { header: "Kategori", value: "Category" },
            { header: "Kode Barang", value: "Product.code" },
            { header: "Komposisi", value: "Product.composition" },
            { header: "Konstruksi", value: "Product.const" },
            { header: "Yarn", value: "Product.yarn" },
            { header: "Width", value: "Product.width" },
            { header: "Deskripsi", value: "Description" },
            { header: "Detail Barang", value: "ProductRemark" },
            { header: "Kuantitas", value: "Quantity" },
            { header: "Harga Per Satuan (Rp)", value: "PricePerUnit" },
            { header: "Total (Rp)", value: "Total" }
        ]
    };

    priceInfo = {
        columns: [
            { header: "FOB Price", value: "FOB_Price" },
            { header: "CMT Price", value: "CMT_Price" },
            { header: "CNF Price", value: "CNF_Price" },
            { header: "CIF Price", value: "CIF_Price" }
        ]
    };

    activeTab = 0;

    approval = {
        columns: [
            { header: "No.", value: "No" },
            { header: "Seksi", value: "Section" },
            { header: "No. PO", value: "PO_SerialNumber" },
            { header: "Kode", value: "ProductCode" },
            { header: "Item Barang", value: "ProductName" },
            { header: "Deskripsi Barang", value: "Description" },
            { header: "Qty", value: "BudgetQuantityString" },
            { header: "Satuan", value: "UOMPriceUnit" },
            { header: "Harga Satuan", value: "Price" },
            { header: "Shipment", value: "DeliveryDate" },
            { header: "Status", value: "Status" },
        ],
        data: {},
        error: {}
    }

    constructor(bindingEngine,router, service, dialog, authService) {
        this.bindingEngine=bindingEngine;
        this.router = router;
        this.service = service;
        this.dialog = dialog;
        this.authService = authService;
    }

    get isDollar() {
        return this.data.Rate.Value !== 1;
    }

    async activate(params, routeConfig, navigationInstruction) {
        const instruction = navigationInstruction.getAllInstructions()[0];
        const parentInstruction = instruction.parentInstruction;
        this.title = parentInstruction.config.title;
        const type = parentInstruction.config.settings.type;

        switch (type) {
            case "PPIC":
                this.type = "PPIC";
                break;
            case "md":
                this.type = "MD";
                break;
            case "ie":
                this.type = "IE";
                break;
            case "kadivmd":
                this.type = "KadivMD";
                break;
            default: break;
        }
        console.log(this.type)
        if (this.authService.authenticated) {
            this.me = this.authService.getTokenPayload();
        }
        else {
            this.me = null;
        }

        var id = params.id;

        if (this.type !== "KadivMD" && this.type !== "PPIC" && this.type !== "IE") {
            this.data = await this.service.getById(id);
        } else {
            this.data = await this.service.getByIdWithProductNames(id);

            this.approval.data = Object.assign({}, this.data);

            this.approval.data.CostCalculationGarment_Materials = this.data.CostCalculationGarment_Materials.filter(mtr => {
                // let processOrNot = mtr.Category.name.toUpperCase() !== "PROCESS";
                return true
                    && mtr.IsPosted !== true
                    // && processOrNot
            });

            let no = 0;
            this.approval.data.CostCalculationGarment_Materials.map(material => {
                material.No = ++no;
                material.Section = this.data.Section;
                material.ProductCode = material.Product.Code;
                material.ProductName = material.Product.Name;
                material.UOMPriceUnit = material.UOMPrice.Unit;
                material.DeliveryDate = moment(this.data.DeliveryDate).format("DD MMM YYYY");
                material.BudgetQuantityString = material.BudgetQuantity.toFixed(2);
                material.IsPRMaster = material.PRMasterId > 0;
                material.Status = material.IsPRMaster ? "MASTER" : "JOB ORDER";
            });
        }

        this.data.FabricAllowance = numeral(this.data.FabricAllowance).format();
        this.data.AccessoriesAllowance = numeral(
            this.data.AccessoriesAllowance
        ).format();
        let total = 0;
        if (this.data.CostCalculationGarment_Materials) {
            this.data.CostCalculationGarment_Materials.forEach(item => {
                total += Number(item.Total);
            });
        }
        //total += this.data.ProductionCost;
        this.data.Total = total;
        var _confirmPrice = this.data.ConfirmPrice;
        var _insurance = this.data.Insurance;
        const _freight = this.data.Freight;
        this.data.AfterOTL1 = this.data.Total + this.data.OTL1.CalculatedValue;
        this.data.AfterOTL2 = this.data.AfterOTL1 + this.data.OTL2.CalculatedValue;
        this.data.AfterRisk = (100 + this.data.Risk) * this.data.AfterOTL2 / 100;
        this.data.AfterFreightCost = this.data.AfterRisk + this.data.FreightCost;
        this.data.ConfirmPriceWithRate =
            this.data.ConfirmPrice * this.data.Rate.Value;
        this.data.ConfirmPriceWithRate = this.data.ConfirmPriceWithRate.toLocaleString('en-EN', { minimumFractionDigits: 2 });
        let CM_Price = 0;
        if (this.data.CostCalculationGarment_Materials) {
            this.data.CostCalculationGarment_Materials.forEach(item => {
                CM_Price += Number(item.CM_Price);
            });
        }

        let FOB_Price = this.data.ConfirmPrice;
        let CNF_Price = _confirmPrice;
        let CIF_Price = _confirmPrice;
        if (this.data.Freight == 0) {
            CNF_Price = 0;
        }
        if (this.data.Insurance == 0) {
            CIF_Price = 0;
        }
        if (CM_Price > 0) {
            FOB_Price = 0;
        }
        this.data.ConfirmPrice = this.isDollar
            ? US + this.data.ConfirmPrice.toLocaleString('en-EN', { minimumFractionDigits: 2 })//numeral(this.data.ConfirmPrice).format()
            : RP + this.data.ConfirmPrice.toLocaleString('en-EN', { minimumFractionDigits: 2 });
        this.data.FOB_Price = this.isDollar
            ? US + numeral(FOB_Price).format()
            : RP + numeral(FOB_Price).format();
        this.data.CMT_Price =
            CM_Price > 0 ? this.data.ConfirmPrice : numeral(0).format();
        this.data.CNF_Price = this.isDollar
            ? US + numeral((CNF_Price + this.data.Freight)).format()
            : RP + numeral(0).format();
        this.data.CIF_Price = this.isDollar
            ? US + numeral(CIF_Price + _insurance).format()
            : RP + numeral(0).format();
        this.data.priceInfo = [
            {
                FOB_Price: this.data.FOB_Price,
                CMT_Price: this.data.CMT_Price,
                CNF_Price: this.data.CNF_Price,
                CIF_Price: this.data.CIF_Price
            }
        ];

        this.data.Freight = this.isDollar
            ? US + numeral(this.data.Freight).format()
            : RP + numeral(this.data.Freight).format();
        this.data.Insurance = this.isDollar
            ? US + numeral(this.data.Insurance).format()
            : RP + numeral(this.data.Insurance).format();
        this.data.SMV_Cutting = numeral(this.data.SMV_Cutting).format();
        this.data.SMV_Sewing = numeral(this.data.SMV_Sewing).format();
        this.data.SMV_Finishing = numeral(this.data.SMV_Finishing).format();
        this.data.SMV_Total = numeral(this.data.SMV_Total).format();

        this.data.LeadTime = `${this.data.LeadTime} hari`
        this.data.ConfirmPrice = (this.data.ConfirmPrice.toLocaleString('en-EN', { minimumFractionDigits: 2 }));

        this.deleteCallback = this.reject;
        if (this.activeTab === 1 && this.type === "KadivMD") {
            this.deleteCallback = null;
        }
        else if(this.activeTab === 0 && (this.type === "PPIC" || this.type === "IE")){
            this.deleteCallback = null;
        }

        this.hasFOBRemark = this.data.CostCalculationGarment_Materials.some(m => m.isFabricCM);
    
        if (this.hasFOBRemark) {
            const a = (1.05 * CM_Price / this.data.Rate.Value) - (_insurance + _freight);
            this.fobRemark = this.isDollar
            ? US +`${(_confirmPrice + a).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`:
              RP +`${(_confirmPrice + a).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        } else {
            this.fobRemark = "-";
        }
    
    }

    async bind(context) {
        this.context = context;
    }

    list() {
        this.router.navigateToRoute("list");
    }

    cancelCallback(event) {
        this.list();
    }

    reject(event) {
        this.dialog.show(AlertView,this.data)
        .then(response => {
            this.data.DeletedRemark = response.output.DeletedRemark;

            this.service.cancel_approval(this.data.Id,this.data)
                .then(result => {
                    alert("Cost Calculation berhasil di cancel");
                    this.list();
            })
            .catch(e => {
                if (e.statusCode === 500) {
                    alert("Gagal menyimpan, silakan coba lagi!");
                    this.error = JSON.parse(e.message);
                } else {
                    this.error = e;
                }
            });
        });


         
        
    }

    changeRole(tab) {
        this.activeTab = tab;
        this.deleteCallback = this.reject;
        if (tab === 1 && this.type === "KadivMD" ) {
            this.deleteCallback = null;
        }
      
    }
}
