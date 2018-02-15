import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';


var YearLoader = require('../../../loader/weekly-plan-year-loader');

var UnitLoader = require('../../../loader/weekly-plan-unit-loader');
@inject(Router, Service, BindingEngine)
export class List {
    @bindable year;
    @bindable unit;
    constructor(router, service, bindingEngine) {
        this.service = service;
        this.router = router;
        this.bindingEngine = bindingEngine;

    }
    get yearLoader() {
        return YearLoader;

    }
    get unitLoader() {
        return UnitLoader;

    }
    yearView = (year) => {
        return `${year._id.year}`
    }
    unitView = (unit) => {
        return `${unit._id.unitcode}`

    }
    yearChanged(newValue) {
        if (newValue) {
            this.filter = {
                "year": newValue._id.year
            }
        } else {
            this.filter = {};
        }

    }
    searching() {

        var info = {

            unit: this.unit ? this.unit.code : "",
            year: this.year ? this.year : ""
        }
        this.service.search(info)

            .then(result => {

                this.dataTemp = [];
                this.data = [];
                this.weeklyNumbers = 0;
                this.WeekQuantity = [];
                for (var pr of result) {
                    this.weeklyNumbers = pr._id.weekNumber;
                    break;
                }

               
                for (var pr of result) {
                    var dataTemp = {};
                    dataTemp.quantity = [];
                    dataTemp.efficiency=[];
                    dataTemp.unitBuyerQuantity=[];
                    dataTemp.units = pr._id.unit;
                    dataTemp.buyer = pr._id.buyer;
                    dataTemp.unitBuyer=pr._id.unit +';' +pr._id.buyer;
                    dataTemp.SMVTotal = pr.SMVTot;
                    dataTemp.dataCount = pr.count;
                    dataTemp.operator = pr._id.operator;
                    dataTemp.workingHours=pr._id.workingHoours;
                    dataTemp.AH=pr._id.AHTotal;
                    dataTemp.EH=pr._id.EHTotal;
                    dataTemp.usedEH=pr._id.usedTotal;
                    dataTemp.remainingEH=pr._id.remainingEH;
                    //dataTemp.efficiency=pr._id.efficiency;
                    for(var j=0 ;j<pr._id.efficiency.length;j++)
                    {
                        dataTemp.efficiency[j]=pr._id.efficiency[j].toString() +'%';
                    }
                    dataTemp.weekSewingBlocking=pr._id.weekSewingBlocking;
                    dataTemp.SMVSewings = pr.SMVTot / pr.count;
                    dataTemp.SMVSewingWeek = pr._id.weekSewingBlocking;
                    dataTemp.bookingQty=pr._id.bookingQty;
                    for (var i = 0; i < this.weeklyNumbers.length; i++) {
                        if (i + 1 === pr._id.weekSewingBlocking)
                        {
                            dataTemp.quantity[i] = pr._id.bookingQty;
                        }
                        else {
                            dataTemp.quantity[i] = 0;
                            
                        }
                         
                    }
                    this.dataTemp.push(dataTemp);
                }
                console.log((this.dataTemp));
               //units
                var flags = [], output = [], l = this.dataTemp.length, i;
                for (i = 0; i < l; i++) {
                    if (flags[this.dataTemp[i].units]) continue;
                    flags[this.dataTemp[i].units] = true;
                    output.push(this.dataTemp[i].units);

                }

                var flags = [], output2 = [], l = this.dataTemp.length, i;
                for (i = 0; i < l; i++) {
                    if (flags[this.dataTemp[i].unitBuyer]) continue;
                    flags[this.dataTemp[i].unitBuyer] = true;
                    output2.push({unit:this.dataTemp[i].units, buyer:this.dataTemp[i].buyer});

                }
                console.log(output2);
                //total smvSewing
                    var arr =this.dataTemp,
                      totalSewing = arr.reduce(function (r, o) {
                        (r[o.unitBuyer])? r[o.unitBuyer] += o.SMVSewings : r[o.unitBuyer] = o.SMVSewings;
                        return r;
                      },{});
                      var totalSewing = Object.keys(totalSewing).map(function (key) {
                        return {unitBuyer: key, SMVTotal: totalSewing[key]};
                    });
                 
                //Total per Unit
                    var arr =this.dataTemp,
                      totalSMV = arr.reduce(function (r, o) {
                        (r[o.units])? r[o.units] += o.SMVTotal : r[o.units] = o.SMVTotal;
                        return r;
                      },{});
                      var groups = Object.keys(totalSMV).map(function (key) {
                        return {units: key, SMVTotal: totalSMV[key]};
                    });
                   
                   // console.log(groups);
                let cat=[];
                for(var c of this.dataTemp){
                    var oye={};
                    if(!cat[c.units+c.buyer+c.weekSewingBlocking]){
                        cat[c.units+c.buyer+c.weekSewingBlocking]=c.bookingQty;
                    }
                    else{
                        cat[c.units+c.buyer+c.weekSewingBlocking]+=c.bookingQty;
                    }
                    if(!cat[c.units+"TOTAL"+c.weekSewingBlocking]){
                        cat[c.units+"TOTAL"+c.weekSewingBlocking]=c.bookingQty;
                    }
                    else{
                        cat[c.units+"TOTAL"+c.weekSewingBlocking]+=c.bookingQty;
                    }
                    if(!cat[c.units+"smv"+c.buyer]){
                        cat[c.units+"smv"+c.buyer]=c.SMVSewings;
                    }
                    else{
                        cat[c.units+"smv"+c.buyer]+=c.SMVSewings;
                    }
                    if(!cat[c.units+"efisiensi"]){
                        cat[c.units+"efisiensi"]=c.efficiency;
                    }
                    if(!cat[c.units+"operator"]){
                        cat[c.units+"operator"]=c.operator;
                    }
                    if(!cat[c.units+"totalAH"]){
                        cat[c.units+"totalAH"]=c.AH;
                    }
                    if(!cat[c.units+"totalEH"]){
                        cat[c.units+"totalEH"]=c.EH;
                    }
                    if(!cat[c.units+"usedEH"]){
                        cat[c.units+"usedEH"]=c.usedEH;
                    }
                    if(!cat[c.units+"workingHours"]){
                        cat[c.units+"workingHours"]=c.workingHours;
                    }
                    if(!cat[c.units+"remainingEH"]){
                        cat[c.units+"remainingEH"]=c.remainingEH;
                    }
                    
                }
                console.log(cat);
                
                for (var j of output) {
                    var data = {};
                    data.units =j;
                    data.collection = [];
                    this. sewing=[];
                    var un= this.dataTemp.filter(o=>(o.units == j));
                   
                    for(var i of output2){
                        if(j==i.unit){
                            data.quantity=[];
                            for (var k = 0; k<= this.weeklyNumbers.length; k++)
                            {
                                var categ=j+i.buyer+(k).toString();
                                if(k==0)
                                {
                                    categ=j+"smv"+i.buyer;
                                }
                                
                                
                                data.quantity[k]=cat[categ]? cat[categ] : 0;
                                console.log(categ,data.quantity[k+1]);
                            }
                            data.collection.push({name: i.buyer, quantity :data.quantity,units:j});
                        }
                        console.log(data.collection)
                    }
                    var qty=[];
                    for (var y = 0; y< this.weeklyNumbers.length; y++)
                    {
                                
                        var categ=j+"TOTAL"+(y+1).toString();
                        qty[y+1]=cat[categ]? cat[categ] : 0;
                        console.log(categ,qty[y+1]);
                    }
                    data.collection.push({name: "TOTAL", quantity :qty});
                    var eff=cat[j+"efisiensi"];
                    var opp=cat[j+"operator"];
                    var AH=cat[j+"totalAH"];
                    var EH=cat[j+"totalEH"];
                    var usedEH=cat[j+"usedEH"];
                    var remainingEH=cat[j+"remainingEH"];
                    var workingHours=cat[j+"workingHours"];
                    eff.splice(0,0,"");
                    opp.splice(0,0,"");
                    AH.splice(0,0,"");
                    EH.splice(0,0,"");
                    usedEH.splice(0,0,"");
                    remainingEH.splice(0,0,"");
                    workingHours.splice(0,0,"");
                    data.collection.push({name: "Efisiensi", quantity :eff});
                    data.collection.push({name: "Total Operator Sewing", quantity :opp});
                    data.collection.push({name: "Working Hours", quantity :workingHours});
                    data.collection.push({name: "Total AH", quantity :AH});
                    data.collection.push({name: "Total EH", quantity :EH});
                    data.collection.push({name: "Used EH", quantity :usedEH});
                    data.collection.push({name: "Remaining EH", quantity :remainingEH});
                 
                    
                    this.data.push(data);
                }

                console.log(JSON.stringify (this.data));
                
                var same=[];
               

            });

    }
    ExportToExcel() {
        // var info = {

        //     code : this.code ? this.code.code : "",
        //     buyer : this.buyer ? this.buyer.name : "",
        //     comodity : this.comodity ? this.comodity.name : "",
        //     confirmState : this.confirmState ? this.confirmState : "",
        //     bookingOrderState : this.bookingOrderState ? this.bookingOrderState : "",
        //     dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
        //     dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        // }
        // this.service.generateExcel(info);
        //console.log(this.loadData);
    }


    reset() {
        this.code = "";
        this.year = "";

    }
}