import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';
const UnitLoader = require('../../../loader/garment-units-loader');

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;

    }
    bind(context) {
        this.context = context;
    }
    
    searching() {
        var info = {
            unit : this.unit ? this.unit.Id : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") :  moment(new Date()).format("YYYY-MM-DD") ,
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") :  moment(new Date()).format("YYYY-MM-DD") ,
            ro : this.ro ?this.ro:""
        }
        this.service.search(info)
            .then(result => {
                this.data=[];
                for(var _data of result){
                    _data.QtyOrder = _data.QtyOrder.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.FC = _data.FC.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.BeginingBalanceCuttingQty = _data.BeginingBalanceCuttingQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.BeginingBalanceCuttingPrice = _data.BeginingBalanceCuttingPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.QtyCuttingIn = _data.QtyCuttingIn.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.PriceCuttingIn = _data.PriceCuttingIn.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.QtyCuttingOut = _data.QtyCuttingOut.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.PriceCuttingOut = _data.PriceCuttingOut.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.QtyCuttingTransfer = _data.QtyCuttingTransfer.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.PriceCuttingTransfer = _data.PriceCuttingTransfer.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.QtyCuttingsubkon = _data.QtyCuttingsubkon.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.PriceCuttingsubkon = _data.PriceCuttingsubkon.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.AvalCutting = _data.AvalCutting.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.AvalCuttingPrice = _data.AvalCuttingPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.AvalSewing = _data.AvalSewing.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.AvalSewingPrice = _data.AvalSewingPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.EndBalancCuttingeQty = _data.EndBalancCuttingeQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.EndBalancCuttingePrice = _data.EndBalancCuttingePrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.BeginingBalanceLoadingQty = _data.BeginingBalanceLoadingQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.BeginingBalanceLoadingPrice = _data.BeginingBalanceLoadingPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.QtyLoading = _data.QtyLoading.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.PriceLoading = _data.PriceLoading.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.QtyLoadingAdjs = _data.QtyLoadingAdjs.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.PriceLoadingAdjs = _data.PriceLoadingAdjs.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.EndBalanceLoadingQty = _data.EndBalanceLoadingQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.EndBalanceLoadingPrice = _data.EndBalanceLoadingPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.BeginingBalanceSewingQty = _data.BeginingBalanceSewingQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.BeginingBalanceSewingPrice = _data.BeginingBalanceSewingPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.QtySewingIn = _data.QtySewingIn.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.PriceSewingIn = _data.PriceSewingIn.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.QtySewingOut = _data.QtySewingOut.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.PriceSewingOut = _data.PriceSewingOut.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.QtySewingAdj = _data.QtySewingAdj.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.PriceSewingAdj = _data.PriceSewingAdj.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.QtySewingInTransfer = _data.QtySewingInTransfer.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.PriceSewingInTransfer = _data.PriceSewingInTransfer.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });           			
                    _data.WipSewingOut = _data.WipSewingOut.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.WipSewingOutPrice = _data.WipSewingOutPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.WipFinishingOut = _data.WipFinishingOut.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.WipFinishingOutPrice = _data.WipFinishingOutPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.QtySewingRetur = _data.QtySewingRetur.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.PriceSewingRetur = _data.PriceSewingRetur.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.QtySewingAdj = _data.QtySewingAdj.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.PriceSewingAdj = _data.PriceSewingAdj.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.EndBalanceSewingQty = _data.EndBalanceSewingQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.EndBalanceSewingPrice = _data.EndBalanceSewingPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.BeginingBalanceFinishingQty = _data.BeginingBalanceFinishingQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.BeginingBalanceFinishingPrice = _data.BeginingBalanceFinishingPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.FinishingInQty = _data.FinishingInQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.FinishingInPrice = _data.FinishingInPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.FinishingAdjQty = _data.FinishingAdjQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.FinishingAdjPRice = _data.FinishingAdjPRice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.FinishingInTransferQty = _data.FinishingInTransferQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.FinishingInTransferPrice = _data.FinishingInTransferPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.FinishingOutQty = _data.FinishingOutQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.FinishingOutPrice = _data.FinishingOutPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.FinishingReturQty = _data.FinishingReturQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.FinishingReturPrice = _data.FinishingReturPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.EndBalanceSubconQty = _data.EndBalanceSubconQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.EndBalanceSubconPrice = _data.EndBalanceSubconPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.EndBalanceFinishingQty = _data.EndBalanceFinishingQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.EndBalanceFinishingPrice = _data.EndBalanceFinishingPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.SubconInQty = _data.SubconInQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.SubconInPrice = _data.SubconInPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.SubconOutQty = _data.SubconOutQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.SubconOutPrice = _data.SubconOutPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.BeginingBalanceExpenditureGood = _data.BeginingBalanceExpenditureGood.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.BeginingBalanceExpenditureGoodPrice = _data.BeginingBalanceExpenditureGoodPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.ExpenditureGoodRetur = _data.ExpenditureGoodRetur.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.ExpenditureGoodRemainingPrice = _data.ExpenditureGoodRemainingPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.SampleQty = _data.SampleQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.SamplePrice = _data.SamplePrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.ExportQty = _data.ExportQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.ExportPrice = _data.ExportPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.ExpenditureGoodAdj = _data.ExpenditureGoodAdj.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.ExpenditureGoodAdjPrice = _data.ExpenditureGoodAdjPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.EndBalanceExpenditureGood = _data.EndBalanceExpenditureGood.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.EndBalanceExpenditureGoodPrice = _data.EndBalanceExpenditureGoodPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.FinishingInExpenditure = _data.FinishingInExpenditure.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.FinishingInExpenditurepPrice = _data.FinishingInExpenditurepPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                      console.log(_data);

                    this.data.push(_data);

                 }
            });
    }
    
    ExportToExcel() {
        var info = {
            unit : this.unit ? this.unit.Id : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") :  moment(new Date()).format("YYYY-MM-DD") ,
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") :  moment(new Date()).format("YYYY-MM-DD") ,
            ro : this.ro ?this.ro:""
        }
        this.service.generateExcel(info);
    }

    get unitLoader(){
        return UnitLoader;
    }
    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    
    }

    
    reset() {
        this.ro = null;
        this.date  = null;
        this.unit = null;
    }
}