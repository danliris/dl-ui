import { inject, computedFrom } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

import "bootstrap-table";
import "bootstrap-table/dist/bootstrap-table.css";
import "bootstrap-table/dist/locale/bootstrap-table-id-ID.js";

import "./fixed-columns/bootstrap-table-fixed-columns";
import "./fixed-columns/bootstrap-table-fixed-columns.css";

var moment = require('moment');

var YearLoader = require('../../../loader/garment-master-plan-weekly-plan-year-loader');
var UnitLoader = require('../../../loader/weekly-plan-unit-loader');

@inject(Router, Service)
export class List {
  constructor(router, service) {
    this.service = service;
    this.router = router;
    
    this.onContentResize = (e) => {
      this.refreshOptionsTable();
    }

  }

  attached() {
    window.addEventListener("resize", this.onContentResize);
  }

  detached() {
    window.removeEventListener("resize", this.onContentResize);
  }

  controlOptions = {
    label: {
      length: 4
    },
    control: {
      length: 5
    }
  }

  get yearLoader() {
    return YearLoader;
  }
  yearView = (year) => {
    return `${year.year}`
  }
  get unitLoader() {
    return UnitLoader;
  }
  unitView = (unit) => {
    return `${unit.Code} - ${unit.Name}`
  }

  @computedFrom("year")
  get filterUnit() {
    if (this.year) {
      this.unit = "";
      return { "year": this.year.year }
    }
    else {
      return { "year": "" }
    }
  }

