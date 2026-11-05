import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    typeOptions = [
        "OLD",
        "NEW"
    ]
    dateFrom = null;
    dateTo = null;
      
    activate() {
       
    }

    ViewDataTable(info){
        this.resultNew = info ? info.New : [];
        this.result = info ? info.Old : [];
        this.data = this.result;
            var dataByUOM = {};
            var subTotalAmount = {};
            var subTotalQuantity = {};
            var subTotalProfitUSD = {};
            var subTotalProfitIDR = {};
            var subTotalProfitFOB = {};
            var subTotalGrossProfit = {};
            var subTotalPremi = {};
            
            for (var data of this.result) {
                    var BdgtUOM = data.UOMUnit;
                    if (!dataByUOM[BdgtUOM]) dataByUOM[BdgtUOM] = [];                 
                        dataByUOM[BdgtUOM].push({         
                        ComodityCode : data.ComodityCode,
                        ComodityName : data.ComodityName,
                        Category : data.ComodityCategoryName,
                        Quantity : data.Quantity.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        UOMUnit : data.UOMUnit,
                        Amount : data.Amount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),  
                        ProfitUSD : data.ProfitUSD.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),  
                        ProfitIDR : data.ProfitIDR.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),  
                        ProfitFOB : data.ProfitFOB.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),  
                        GrossProfit : data.GrossProfit.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),  
                        Premi : data.Premi.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),                                        
                    });
                
                    if (!subTotalAmount[BdgtUOM]) {
                        subTotalAmount[BdgtUOM] = 0;
                        } 
                        subTotalAmount[BdgtUOM] += data.Amount;
                    if (!subTotalQuantity[BdgtUOM]) {
                        subTotalQuantity[BdgtUOM] = 0;
                        } 
                        subTotalQuantity[BdgtUOM] += data.Quantity;
                    if (!subTotalProfitUSD[BdgtUOM]) {
                        subTotalProfitUSD[BdgtUOM] = 0;
                        } 
                        subTotalProfitUSD[BdgtUOM] += data.ProfitUSD;                           
                    if (!subTotalProfitIDR[BdgtUOM]) {
                        subTotalProfitIDR[BdgtUOM] = 0;
                        } 
                        subTotalProfitIDR[BdgtUOM] += data.ProfitIDR;                           
                    if (!subTotalProfitFOB[BdgtUOM]) {
                            subTotalProfitFOB[BdgtUOM] = 0;
                            } 
                        subTotalProfitFOB[BdgtUOM] += data.ProfitFOB;                  
                    if (!subTotalGrossProfit[BdgtUOM]) {
                            subTotalGrossProfit[BdgtUOM] = 0;
                            }                   
                        subTotalGrossProfit[BdgtUOM] += data.GrossProfit;
                    if (!subTotalPremi[BdgtUOM]) {
                            subTotalPremi[BdgtUOM] = 0;
                            }                   
                        subTotalPremi[BdgtUOM] += data.Premi;
            }
            var BdgtUOMs = [];
            this.GrandTotalAmount = 0;
            this.GrandTotalQuantity = 0;
            this.GrandTotalProfitUSD = 0;
            this.GrandTotalProfitIDR = 0;
            this.GrandTotalProfitFOB = 0;
            this.GrandTotalGrossProfit = 0;
            this.GrandTotalPremi = 0;
                
            for (var data in dataByUOM) {
                BdgtUOMs.push({
                data: dataByUOM[data],
                UoM: dataByUOM[data][0].UOMUnit,
                subTotalAmount: (subTotalAmount[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                subTotalQuantity: (subTotalQuantity[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                subTotalProfitUSD: (subTotalProfitUSD[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                subTotalProfitIDR: (subTotalProfitIDR[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                subTotalProfitFOB: (subTotalProfitFOB[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),                   
                subTotalGrossProfit: (subTotalGrossProfit[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                subTotalPremi: (subTotalPremi[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                
            });
                this.GrandTotalQuantity += subTotalQuantity[data];                                     
                this.GrandTotalAmount += subTotalAmount[data];                                     
                this.GrandTotalProfitUSD += subTotalProfitUSD[data];                                     
                this.GrandTotalProfitIDR += subTotalProfitIDR[data];                                     
                this.GrandTotalProfitFOB += subTotalProfitFOB[data];                                                        
                this.GrandTotalGrossProfit += subTotalGrossProfit[data];  
                this.GrandTotalPremi += subTotalPremi[data];                                                       
            }
            
            
            this.GrandTotalQuantity = this.GrandTotalQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            this.GrandTotalAmount = this.GrandTotalAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            this.GrandTotalProfitUSD = this.GrandTotalProfitUSD.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            this.GrandTotalProfitIDR = this.GrandTotalProfitIDR.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            this.GrandTotalProfitFOB = this.GrandTotalProfitFOB.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            this.GrandTotalGrossProfit = this.GrandTotalGrossProfit.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            this.GrandTotalPremi = this.GrandTotalPremi.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            this.BdgtUOMs = BdgtUOMs;
            
            //CC New
            this.dataCCNew = this.resultNew;
            this.dataByUOMNew = {};
            this.SubTotalQtyNew = {};
            this.SubTotalAmountUSDNew = {};
            this.SubTotalAmountIDRNew = {};
            this.SubTotalGrossProfitIDRNew = {};
            this.SubTotalNettProfitIDRNew = {};
            for (var data of this.dataCCNew) {
                var BdgtUOM = data.UOMUnit;
                if (!this.dataByUOMNew[BdgtUOM]) {
                    this.dataByUOMNew[BdgtUOM] = [];
                }
                data.Category = data.ComodityCategoryName;
                this.dataByUOMNew[BdgtUOM].push(data);
                if (!this.SubTotalQtyNew[BdgtUOM]) this.SubTotalQtyNew[BdgtUOM] = 0;
                if (!this.SubTotalAmountUSDNew[BdgtUOM]) this.SubTotalAmountUSDNew[BdgtUOM] = 0;
                if (!this.SubTotalAmountIDRNew[BdgtUOM]) this.SubTotalAmountIDRNew[BdgtUOM] = 0;
                if (!this.SubTotalGrossProfitIDRNew[BdgtUOM]) this.SubTotalGrossProfitIDRNew[BdgtUOM] = 0;
                if (!this.SubTotalNettProfitIDRNew[BdgtUOM]) this.SubTotalNettProfitIDRNew[BdgtUOM] = 0;
                this.SubTotalQtyNew[BdgtUOM] += data.Quantity || 0;
                this.SubTotalAmountUSDNew[BdgtUOM] += data.AmountUSD || 0;
                this.SubTotalAmountIDRNew[BdgtUOM] += data.AmountIDR || 0;
                this.SubTotalGrossProfitIDRNew[BdgtUOM] += data.GrossProfitIDR || 0;
                this.SubTotalNettProfitIDRNew[BdgtUOM] += data.NettProfitIDR || 0;
            }
            this.BdgtUOMNew = [];
        this.GrandTotalQtyNew = 0;
        this.GrandTotalAmountUSDNew = 0;
        this.GrandTotalAmountIDRNew = 0;
        this.GrandTotalGrossProfitIDRNew = 0;
        this.GrandTotalNettProfitIDRNew = 0;

        for (var uom of Object.keys(this.dataByUOMNew)) {
            this.BdgtUOMNew.push({
                UOMUnit: uom,
                data: this.dataByUOMNew[uom],

                SubTotalQtyNew: this.SubTotalQtyNew[uom].toLocaleString("en-EN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }),

                SubTotalAmountUSDNew: this.SubTotalAmountUSDNew[uom].toLocaleString("en-EN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }),

                SubTotalAmountIDRNew: this.SubTotalAmountIDRNew[uom].toLocaleString("en-EN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }),

                SubTotalGrossProfitIDRNew: this.SubTotalGrossProfitIDRNew[uom].toLocaleString("en-EN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }),

                SubTotalNettProfitIDRNew: this.SubTotalNettProfitIDRNew[uom].toLocaleString("en-EN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })
            });

            this.GrandTotalQtyNew += this.SubTotalQtyNew[uom];
            this.GrandTotalAmountUSDNew += this.SubTotalAmountUSDNew[uom];
            this.GrandTotalAmountIDRNew += this.SubTotalAmountIDRNew[uom];
            this.GrandTotalGrossProfitIDRNew += this.SubTotalGrossProfitIDRNew[uom];
            this.GrandTotalNettProfitIDRNew += this.SubTotalNettProfitIDRNew[uom];
        }

        this.GrandTotalQtyNew = this.GrandTotalQtyNew.toLocaleString("en-EN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        this.GrandTotalAmountUSDNew = this.GrandTotalAmountUSDNew.toLocaleString("en-EN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        this.GrandTotalAmountIDRNew = this.GrandTotalAmountIDRNew.toLocaleString("en-EN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        this.GrandTotalGrossProfitIDRNew = this.GrandTotalGrossProfitIDRNew.toLocaleString("en-EN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        this.GrandTotalNettProfitIDRNew = this.GrandTotalNettProfitIDRNew.toLocaleString("en-EN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
            
        // GRAND TOTAL ALL
       var subtotalAllByUOM = {};

        var initSubtotalAll = function (uom) {
            if (!subtotalAllByUOM[uom]) {
                subtotalAllByUOM[uom] = {
                    UOMUnit: uom,
                    Quantity: 0,
                    AmountUSD: 0,
                    GrossProfitIDR: 0,
                    NettProfitIDR: 0
                };
            }
        };

        // Add OLD subtotals
        for (var oldUom of Object.keys(subTotalAmount)) {
            initSubtotalAll(oldUom);

            subtotalAllByUOM[oldUom].Quantity += subTotalQuantity[oldUom];
            subtotalAllByUOM[oldUom].AmountUSD += subTotalAmount[oldUom];
            subtotalAllByUOM[oldUom].GrossProfitIDR += subTotalGrossProfit[oldUom];
            subtotalAllByUOM[oldUom].NettProfitIDR += subTotalProfitIDR[oldUom];
        }

        // Add NEW subtotals
        for (var newUom of Object.keys(this.dataByUOMNew)) {
            initSubtotalAll(newUom);

            subtotalAllByUOM[newUom].Quantity += this.SubTotalQtyNew[newUom];
            subtotalAllByUOM[newUom].AmountUSD += this.SubTotalAmountUSDNew[newUom];
            subtotalAllByUOM[newUom].GrossProfitIDR += this.SubTotalGrossProfitIDRNew[newUom];
            subtotalAllByUOM[newUom].NettProfitIDR += this.SubTotalNettProfitIDRNew[newUom];
        }

        // Formatted subtotal ALL per UOM for HTML binding
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
        // GRAND TOTAL ALL: ALL UOM, OLD + NEW
        // =====================================================
        var grandTotalAllQuantity = 0;
        var grandTotalAllAmountUSD = 0;
        var grandTotalAllGrossProfitIDR = 0;
        var grandTotalAllNettProfitIDR = 0;

        for (var allUom of Object.keys(subtotalAllByUOM)) {
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

    async searching() {
        var info = {
            dateFrom : this.dateFrom,
            dateTo : this.dateTo,
        }
        var result = await this.service.searchNew(JSON.stringify(info));
        this.old = result.Old;
        this.new = result.New;
        this.ViewDataTable(result);
            
    }
          
    ExportToExcel() {
        var info = {
            dateFrom : this.dateFrom,
            dateTo : this.dateTo,
        }
        if (this.marketing) {
           info.marketing = this.marketing.Name
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
        this.BdgtUOMs = [];
        this.AmountTotal = null;   
        this.AmountTotal1 = null;   
        this.AmountTotal2 = null;   
        this.AmountTotal3 = null;    
        this.AmountTotal4 = null;
        this.AmountTotal5 = null;
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;
    } 
}