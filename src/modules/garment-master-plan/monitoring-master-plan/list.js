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
    return `${unit.code} - ${unit.name}`
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
        year: this.year.year,
        unit: this.unit ? this.unit.code : "",
      }
      this.service.search(info)

        .then(result => {
          this.dataTemp = [];
          this.data = [];
          this.weeklyNumbers = 0;
          this.WeekQuantity = [];
          for (var pr of result) {
            this.weeklyNumbers = pr._id.weekNumber;
            this.weeklyEndDate = pr._id.weekEndDate.map(value => { return moment(value).format("DD MMM"); });
            break;
          }


          for (var pr of result) {
            var dataTemp = {};
            dataTemp.backgroundColor = [];
            dataTemp.quantity = [];
            dataTemp.efficiency = [];
            dataTemp.unitBuyerQuantity = [];
            //dataTemp.isConfirmed=[];
            dataTemp.units = pr._id.unit;
            dataTemp.buyer = pr._id.buyer;
            dataTemp.unitBuyer = pr._id.unit + ';' + pr._id.buyer;
            dataTemp.SMVTotal = pr.SMVTot;
            dataTemp.dataCount = pr.count;
            dataTemp.operator = pr._id.operator;
            dataTemp.workingHours = pr._id.workingHoours;
            dataTemp.AH = pr._id.AHTotal;
            dataTemp.EH = pr._id.EHTotal;
            dataTemp.usedEH = pr._id.usedTotal;
            dataTemp.remainingEH = pr._id.remainingEH;
            dataTemp.dataCount = pr.count;

            for (var j = 0; j < pr._id.efficiency.length; j++) {
              dataTemp.efficiency[j] = pr._id.efficiency[j].toString() + '%';
              dataTemp.backgroundColor[j] = dataTemp.remainingEH[j] > 0 ? "#FFFF00" :
                dataTemp.remainingEH[j] < 0 ? "#f62c2c" :
                  "#52df46";
            }
            dataTemp.weekSewingBlocking = pr._id.weekSewingBlocking;
            dataTemp.SMVSewings = pr.SMVTot / pr.count;
            dataTemp.SMVSewingWeek = pr._id.weekSewingBlocking;
            dataTemp.bookingQty = pr._id.bookingQty;
            dataTemp.isConfirmed = pr._id.isConfirmed ? 1 : 0;
            for (var i = 0; i < this.weeklyNumbers.length; i++) {
              if (i + 1 === pr._id.weekSewingBlocking) {
                dataTemp.quantity[i] = pr._id.bookingQty;

              }
              else {
                dataTemp.quantity[i] = 0;
              }

            }
            dataTemp.bookingOrderItemsLength = pr._id.bookingOrderItems.length;
            dataTemp.bookingOrdersConfirmQuantity = pr._id.bookingOrderItems.reduce(
              (acc, cur) => acc + cur.quantity,
              0
            );
            dataTemp.bookingOrdersQuantity = pr._id.bookingOrdersQuantity;
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
          // console.log(output2);

          // //total smvSewing
          // var arr = this.dataTemp,
          //   totalSewing = arr.reduce(function (r, o) {
          //     (r[o.unitBuyer]) ? r[o.unitBuyer] += o.SMVSewings : r[o.unitBuyer] = o.SMVSewings;
          //     return r;
          //   }, {});
          // var totalSewing = Object.keys(totalSewing).map(function (key) {
          //   return { unitBuyer: key, SMVTotal: totalSewing[key] };
          // });

          // //Total per Unit
          // var arr = this.dataTemp,
          //   totalSMV = arr.reduce(function (r, o) {
          //     (r[o.units]) ? r[o.units] += o.SMVTotal : r[o.units] = o.SMVTotal;
          //     return r;
          //   }, {});
          // var groups = Object.keys(totalSMV).map(function (key) {
          //   return { units: key, SMVTotal: totalSMV[key] };
          // });

          let cat = [];
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

            // if (!category[c.units + c.buyer + c.weekSewingBlocking]) {
            //   category[c.units + c.buyer + c.weekSewingBlocking] = c.isConfirmed;
            // }
            // else {
            //   category[c.units + c.buyer + c.weekSewingBlocking] += c.isConfirmed;
            // }
            // if (!len[c.units + c.buyer + c.weekSewingBlocking]) {
            //   len[c.units + c.buyer + c.weekSewingBlocking] = 1;
            // }
            // else {
            //   len[c.units + c.buyer + c.weekSewingBlocking] += 1;
            // }
            // console.log(c.units + c.buyer + c.weekSewingBlocking, category[c.units + c.buyer + c.weekSewingBlocking], len[c.units + c.buyer + c.weekSewingBlocking]);

            if (!bookingOrderItemsLength[c.units + c.buyer + c.weekSewingBlocking]) {
              bookingOrderItemsLength[c.units + c.buyer + c.weekSewingBlocking] = c.bookingOrderItemsLength;
            }
            if (!bookingOrdersConfirmQuantity[c.units + c.buyer + c.weekSewingBlocking]) {
              bookingOrdersConfirmQuantity[c.units + c.buyer + c.weekSewingBlocking] = c.bookingOrdersConfirmQuantity;
            }
            if (!bookingOrdersQuantity[c.units + c.buyer + c.weekSewingBlocking]) {
              bookingOrdersQuantity[c.units + c.buyer + c.weekSewingBlocking] = c.bookingOrdersQuantity;
            }

            if (!cat[c.units + "TOTAL" + c.weekSewingBlocking]) {
              cat[c.units + "TOTAL" + c.weekSewingBlocking] = c.bookingQty;
            }
            else {
              cat[c.units + "TOTAL" + c.weekSewingBlocking] += c.bookingQty;
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
            if (!cat[c.units + "background"]) {
              cat[c.units + "background"] = c.backgroundColor;
            }

          }

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
                    smvTot += Math.round(cat[j + "smv" + i.buyer] / cat[j + "count" + i.buyer]);
                    counts += 1;
                  } else {
                    data.quantity[k] = cat[categ] ? cat[categ] : '-';
                  }

                  // if (category[categ] == 0) {
                  //   background[k] = "#eee860";
                  // }
                  // else if (category[categ] == len[categ]) {
                  //   background[k] = "#ffffff";
                  // } else {
                  //   if (category[categ] != undefined) {
                  //     background[k] = "#F4A919";
                  //   }
                  // }

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
            for (var y = 0; y < this.weeklyNumbers.length; y++) {

              var categ = j + "TOTAL" + (y + 1).toString();

              qty[y + 1] = cat[categ] ? cat[categ] : '-';


              qty[0] = Math.round(smvTot / counts);

            }
            data.collection.push({ name: "TOTAL", quantity: qty, fontWeight: "bold" });
            var eff = cat[j + "efisiensi"];
            var opp = cat[j + "operator"];
            var AH = cat[j + "totalAH"];
            var EH = cat[j + "totalEH"];
            var usedEH = cat[j + "usedEH"];
            var remainingEH = cat[j + "remainingEH"];
            var background = cat[j + "background"];
            var workingHours = cat[j + "workingHours"];

            eff.splice(0, 0, "");
            opp.splice(0, 0, "");
            AH.splice(0, 0, "");
            EH.splice(0, 0, "");
            usedEH.splice(0, 0, "");
            remainingEH.splice(0, 0, "");
            workingHours.splice(0, 0, "");
            background.splice(0, 0, "");
            data.collection.push({ name: "Efisiensi", quantity: eff, fontWeight: "bold" });
            data.collection.push({ name: "Total Operator Sewing", quantity: opp, fontWeight: "bold" });
            data.collection.push({ name: "Working Hours", quantity: workingHours, fontWeight: "bold" });
            data.collection.push({ name: "Total AH", quantity: AH, fontWeight: "bold" });
            data.collection.push({ name: "Total EH", quantity: EH, fontWeight: "bold" });
            data.collection.push({ name: "Used EH", quantity: usedEH, fontWeight: "bold" });
            data.collection.push({ name: "Remaining EH", quantity: remainingEH, background: background, fontWeight: "bold" });


            this.data.push(data);
          }

          // console.log(JSON.stringify(this.data));

          var same = [];

          var columns = [
            {
              cellStyle: () => { return { classes: 'fixed' } },
              field: 'unit', title: 'UNIT'
            },
            {
              field: 'buyer', title: 'BUYER-KOMODITI', cellStyle: (value, row, index, field) => {
                return (row["buyer"] === "TOTAL" || row["smv"] === "") ?
                  { classes: 'fixed', css: { "font-weight": "bold" } } :
                  { classes: 'fixed' };
              }
            },
            {
              field: 'smv', title: 'SMV<br>Sewing', cellStyle: (value, row, index, field) => {
                return row["buyer"] === "TOTAL" ?
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
        year: this.year.year,
        unit: this.unit ? this.unit.code : "",
      }
      this.service.generateExcel(info);
    }
  }

  reset() {
    this.code = "";
    this.year = "";

  }
}