  searching() {

    if (!this.year) {
      alert("Tahun Harus Diisi");
    }
    else {
      var info = {
        year: this.year.year
      }
      if (this.unit) {
        info.unit = this.unit.Code
      }
      this.service.search(JSON.stringify(info))
        .then(result => {
          this.dataTemp = [];
          this.data = [];
          this.weeklyNumbers = 0;
          this.WeekQuantity = [];
          let cat = [];

          for (var pr of result) {
            this.weeklyNumbers = pr.items.map(value => { return value.weekNumber});
            this.weeklyEndDate = pr.items.map(value => { return moment(value.weekEndDate).format("DD MMM"); });
            break;
          }
          for (var pr of result) {
            pr.count=1;
            var dataTemp = {};
            dataTemp.backgroundColor = [];
            dataTemp.quantity = [];
            dataTemp.efficiency = [];
            dataTemp.unitBuyerQuantity = [];
            dataTemp.backgroundColorWH =[];
            //dataTemp.isConfirmed=[];
            dataTemp.units = pr.unit;
            dataTemp.bookingId=pr.bookingId;
            dataTemp.bookingDate=pr.bookingDate;
            dataTemp.weekBookingOrder=pr.weekBookingOrder;
            dataTemp.bookingOrderQty=pr.bookingOrderQty;
            dataTemp.buyer = pr.buyer;
            dataTemp.unitBuyer = pr.unit + ';' + pr.buyer;
            dataTemp.SMVTotal = pr.SMVSewing;
            dataTemp.dataCount = pr.count;
            dataTemp.operator = pr.items.map(value => { return value.head});
            dataTemp.workingHours = pr.items.map(value => { return value.workingHours});
            dataTemp.AH = pr.items.map(value => { return value.AHTotal});
            dataTemp.EH = pr.items.map(value => { return value.EHTotal});
            dataTemp.usedEH = pr.items.map(value => { return value.usedTotal});
            dataTemp.remainingEH = pr.items.map(value => { return value.remainingEH});
            dataTemp.dataCount = pr.count;
            dataTemp.WHBooking= pr.items.map(value => { return parseFloat(value.WHBooking.toFixed(2))});
            dataTemp.EHBooking= pr.UsedEH;
            for (var j = 0; j < pr.items.length; j++) {
              dataTemp.efficiency[j] = pr.items[j].efficiency.toString() + '%';
              dataTemp.backgroundColor[j] = dataTemp.remainingEH[j] > 0 ? "#FFFF00" :
                dataTemp.remainingEH[j] < 0 ? "#f62c2c" :
                  "#52df46";
            }

            for (var l = 0; l < pr.items.length; l++) {
              dataTemp.backgroundColorWH[l] = dataTemp.WHBooking[l] <= 45.5 ? "#FFFF00" : 
                dataTemp.WHBooking[l] < 50.5 && dataTemp.WHBooking[l] > 45.6 ? "#52df46" : 
                dataTemp.WHBooking[l] < 56.5 && dataTemp.WHBooking[l] > 50.6 ? "#f62c2c" :
                  "#797978";
            }
            dataTemp.weekSewingBlocking = pr.weekSewingBlocking;
            dataTemp.SMVSewings = pr.SMVSewing / pr.count;
            dataTemp.SMVSewingWeek = pr.weekSewingBlocking;
            dataTemp.bookingQty = pr.bookingQty;
            dataTemp.isConfirmed = pr.isConfirmed ? 1 : 0;
            for (var i = 0; i < this.weeklyNumbers.length; i++) {
              if (i + 1 === pr.weekSewingBlocking) {
                dataTemp.quantity[i] = pr.bookingQty;

              }
              else {
                dataTemp.quantity[i] = 0;
              }

            }
            dataTemp.bookingOrderItemsLength = pr.bookingOrderItems.length;
            dataTemp.bookingItems=pr.bookingOrderItems;
            dataTemp.bookingOrdersConfirmQuantity = pr.bookingOrderItems.reduce(
              (acc, cur) => acc + cur.ConfirmQuantity,
              0
            );

            // for(var item of pr.bookingOrderItems){
            //   if (!cat["GRANDTOTAL" + "Total Confirm" + item.weekConfirm]) {
            //     cat["GRANDTOTAL" + "Total Confirm" + item.weekConfirm] = item.ConfirmQuantity;
            //   }
            //   else {
            //     cat["GRANDTOTAL"+ "Total Confirm" + item.weekConfirm] += item.ConfirmQuantity;
            //   }
            // }

            dataTemp.bookingOrdersQuantity = pr.bookingOrdersQuantity;
          this.dataTemp.push(dataTemp);
          }
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
            output2.push({ unit: this.dataTemp[i].units, buyer: this.dataTemp[i].buyer });

          }

          let category = [];
          let len = [];
          let bookingOrderItemsLength = [];
          let bookingOrdersConfirmQuantity = [];
          let bookingOrdersQuantity = [];
          for (var c of this.dataTemp) {
            var oye = {};
            if (!cat[c.units + c.buyer + c.weekSewingBlocking]) {
              cat[c.units + c.buyer + c.weekSewingBlocking] = c.bookingQty;
            }
            else {
              cat[c.units + c.buyer + c.weekSewingBlocking] += c.bookingQty;
            }

            
            if (!bookingOrderItemsLength[c.units + c.buyer + c.weekSewingBlocking]) {
              bookingOrderItemsLength[c.units + c.buyer + c.weekSewingBlocking] = c.bookingOrderItemsLength;
            }
            if (!bookingOrdersConfirmQuantity[c.units + c.buyer + c.weekSewingBlocking]) {
              bookingOrdersConfirmQuantity[c.units + c.buyer + c.weekSewingBlocking] = c.bookingOrdersConfirmQuantity;
            }
            if (!bookingOrdersQuantity[c.units + c.buyer + c.weekSewingBlocking]) {
              bookingOrdersQuantity[c.units + c.buyer + c.weekSewingBlocking] = c.bookingOrdersQuantity;
            }

            if (!cat[c.units + "Total Booking" + c.weekSewingBlocking]) {
              cat[c.units + "Total Booking" + c.weekSewingBlocking] = c.bookingQty;
            }
            else {
              cat[c.units + "Total Booking" + c.weekSewingBlocking] += c.bookingQty;
            }

            if (!cat[c.units + "Total Confirm" + c.weekSewingBlocking]) {
              if(c.isConfirmed)
                cat[c.units + "Total Confirm" + c.weekSewingBlocking] = c.bookingQty;
            }
            else {
              if(c.isConfirmed)
                cat[c.units + "Total Confirm" + c.weekSewingBlocking] += c.bookingQty;
            }

            if (!cat[c.units + "WHConfirm" + c.weekSewingBlocking]) {
              if(c.isConfirmed)
                cat[c.units + "WHConfirm" + c.weekSewingBlocking] = c.EHBooking;
            }
            else {
              if(c.isConfirmed)
                cat[c.units + "WHConfirm" + c.weekSewingBlocking] += c.EHBooking;
            }
            if (!cat[c.units + "smv" + c.buyer]) {
              cat[c.units + "smv" + c.buyer] = c.SMVSewings;
            }
            else {
              cat[c.units + "smv" + c.buyer] += c.SMVSewings;
            }
            if (!cat[c.units + "count" + c.buyer]) {
              cat[c.units + "count" + c.buyer] = c.dataCount;
            }
            else {
              cat[c.units + "count" + c.buyer] += c.dataCount;
            }

            if (!cat[c.units + "efisiensi"]) {
              cat[c.units + "efisiensi"] = c.efficiency;
            }
            if (!cat[c.units + "operator"]) {
              cat[c.units + "operator"] = c.operator;
            }
            if (!cat[c.units + "totalAH"]) {
              cat[c.units + "totalAH"] = c.AH;
            }
            if (!cat[c.units + "totalEH"]) {
              cat[c.units + "totalEH"] = c.EH;
            }
            if (!cat[c.units + "usedEH"]) {
              cat[c.units + "usedEH"] = c.usedEH;
            }
            
            if (!cat[c.units + "workingHours"]) {
              cat[c.units + "workingHours"] = c.workingHours;
            }
            if (!cat[c.units + "remainingEH"]) {
              cat[c.units + "remainingEH"] = c.remainingEH;
            }
            
            if (!cat[c.units + "WHBooking"]) {
              cat[c.units + "WHBooking"] = c.WHBooking;
            }
            if (!cat[c.units + "background"]) {
              cat[c.units + "background"] = c.backgroundColor;
            }
            if (!cat[c.units + "backgroundColorWH"]) {
              cat[c.units + "backgroundColorWH"] = c.backgroundColorWH;
            }

            if (!cat["GRANDTOTAL" + "Total Booking" + c.weekSewingBlocking]) {
              cat["GRANDTOTAL" + "Total Booking" + c.weekSewingBlocking] = c.bookingQty;
            }
            else{
              cat["GRANDTOTAL" + "Total Booking" + c.weekSewingBlocking] += c.bookingQty;
            }

            if (!cat["GRANDTOTAL" + "Total Confirm" + c.weekSewingBlocking]) {
              if(c.isConfirmed)
                cat["GRANDTOTAL" + "Total Confirm" + c.weekSewingBlocking] = c.bookingQty;
            }
            else{
              if(c.isConfirmed)
                cat["GRANDTOTAL" + "Total Confirm" + c.weekSewingBlocking] += c.bookingQty;
            }
            
          }

          var unitCount=output.length;
          var totalOP=[];
          var totalAH=[];
          var totalEH=[];
          var totalUsedEH=[];
          var totalremEh=[];
          var totalEfisiensi=[];
          var totalworkingHours=[];
          var totalWHBooking=[];
          var totalWHConfirm=[];
          var totalWH=[];

          for (var j of output) {
            var data = {};
            data.units = j;
            data.collection = [];
            this.sewing = [];
            var un = this.dataTemp.filter(o => (o.units == j));

            var smvTot = 0;
            var counts = 0;
            for (var i of output2) {

              if (j == i.unit) {
                data.quantity = [];
                var background = [];
                for (var k = 0; k <= this.weeklyNumbers.length; k++) {
                  var categ = j + i.buyer + (k).toString();

                  if (k == 0) {
                    categ = (j + "smv" + i.buyer);
                    data.quantity[k] = (cat[j + "smv" + i.buyer] / cat[j + "count" + i.buyer]) ? Math.round((cat[j + "smv" + i.buyer] / cat[j + "count" + i.buyer])) : '-';
                    smvTot += parseFloat((cat[j + "smv" + i.buyer] / cat[j + "count" + i.buyer]).toFixed(2));
                    counts += 1;
                  } else {
                    data.quantity[k] = cat[categ] ? cat[categ] : '-';
                  }

                  if (bookingOrderItemsLength[categ] === 0) {
                    background[k] = "#EEE860";
                  } else if (bookingOrderItemsLength[categ] > 0 && bookingOrdersConfirmQuantity[categ] < bookingOrdersQuantity[categ]) {
                    background[k] = "#F4A919";
                  } else {
                    background[k] = "transparent";
                  }

                }
                data.collection.push({ name: i.buyer, quantity: data.quantity, units: j, background: background, fontWeight: "normal" });
              }

            }
            var qty = [];
            var qtyConf = [];
            var conf=[];
            var confPrs=[];
            var op=cat[j + "operator"];
            var ah=cat[j + "totalAH"];
            var eh=cat[j + "totalEH"];
            var UsedEh=cat[j + "usedEH"];
            var remEh=cat[j + "remainingEH"];
            var efisiensi=cat[j + "efisiensi"];
            var whBooking=cat[j + "WHBooking"];
            var wh=cat[j + "workingHours"];

            for (var y = 0; y < this.weeklyNumbers.length; y++) {

              var categ = j + "Total Booking" + (y + 1).toString();

              qty[y + 1] = cat[categ] ? cat[categ] : '-';
              qty[0] = parseFloat((smvTot / counts).toFixed(2));

              var categConf = j + "Total Confirm" + (y + 1).toString();
              qtyConf[y + 1] = cat[categConf] ? cat[categConf] : '-';

              qtyConf[0] = "";

              confPrs[0]="";
              if(qty[y+1]=="-"){
                if(qtyConf[y+1]=="-"){
                  confPrs[y+1]="0%";
                }
                else{
                  confPrs[y+1]="100%";
                }
              }
              else if(qtyConf[y+1]=="-"){
                if(qty[y+1]!="-"){
                  confPrs[y+1]="0%";
                }
              }
              else {
                var avg=(qtyConf[y+1]/qty[y+1])*100;
                confPrs[y+1]=parseFloat(avg.toFixed(2))+"%";
              }
              
              var categwh = j + "WHConfirm" + (y + 1).toString();
              var eff= parseFloat(efisiensi[y].replace('%',''));

              conf[y + 1] = cat[categwh] ? parseFloat((cat[categwh]/(op[y]*(eff/100))).toFixed(2)) : '0';

              var bgc = conf[y + 1] <= 45.5 ? "#FFFF00" : 
                conf[y + 1] < 50.5 && conf[y + 1] > 45.6 ? "#52df46" : 
                conf[y + 1] < 56.5 && conf[y + 1] > 50.6 ? "#f62c2c" :
                  "#797978";
              if(y==0){
                cat[j + "backgroundColorWHC"]=["transparent"];
              }
              if (!cat[j + "backgroundColorWHC"]) {
                cat[j + "backgroundColorWHC"] = [bgc];
              }
              else{
                cat[j + "backgroundColorWHC"].push(bgc);
              }

              conf[0] = "";
              totalOP[0]="";
              totalWH[0]="";
              totalAH[0]="";
              totalEH[0]="";
              totalremEh[0]="";
              totalUsedEH[0]="";
              totalEfisiensi[0]="";
              totalWHConfirm[0]="";
              totalWHBooking[0]="";

              if(!totalWH[y + 1]){
                totalWH[y + 1]=wh[y];
              }
              else{
                totalWH[y + 1]+=wh[y];
              }

              if(!totalWHBooking[y + 1]){
                totalWHBooking[y + 1]=whBooking[y];
              }
              else{
                totalWHBooking[y + 1]+=whBooking[y];
              }

              if(!totalWHConfirm[y + 1]){
                totalWHConfirm[y + 1]=parseFloat(conf[y + 1]);
              }
              else{
                totalWHConfirm[y + 1]+=parseFloat(conf[y + 1]);
              }

              if(!totalOP[y + 1]){
                totalOP[y + 1]=op[y];
              }
              else{
                totalOP[y + 1]+=op[y];
              }

              if(!totalAH[y + 1]){
                totalAH[y + 1]=ah[y];
              }
              else{
                totalAH[y + 1]+=ah[y];
              }

              if(!totalEH[y + 1]){
                totalEH[y + 1]=eh[y];
              }
              else{
                totalEH[y + 1]+=eh[y];
              }
              
              if(!totalUsedEH[y + 1]){
                totalUsedEH[y + 1]=UsedEh[y];
              }
              else{
                totalUsedEH[y + 1]+=UsedEh[y];
              }

              if(!totalremEh[y + 1]){
                totalremEh[y + 1]=remEh[y];
              }
              else{
                totalremEh[y + 1]+=remEh[y];
              }
              var eff= efisiensi[y].replace('%','');
              if(!totalEfisiensi[y + 1]){
                totalEfisiensi[y + 1]=parseInt(eff);
              }
              else{
                totalEfisiensi[y + 1]+=parseInt(eff);
              }
              
            }
            data.collection.push({ name: "Total Booking", quantity: qty, fontWeight: "bold" });
            data.collection.push({ name: "Total Confirm", quantity: qtyConf, fontWeight: "bold" });
            data.collection.push({ name: "Persentase Confirm", quantity: confPrs, fontWeight: "bold" });

            var eff = cat[j + "efisiensi"];
            var opp = cat[j + "operator"];
            var AH = cat[j + "totalAH"];
            var EH = cat[j + "totalEH"];
            var usedEH = cat[j + "usedEH"];
            var remainingEH = cat[j + "remainingEH"];
            var WHBooking = cat[j + "WHBooking"];
            var background = cat[j + "background"];
            var workingHours = cat[j + "workingHours"];
            var backgroundColorWH = cat[j + "backgroundColorWH"];
            var backgroundColorWHC=cat[j + "backgroundColorWHC"];

            eff.splice(0, 0, "");
            opp.splice(0, 0, "");
            AH.splice(0, 0, "");
            EH.splice(0, 0, "");
            usedEH.splice(0, 0, "");
            remainingEH.splice(0, 0, "");
            WHBooking.splice(0, 0, "");
            workingHours.splice(0, 0, "");
            background.splice(0, 0, "");
            backgroundColorWH.splice(0, 0, "");
            data.collection.push({ name: "Efisiensi", quantity: eff, fontWeight: "bold" });
            data.collection.push({ name: "Total Operator Sewing", quantity: opp, fontWeight: "bold" });
            data.collection.push({ name: "Working Hours", quantity: workingHours, fontWeight: "bold" });
            data.collection.push({ name: "Total AH", quantity: AH, fontWeight: "bold" });
            data.collection.push({ name: "Total EH", quantity: EH, fontWeight: "bold" });
            data.collection.push({ name: "Used EH", quantity: usedEH, fontWeight: "bold" });
            data.collection.push({ name: "Remaining EH", quantity: remainingEH, background: background, fontWeight: "bold" });
            data.collection.push({ name: "WH Booking", quantity: WHBooking, background: backgroundColorWH, fontWeight: "bold" });
            data.collection.push({ name: "WH Confirm", quantity: conf, background: backgroundColorWHC,fontWeight: "bold" });

            this.data.push(data);

            
          }

          var dataGrand={};
          dataGrand.collection=[];
          var qtyTot=[];
          var BookingqtyTot=[];
          var confTot=[];
          var avgConf=[];
          var avgEff=[];
          var avgWHConfirm=[];
          var avgWHBooking=[];
          var avgWH=[];
          var bgcWH=[];
          var bgcWHC=[];

          for (var y = 0; y < this.weeklyNumbers.length; y++) {
            var ca= "GRANDTOTAL" + "Total Booking" + (y+1).toString();
            qtyTot[0]="";
            qtyTot[y+1]= cat[ca] ? cat[ca] : "-";

            // var bookingCat= "GRANDTOTAL" + "Total Booking" + (y+1).toString();
            // BookingqtyTot[0]="";
            // BookingqtyTot[y+1]= cat[bookingCat] ? cat[bookingCat] : "-";

            var confCat="GRANDTOTAL" + "Total Confirm" + (y+1).toString();
            confTot[0]="";
            confTot[y+1]= cat[confCat] ? cat[confCat] : "-";

            avgConf[0]="";
            if(qtyTot[y+1]=="-"){
              if(confTot[y+1]=="-"){
                avgConf[y+1]="0%";
              }
              else{
                avgConf[y+1]="100%";
              }
            }
            else if(confTot[y+1]=="-"){
              if(qtyTot[y+1]!="-"){
                avgConf[y+1]="0%";
              }
            }
            else {
              var avg=(confTot[y+1]/qtyTot[y+1])*100;
              avgConf[y+1]=parseFloat(avg.toFixed(2))+"%";
            }

            avgEff[0]="";
            avgEff[y+1]=(Math.round(totalEfisiensi[y + 1]/unitCount))+"%";

            avgWHConfirm[0]="";
            avgWHConfirm[y+1]=parseFloat((totalWHConfirm[y + 1]/unitCount).toFixed(2));
            
            avgWHBooking[0]="";
            avgWHBooking[y+1]=parseFloat((totalWHBooking[y + 1]/unitCount).toFixed(2));

            avgWH[0]="";
            avgWH[y+1]=parseFloat((totalWH[y + 1]/unitCount).toFixed(2));

            bgcWH[y + 1] = avgWHBooking[y + 1] <= 45.5 ? "#FFFF00" : 
                avgWHBooking[y + 1] < 50.5 && avgWHBooking[y + 1] > 45.6 ? "#52df46" : 
                avgWHBooking[y + 1] < 56.5 && avgWHBooking[y + 1] > 50.6 ? "#f62c2c" :
                  "#797978";
            
            bgcWH[0]="transparent";

            bgcWHC[y + 1] = avgWHConfirm[y + 1] <= 45.5 ? "#FFFF00" : 
                avgWHConfirm[y + 1] < 50.5 && avgWHConfirm[y + 1] > 45.6 ? "#52df46" : 
                avgWHConfirm[y + 1] < 56.5 && avgWHConfirm[y + 1] > 50.6 ? "#f62c2c" :
                  "#797978";
            
            bgcWHC[0]="transparent";

          }
          dataGrand.units="GRAND TOTAL";
          dataGrand.collection.push({ name: "Total Booking", quantity: qtyTot, units: "GRAND TOTAL", fontWeight: "bold" });
          //dataGrand.collection.push({ name: "Total Booking", quantity: BookingqtyTot, units: "GRAND TOTAL", fontWeight: "bold" });
          dataGrand.collection.push({ name: "Total Confirm", quantity: confTot, units: "GRAND TOTAL", fontWeight: "bold" });
          dataGrand.collection.push({ name: "Persentase Confirm", quantity: avgConf, units: "GRAND TOTAL", fontWeight: "bold" });
          dataGrand.collection.push({ name: "Efisiensi", quantity: avgEff, units: "GRAND TOTAL", fontWeight: "bold" });
          dataGrand.collection.push({ name: "Total Operator", quantity: totalOP, units: "GRAND TOTAL", fontWeight: "bold" });
          dataGrand.collection.push({ name: "Working Hours", quantity: avgWH, units: "GRAND TOTAL", fontWeight: "bold" });
          dataGrand.collection.push({ name: "Total AH", quantity: totalAH, units: "GRAND TOTAL", fontWeight: "bold" });
          dataGrand.collection.push({ name: "Total EH", quantity: totalEH, units: "GRAND TOTAL", fontWeight: "bold" });
          dataGrand.collection.push({ name: "Used EH", quantity: totalUsedEH, units: "GRAND TOTAL", fontWeight: "bold" });
          dataGrand.collection.push({ name: "Remaining EH", quantity: totalremEh, units: "GRAND TOTAL", fontWeight: "bold" });
          dataGrand.collection.push({ name: "WH Booking", quantity: avgWHBooking, background: bgcWH, units: "GRAND TOTAL", fontWeight: "bold" });
          dataGrand.collection.push({ name: "WH Confirm", quantity: avgWHConfirm, background: bgcWHC,units: "GRAND TOTAL", fontWeight: "bold" });
          
          this.data.push(dataGrand);
          
          var same = [];
          var columns = [
            {
              cellStyle: () => { return { classes: 'fixed' } },
              field: 'unit', title: 'UNIT'
            },
            {
              field: 'buyer', title: 'BUYER-KOMODITI', cellStyle: (value, row, index, field) => {
                return (row["buyer"] === "Total Booking" || row["smv"] === "") ?
                  { classes: 'fixed', css: { "font-weight": "bold" } } :
                  { classes: 'fixed' };
              }
            },
            {
              field: 'smv', title: 'SMV<br>Sewing', cellStyle: (value, row, index, field) => {
                return row["buyer"] === "Total Booking" ?
                  { classes: 'fixed', css: { "font-weight": "bold" } } :
                  { classes: 'fixed' };
              }
            },
          ];
          for (var i in this.weeklyNumbers) {
            columns.push({
              field: `W${this.weeklyNumbers[i]}`,
              title: `W${this.weeklyNumbers[i]}<br>${this.weeklyEndDate[i]}`,
              cellStyle: (value, row, index, field) => {
                if (row["buyer"] === "Remaining EH") {
                  return { css: { "font-weight": "bold", "background": value.value > 0 ? "#FFFF00" : value.value < 0 ? "#f62c2c" : "#52df46" } }
                } else {
                  return { css: value.background ? { "background": value.background } : { "font-weight": "bold" } };
                }
              },
              formatter: (value, row, index, field) => {
                return value.value;
              }
            });
          };

          var data = [];
          for (var d of this.data) {
            for (var c of d.collection) {
              var rowData = { unit: d.units, buyer: c.name };
              for (var i in c.quantity) {
                if (i == 0) {
                  rowData["smv"] = c.quantity[i];
                } else {
                  rowData[`W${this.weeklyNumbers[i - 1]}`] = { value: c.quantity[i] };
                  if (c.background) {
                    rowData[`W${this.weeklyNumbers[i - 1]}`].background = c.background[i];
                  }
                }
              }
              data.push(rowData);
            }
          }

          var bootstrapTableOptions = {
            columns: columns,
            data: data,
            fixedColumns: true,
            fixedNumber: 3
          };
          if (data.length > 10) { // row > 10
            bootstrapTableOptions.height = $(window).height() - $('.navbar').height() - $('.navbar').height() - 25;
          }
          $(this.table).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);

          var rowIndex = 0;
          var unitTemp = "";
          for (var d of this.data) {
            for (var c of d.collection) {
              if(unitTemp != d.units) {
                // $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "unit", rowspan: d.collection.length, colspan: 1 });
                var $fixedTableBodyColumns = $('.fixed-table-body-columns');
                this.mergeCells($fixedTableBodyColumns, { index : rowIndex, field: 0, rowspan: d.collection.length, colspan: 1 });
                unitTemp = d.units;
              }
              rowIndex++;
            }
          }

        });
    }
  }

  mergeCells($el, options) {
    var row = options.index,
        col = options.field,
        rowspan = options.rowspan || 1,
        colspan = options.colspan || 1,
        i, j,
        $tr = $el.find('tr'),
        $td;

    $td = $tr.eq(row).find('>td').eq(col);

    for (i = row; i < row + rowspan; i++) {
        for (j = col; j < col + colspan; j++) {
            $tr.eq(i).find('>td').eq(j).hide();
        }
    }

    $td.attr('rowspan', rowspan).attr('colspan', colspan).show();
  }

  refreshOptionsTable() {
    var bootstrapTableOptions = {
      // columns: columns,
      // data: data,
      fixedColumns: true,
      fixedNumber: 3
    };
    var data = $(this.table).bootstrapTable('getData');
    if (data.length > 10) { // row > 10
      bootstrapTableOptions.height = $(window).height() - $('.navbar').height() - $('.navbar').height() - 25;
    }
    $(this.table).bootstrapTable('refreshOptions', bootstrapTableOptions);

    var rowIndex = 0;
    var unitTemp = "";
    for (var d of this.data) {
      for (var c of d.collection) {
        if(unitTemp != d.units) {
          // $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "unit", rowspan: d.collection.length, colspan: 1 });
          var $fixedTableBodyColumns = $('.fixed-table-body-columns');
          this.mergeCells($fixedTableBodyColumns, { index : rowIndex, field: 0, rowspan: d.collection.length, colspan: 1 });
          unitTemp = d.units;
        }
        rowIndex++;
      }
    }

  }
  
  ExportToExcel() {
    if (!this.year) {
      alert("Tahun Harus Diisi");
    }
    else {
      var info = {
        year: this.year.year
      }
      if (this.unit) {
        info.unit = this.unit.Code
      }
      this.service.generateExcel(JSON.stringify(info));
    }
  }

  reset() {
    this.code = "";
    this.year = "";

  }
}
