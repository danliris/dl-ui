import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
var SectionLoader = require('../../../../loader/garment-sections-loader');

@inject(Router, Service)
export class List {
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }
   
    section=null;    
    dateFrom = null;
    dateTo = null;
      
    get sectionLoader() {
        return SectionLoader;
    }

    sectionView = (section) => { 
        return `${section.Code}`
    }

    sectionChanged(newValue){
        var selectedSection = newValue;
        if(selectedSection){
            this.data.SectionCodee = selectedSection.Code;
        }
    }

    activate() {
       
    }
    async searching() {
        var info = {
            dateFrom : this.dateFrom,
            dateTo : this.dateTo,
        }
        if (this.section) {
           info.section = this.section.Code
        }


        var result = await this.service.searchNew(JSON.stringify(info));
        this.old = result.Old;
        this.new = result.New;
        this.ViewDataTable(result);
        
    }
    ViewDataTable(info) {
        
        this.resultNew = info ? info.New : [];
        this.result = info ? info.Old : [];
        this.data = this.result;
                
        this.grandTotalByUom = [];
        this.grandTotal = 0;
        this.grandTotalGrossProfit = 0;
        this.grandTotalPremi = 0;

        var dataBySection = {};
        var subTotalAmount = {};
        var subTotalProfitIDR = {};
        var subTotalGrossProfit = {};
        var subTotalProfitUSD = {};   
        var subTotalQuantity = {};  
        var subTotalPremi = {};
        for (var data of this.result) {
                       var SECTION = data.Section;
                        if (!dataBySection[SECTION]) dataBySection[SECTION] = [];                 
                            dataBySection[SECTION].push({            
                            RO_Number : data.RO_Number,
                            Section : data.Section,
                            UnitName : data.UnitName,
                            BuyerCode : data.BuyerCode,
                            BuyerName : data.BuyerName,
                            BrandCode : data.BrandCode,
                            BrandName : data.BrandName,
                            Article : data.Article,
                            Comodity : data.Comodity,
                            ProductCategory : data.ProductCategory,
                            ComodityDescription : data.ComodityDescription,
                            FabAllow : data.FabAllow,
                            AccAllow : data.AccAllow,
                            DeliveryDate : moment(data.DeliveryDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.DeliveryDate).format("DD MMM YYYY"),                          
                            Profit : data.Profit.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),              
                            ProfitIDR : data.ProfitIDR.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),                                 
                            ProfitUSD : data.ProfitUSD.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),                                 
                            ProfitFOB : data.ProfitFOB.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),                                 
                            Commision : data.Commision,
                            Quantity : data.Quantity.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),              
                            UOMUnit : data.UOMUnit,
                            CurrencyRate : data.CurrencyRate.toLocaleString('en-EN',{minimumFractionDigits: 0, maximumFractionDigits: 4}),
                            ConfirmPrice : data.ConfirmPrice.toLocaleString('en-EN',{minimumFractionDigits: 4, maximumFractionDigits: 4}),
                            CMPrice : data.CMPrice.toLocaleString('en-EN',{minimumFractionDigits: 4, maximumFractionDigits: 4}),
                            FOBPrice : data.FOBPrice.toLocaleString('en-EN',{minimumFractionDigits: 4, maximumFractionDigits: 4}),
                            Amount : data.Amount.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2}),
                            GrossProfit : data.GrossProfit.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2}),
                            Premi : data.Premi.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2}),
                            Total: data.Total.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2}),
                            OTL1: data.OTL1.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2}),
                            OTL2: data.OTL2.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2}),
                            PersenRisk: data.PersenRisk.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2}),
                            FreightCost: data.FreightCost.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2}),
                            SubTotal: data.SubTotal.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2}),
                         });
                    
                        
                if (!subTotalAmount[SECTION]) {
                   subTotalAmount[SECTION] = 0;
                   } 
                   subTotalAmount[SECTION] += data.Amount;

                if (!subTotalProfitIDR[SECTION]) {
                    subTotalProfitIDR[SECTION] = 0;
                   } 
                   subTotalProfitIDR[SECTION] += data.ProfitIDR;
                if (!subTotalProfitUSD[SECTION]) {
                    subTotalProfitUSD[SECTION] = 0;
                    } 
                    subTotalProfitUSD[SECTION] += data.ProfitUSD
                if (!subTotalQuantity[SECTION]) {
                    subTotalQuantity[SECTION] = 0;
                    } 
                    subTotalQuantity[SECTION] += data.Quantity
                if (!subTotalGrossProfit[SECTION]) {
                    subTotalGrossProfit[SECTION] = 0;
                    } 
                    subTotalGrossProfit[SECTION] += data.GrossProfit
                if (!subTotalPremi[SECTION]) {
                    subTotalPremi[SECTION] = 0;
                    } 
                    subTotalPremi[SECTION] += data.Premi
        }
        for (var data of this.result) {
                        const uomIndex = this.grandTotalByUom.findIndex(uom => uom.uom == data.UOMUnit);
                        if (uomIndex > -1) {
                            this.grandTotalByUom[uomIndex].quantity += data.Quantity;
                            this.grandTotalByUom[uomIndex].amount += data.Amount;
                            this.grandTotalByUom[uomIndex].grossProfit += data.GrossProfit;
                            this.grandTotalByUom[uomIndex].premi += data.Premi;
                            this.grandTotalByUom[uomIndex].profitIDR += data.ProfitIDR;
                            this.grandTotalByUom[uomIndex].profitUSD += data.ProfitUSD;
                        } else {
                            this.grandTotalByUom.push({
                                uom: data.UOMUnit,
                                quantity: data.Quantity,
                                amount: data.Amount,
                                grossProfit: data.GrossProfit,
                                premi: data.Premi,
                                profitUSD: data.ProfitUSD,
                                profitIDR: data.ProfitIDR
                            });
                        }
                this.grandTotal += data.Amount;
                this.grandTotalGrossProfit += data.GrossProfit;
                this.grandTotalPremi += data.Premi;
                this.grandTotalProfitIDR += data.ProfitIDR;
                this.grandTotalProfitUSD += data.ProfitUSD;
        }
        this.grandTotalGrossProfitFormatted =
            this.grandTotalGrossProfit.toLocaleString('en-EN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        this.grandTotalPremiFormatted =
            this.grandTotalPremi.toLocaleString('en-EN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        //
        this.grandTotalProfitIDRFormatted =
            this.grandTotalProfitIDR.toLocaleString('en-EN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        this.grandTotalProfitUSDFormatted =
            this.grandTotalProfitUSD.toLocaleString('en-EN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            
        var Sections = [];
        this.GrandTotalAmount = 0;
        this.GrandTotalProfitIDR = 0;
        this.GrandTotalGrossProfit = 0;
        this.GrandTotalProfitUSD = 0;   
        this.GrandTotalQuantity = 0;
        this.GrandTotalPremi = 0;   
        for (var data in dataBySection) {
            Sections.push({
                data: dataBySection[data],
                SECTION: dataBySection[data][0].Section,
                subTotalAmount: (subTotalAmount[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                subTotalProfitIDR: (subTotalProfitIDR[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                subTotalGrossProfit: (subTotalGrossProfit[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                subTotalProfitUSD: (subTotalProfitUSD[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),                   
                subTotalQuantity: (subTotalQuantity[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                subTotalPremi: (subTotalPremi[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            });
            this.GrandTotalAmount += subTotalAmount[data];                                     
            this.GrandTotalProfitIDR += subTotalProfitIDR[data];                                     
            this.GrandTotalGrossProfit += subTotalGrossProfit[data];                                     
            this.GrandTotalProfitUSD += subTotalProfitUSD[data];   
            this.GrandTotalQuantity += subTotalQuantity[data]; 
            this.GrandTotalPremi += subTotalPremi[data];                                     
        }
        this.GrandTotalAmount = this.GrandTotalAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.GrandTotalProfitIDR = this.GrandTotalProfitIDR.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.GrandTotalGrossProfit = this.GrandTotalGrossProfit.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.GrandTotalProfitUSD = this.GrandTotalProfitUSD.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.GrandTotalQuantity = this.GrandTotalQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.GrandTotalPremi = this.GrandTotalPremi.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.Sections = Sections;
        
        // CC New
        this.dataCCNew = this.resultNew || [];
        this.dataBySectionNew = {};

        this.SubTotalQtyOrderNew = {};
        this.SubTotalAmountNew = {};
        this.SubTotalAmountIDRNew = {};
        this.SubTotalGrossProfitIDRNew = {};
        this.SubTotalGPPremiIDRNew = {};
        this.SubTotalNettProfitIDRNew = {};

        this.AmountTotalNew = 0;
        this.AmountTotalIDRNew = 0;
        this.AmountTotalGrossProfitIDRNew = 0;
        this.AmountTotalGPPremiIDRNew = 0;
        this.AmountTotalNettProfitIDRNew = 0;
        this.AmountTotalQtyOrderNew = 0;

        // Helper untuk menghindari nilai null / undefined
        var getNumberNew = function (value) {
            var number = Number(value);
            return isNaN(number) ? 0 : number;
        };
            
        // Group data berdasarkan MarketingName dan hitung subtotal
        for (var i = 0; i < this.dataCCNew.length; i++) {
            var dataNew = this.dataCCNew[i];
            var SECTION_NEW = dataNew.Section || "-";

            if (!this.dataBySectionNew[SECTION_NEW]) {
                this.dataBySectionNew[SECTION_NEW] = [];

                this.SubTotalQtyOrderNew[SECTION_NEW] = 0;
                this.SubTotalAmountNew[SECTION_NEW] = 0;
                this.SubTotalAmountIDRNew[SECTION_NEW] = 0;
                this.SubTotalGrossProfitIDRNew[SECTION_NEW] = 0;
                this.SubTotalGPPremiIDRNew[SECTION_NEW] = 0;
                this.SubTotalNettProfitIDRNew[SECTION_NEW] = 0;
            }
            
            this.dataBySectionNew[SECTION_NEW].push({
                RO_Number: dataNew.RO_Number,
                Section: dataNew.Section,
                MarketingName: dataNew.MarketingName,
                UnitName: dataNew.UnitName,
                BuyerCode: dataNew.BuyerCode,
                BuyerName: dataNew.BuyerName,
                BrandCode: dataNew.BrandCode,
                BrandName: dataNew.BrandName,
                Article: dataNew.Article,
                Comodity: dataNew.Comodity,
                Category: dataNew.ComodityCategoryName,
                ComodityDescription: dataNew.ComodityDescription,

                SMVCutting: dataNew.SMVCutting.toLocaleString("en-EN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                SMVSewing: dataNew.SMVSewing.toLocaleString("en-EN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                SMVFinishing: dataNew.SMVFinishing.toLocaleString("en-EN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                SMVTotal: dataNew.SMVTotal.toLocaleString("en-EN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                Shipment: moment(dataNew.Shipment).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(dataNew.Shipment).format("DD MMM YYYY"),
                UOMUnit: dataNew.UOMUnit,
                QuantityOrder: dataNew.Quantity,
                ConfirmPrice: dataNew.ConfirmPrice.toLocaleString("en-EN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                FabricCost: dataNew.FabricCost.toLocaleString("en-EN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                FOBPrice: dataNew.FOBPrice.toLocaleString("en-EN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),

                Amount: dataNew.Amount.toLocaleString("en-EN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                RateUSD: dataNew.RateUSD,
                AmountIDR: dataNew.AmountIDR.toLocaleString("en-EN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                Komisi: dataNew.Commision.toLocaleString("en-EN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),

                TotalMaterialCost: dataNew.TotalMaterialCost.toLocaleString("en-EN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                TotalProcessCost: dataNew.TotalProcessCost.toLocaleString("en-EN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                TotalOngkir: dataNew.TotalOngkir.toLocaleString("en-EN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                EstProductCost: dataNew.EstProductCost.toLocaleString("en-EN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),

                GrossProfitIDR: dataNew.GrossProfitIDR.toLocaleString("en-EN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                GrossProfitPercent: dataNew.GrossProfitPercentage.toLocaleString("en-EN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                GPPremiIDR: dataNew.GPPremiIDR.toLocaleString("en-EN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                GPPremiPercent: dataNew.GPPremiPercentage.toLocaleString("en-EN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),

                SellingExpense: dataNew.SellingExpense.toLocaleString("en-EN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                GeneralAdminExpense: dataNew.GeneralAdminExpense.toLocaleString("en-EN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                NonOperatingExpense: dataNew.NonOperatingExpense.toLocaleString("en-EN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),

                TotalBOM: dataNew.SubTotal.toLocaleString("en-EN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                NetProfitIDR: dataNew.NettProfitIDR.toLocaleString("en-EN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                NetProfitPercent: dataNew.NettProfitPercentage.toLocaleString("en-EN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            });

            // Subtotal per MarketingName
            this.SubTotalQtyOrderNew[SECTION_NEW] +=
                getNumberNew(dataNew.Quantity);

            this.SubTotalAmountNew[SECTION_NEW] +=
                getNumberNew(dataNew.Amount);

            this.SubTotalAmountIDRNew[SECTION_NEW] +=
                getNumberNew(dataNew.AmountIDR);

            this.SubTotalGrossProfitIDRNew[SECTION_NEW] +=
                getNumberNew(dataNew.GrossProfitIDR);

            this.SubTotalGPPremiIDRNew[SECTION_NEW] +=
                getNumberNew(dataNew.GPPremiIDR);

            this.SubTotalNettProfitIDRNew[SECTION_NEW] +=
                getNumberNew(dataNew.NettProfitIDR);

            // Grand Total CC New
            this.AmountTotalQtyOrderNew +=
                getNumberNew(dataNew.Quantity);

            this.AmountTotalNew +=
                getNumberNew(dataNew.Amount);

            this.AmountTotalIDRNew +=
                getNumberNew(dataNew.AmountIDR);

            this.AmountTotalGrossProfitIDRNew +=
                getNumberNew(dataNew.GrossProfitIDR);

            this.AmountTotalGPPremiIDRNew +=
                getNumberNew(dataNew.GPPremiIDR);

            this.AmountTotalNettProfitIDRNew +=
                getNumberNew(dataNew.NettProfitIDR);
        }
            
        // Bentuk SectionsNew untuk ditampilkan di tabel
        var SectionsNew = [];

        for (var sectionNameNew in this.dataBySectionNew) {
            SectionsNew.push({
                data: this.dataBySectionNew[sectionNameNew],
                SECTION: sectionNameNew,

                subTotalQtyOrder:
                    this.SubTotalQtyOrderNew[sectionNameNew]
                        .toLocaleString("en-EN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }),

                subTotalAmount:
                    this.SubTotalAmountNew[sectionNameNew]
                        .toLocaleString("en-EN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }),

                subTotalAmountIDR:
                    this.SubTotalAmountIDRNew[sectionNameNew]
                        .toLocaleString("en-EN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }),

                subTotalGrossProfitIDR:
                    this.SubTotalGrossProfitIDRNew[sectionNameNew]
                        .toLocaleString("en-EN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }),

                subTotalGPPremiIDR:
                    this.SubTotalGPPremiIDRNew[sectionNameNew]
                        .toLocaleString("en-EN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }),

                subTotalNettProfitIDR:
                    this.SubTotalNettProfitIDRNew[sectionNameNew]
                        .toLocaleString("en-EN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })
            });
        }

        this.SectionsNew = SectionsNew;

        // Format Grand Total CC New
        this.AmountTotalQtyOrderNew =
            this.AmountTotalQtyOrderNew.toLocaleString("en-EN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

        this.AmountTotalNew =
            this.AmountTotalNew.toLocaleString("en-EN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

        this.AmountTotalIDRNew =
            this.AmountTotalIDRNew.toLocaleString("en-EN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

        this.AmountTotalGrossProfitIDRNew =
            this.AmountTotalGrossProfitIDRNew.toLocaleString("en-EN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

        this.AmountTotalGPPremiIDRNew =
            this.AmountTotalGPPremiIDRNew.toLocaleString("en-EN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

        this.AmountTotalNettProfitIDRNew =
            this.AmountTotalNettProfitIDRNew.toLocaleString("en-EN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

        // Buatkan grandTotal mirip punya CCOld untuk CCNew per UOM
        // Grand Total CC New per UOM
        this.grandTotalByUomNew = [];

        this.grandTotalNew = 0;
        this.grandTotalIDRNew = 0;
        this.grandTotalGrossProfitNew = 0;
        this.grandTotalPremiNew = 0;
        this.grandTotalNettProfitNew = 0;

        for (var i = 0; i < this.dataCCNew.length; i++) {
            var dataNew = this.dataCCNew[i];
        
            var uomNew = dataNew.UOMUnit || "-";
            var quantityNew = getNumberNew(dataNew.Quantity);
            var amountNew = getNumberNew(dataNew.Amount);
            var amountIDRNew = getNumberNew(dataNew.AmountIDR);
            var grossProfitNew = getNumberNew(dataNew.GrossProfitIDR);
            var gpPremiNew = getNumberNew(dataNew.GPPremiIDR);
            var nettProfitNew = getNumberNew(dataNew.NettProfitIDR);
        
            var uomIndexNew = this.grandTotalByUomNew.findIndex(
                function (item) {
                    return item.uom === uomNew;
                }
            );
        
            if (uomIndexNew > -1) {
                this.grandTotalByUomNew[uomIndexNew].quantity += quantityNew;
                this.grandTotalByUomNew[uomIndexNew].amount += amountNew;
                this.grandTotalByUomNew[uomIndexNew].amountIDR += amountIDRNew;
                this.grandTotalByUomNew[uomIndexNew].grossProfitIDR += grossProfitNew;
                this.grandTotalByUomNew[uomIndexNew].gpPremiIDR += gpPremiNew;
                this.grandTotalByUomNew[uomIndexNew].nettProfitIDR += nettProfitNew;
            } else {
                this.grandTotalByUomNew.push({
                    uom: uomNew,
                    quantity: quantityNew,
                    amount: amountNew,
                    amountIDR: amountIDRNew,
                    grossProfitIDR: grossProfitNew,
                    gpPremiIDR: gpPremiNew,
                    nettProfitIDR: nettProfitNew
                });
            }
        
            this.grandTotalNew += amountNew;
            this.grandTotalIDRNew += amountIDRNew;
            this.grandTotalGrossProfitNew += grossProfitNew;
            this.grandTotalPremiNew += gpPremiNew;
            this.grandTotalNettProfitNew += nettProfitNew;
        }

        // Format Grand Total CC New per UOM
        for (var j = 0; j < this.grandTotalByUomNew.length; j++) {
            var itemNew = this.grandTotalByUomNew[j];
        
            itemNew.quantityFormatted = itemNew.quantity.toLocaleString("en-EN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        
            itemNew.amountFormatted = itemNew.amount.toLocaleString("en-EN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        
            itemNew.amountIDRFormatted = itemNew.amountIDR.toLocaleString("en-EN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        
            itemNew.grossProfitIDRFormatted = itemNew.grossProfitIDR.toLocaleString("en-EN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        
            itemNew.gpPremiIDRFormatted = itemNew.gpPremiIDR.toLocaleString("en-EN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        
            itemNew.nettProfitIDRFormatted = itemNew.nettProfitIDR.toLocaleString("en-EN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }

        // Format Grand Total keseluruhan CC New
        this.grandTotalNewFormatted = this.grandTotalNew.toLocaleString("en-EN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        this.grandTotalIDRNewFormatted = this.grandTotalIDRNew.toLocaleString("en-EN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        this.grandTotalGrossProfitNewFormatted = this.grandTotalGrossProfitNew.toLocaleString("en-EN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        this.grandTotalPremiNewFormatted = this.grandTotalPremiNew.toLocaleString("en-EN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        this.grandTotalNettProfitNewFormatted = this.grandTotalNettProfitNew.toLocaleString("en-EN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        
        // =====================================================
        // SUBTOTAL ALL BY UOM: OLD + NEW
        // =====================================================

        var subtotalAllByUOM = {};

        // Helper konversi angka
        var getNumberAll = function (value) {
            var number = Number(value);
            return isNaN(number) ? 0 : number;
        };

        // Helper inisialisasi UOM
        var initSubtotalAll = function (uom) {
            uom = uom || "-";

            if (!subtotalAllByUOM[uom]) {
                subtotalAllByUOM[uom] = {
                    UOMUnit: uom,
                    Quantity: 0,
                    AmountUSD: 0,
                    GrossProfitIDR: 0,
                    NettProfitIDR: 0
                };
            }

            return subtotalAllByUOM[uom];
        };

        // =====================================================
        // OLD: GROUP BY UOMUnit
        // =====================================================

        for (var i = 0; i < this.result.length; i++) {
            var oldData = this.result[i];

            var oldUom = oldData.UOMUnit || "-";
            var oldSubtotal = initSubtotalAll(oldUom);

            oldSubtotal.Quantity += getNumberAll(oldData.Quantity);
            oldSubtotal.AmountUSD += getNumberAll(oldData.Amount);
            oldSubtotal.GrossProfitIDR += getNumberAll(oldData.GrossProfit);
            oldSubtotal.NettProfitIDR += getNumberAll(oldData.ProfitIDR);
        }

        // =====================================================
        // NEW: GROUP BY UOMUnit
        // =====================================================

        for (var j = 0; j < this.dataCCNew.length; j++) {
            var newData = this.dataCCNew[j];

            var newUom = newData.UOMUnit || "-";
            var newSubtotal = initSubtotalAll(newUom);

            newSubtotal.Quantity += getNumberAll(newData.Quantity);
            newSubtotal.AmountUSD += getNumberAll(newData.Amount);
            newSubtotal.GrossProfitIDR += getNumberAll(newData.GrossProfitIDR);
            newSubtotal.NettProfitIDR += getNumberAll(newData.NettProfitIDR);
        }

        // =====================================================
        // FORMAT SUBTOTAL ALL BY UOM
        // =====================================================

        this.SubtotalAllByUOM = Object.keys(subtotalAllByUOM).map(function (uom) {
            var item = subtotalAllByUOM[uom];

            return {
                UOMUnit: item.UOMUnit,
                Quantity: item.Quantity.toLocaleString("en-EN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }),
                AmountUSD: item.AmountUSD.toLocaleString("en-EN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }),

                GrossProfitIDR: item.GrossProfitIDR.toLocaleString("en-EN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }),

                NettProfitIDR: item.NettProfitIDR.toLocaleString("en-EN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })
            };
        });

        // =====================================================
        // GRAND TOTAL ALL: OLD + NEW
        // =====================================================

        var grandTotalAllQuantity = 0;
        var grandTotalAllAmountUSD = 0;
        var grandTotalAllGrossProfitIDR = 0;
        var grandTotalAllNettProfitIDR = 0;

        for (var allUom in subtotalAllByUOM) {
            grandTotalAllQuantity += subtotalAllByUOM[allUom].Quantity;
            grandTotalAllAmountUSD += subtotalAllByUOM[allUom].AmountUSD;
            grandTotalAllGrossProfitIDR += subtotalAllByUOM[allUom].GrossProfitIDR;
            grandTotalAllNettProfitIDR += subtotalAllByUOM[allUom].NettProfitIDR;
        }

        this.GrandTotalAll = {
            Quantity: grandTotalAllQuantity.toLocaleString("en-EN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }),
            AmountUSD: grandTotalAllAmountUSD.toLocaleString("en-EN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }),

            GrossProfitIDR: grandTotalAllGrossProfitIDR.toLocaleString("en-EN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }),

            NettProfitIDR: grandTotalAllNettProfitIDR.toLocaleString("en-EN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })
        };
    }
          
    ExportToExcel() {
        var info = {
            dateFrom : this.dateFrom,
            dateTo : this.dateTo,
        }
        if (this.section) {
           info.section = this.section.Code
        }
        this.service.generateExcel(JSON.stringify(info));
    }

    ExportToExcelNew() {
        var info = {
            dateFrom : this.dateFrom,
            dateTo : this.dateTo,
        }
        if (this.section) {
           info.section = this.section.Code
        }
        this.service.generateExcelNew(JSON.stringify(info));
    }
    hideCostCalculationNew = true;
    toggleCostCalculationNew() {
        this.hideCostCalculationNew = !this.hideCostCalculationNew;
    }
    hideCostCalculationOld = true;
    toggleCostCalculationOld() {
        this.hideCostCalculationOld = !this.hideCostCalculationOld;
    }
    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.section = null;
        this.Sections = [];
        this.AmountTotal = null;
        this.AmountTotal1 = null;
        this.AmountTotal2 = null;  
        this.AmountTotal3 = null;
        this.AmountTotal4 = null;
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    } 
}