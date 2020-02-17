import {
  inject,
  bindable
} from 'aurelia-framework';
import {
  Service
} from "./service";
import {
  Router
} from 'aurelia-router';
import moment from 'moment';

let UnitLoader = require('../../../loader/unit-loader');

@inject(Router, Service)
export class List {

  months = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  years = [];

  constructor(router, service) {
    this.service = service;
    this.router = router;

    this.currentYearItem = parseInt(moment().format('YYYY'));
    this.minYearItem = this.currentYearItem - 5;
    this.maxYearItem = this.currentYearItem + 5;

    for (var i = parseInt(this.minYearItem); i <= parseInt(this.maxYearItem); i++) {
      this.years.push(i.toString());
    }
  }

  bind() {
    this.reset();
  }

  controlOptions = {
    label: {
      length: 3
    },
    control: {
      length: 6
    }
  }

  get units() {
    return UnitLoader;
  }

  searchWarpingBrokens() {
    this.error = {};
    if (false) {
      alert("");
    } else {
      var errorIndex = 0;
      if (this.Year) {
        var YearContainer = this.Year;
      } else {
        this.error.Year = "Tahun Harus Diisi";
        errorIndex++;
      }
      if (this.Month) {
        var MonthContainer = this.Month;
      } else {
        this.error.Month = "Bulan Harus Diisi";
        errorIndex++;
      }
      if (this.WeavingUnit) {
        var WeavingUnitIdContainer = this.WeavingUnit.Id;
      } else {
        this.error.WeavingUnit = "Unit Weaving Harus Diisi";
        errorIndex++;
      }

      var MonthInNumber = 0;

      switch (MonthContainer) {
        case "Januari":
          MonthInNumber = 1;
          break;
        case "Februari":
          MonthInNumber = 2;
          break;
        case "Maret":
          MonthInNumber = 3;
          break;
        case "April":
          MonthInNumber = 4;
          break;
        case "Mei":
          MonthInNumber = 5;
          break;
        case "Juni":
          MonthInNumber = 6;
          break;
        case "Juli":
          MonthInNumber = 7;
          break;
        case "Agustus":
          MonthInNumber = 8;
          break;
        case "September":
          MonthInNumber = 9;
          break;
        case "Oktober":
          MonthInNumber = 10;
          break;
        case "November":
          MonthInNumber = 11;
          break;
        case "Desember":
          MonthInNumber = 12;
          break;
        default:
          MonthInNumber = 0;
          break;
      }

      var arg = {
        month: MonthInNumber,
        year: YearContainer,
        weavingUnitId: WeavingUnitIdContainer
      };
      if (errorIndex == 0) {
        this.service.getReportData(arg).then(result => {
          this.data = result.data;
          console.log(this.data);

          result.data._BodyBrokenList = [];
          var index = 1;
          for (var item of result.data.BodyBrokens) {
            console.log(item);
            var brokenDatum = {
              IndexNumber: index,
              BrokenName: "",
              _BrokenValueList: []
            };

            var valueBrokenEach = 0;
            var totalBrokenValue = 0;
            if (result.data.HeaderWarps.length > 0) {
              for (var headerWarp of result.data.HeaderWarps) {

                var brokenItemIndex = result.data.BodyBrokens.findIndex(o => 
                  o.BrokenName == headerWarp.BrokenName && 
                  o.WarpName == headerWarp.WarpName);
                // debugger
                if (brokenItemIndex >= 0) {
                  valueBrokenEach = result.data.BodyBrokens[brokenItemIndex].BrokenValue;
                  totalBrokenValue = totalBrokenValue + valueBrokenEach;

                  brokenDatum.BrokenName = item.BrokenName;
                  brokenDatum.TotalValue = totalBrokenValue;
                  brokenDatum._BrokenValueList.push({
                    Value: valueBrokenEach
                  });
                } else {
                  brokenDatum._BrokenValueList.push({
                    Value: 0
                  });
                }
              }
              // } else {
              //   brokenDatum._BrokenValueList.push({
              //     Value: 0
              //   });
            }

            result.data._ProcessedList.push(brokenDatum);
            index++;
          }
          console.log(result);
          return result;
        });
      }
    }
  }

  reset() {
    this.Month = null;
    this.MonthContainer = null;
    this.MonthInNumber = null;
    this.Year = null;
    this.YearContainer = null;
    this.WeavingUnit = null;
    this.WeavingUnitIdContainer = null;

    this.error = {};
    this.data = [];
  }

  exportToExcel() {
    this.error = {};
    var errorIndex = 0;
    if (this.Year) {
      var YearContainer = this.Year;
    } else {
      this.error.Year = "Tahun Harus Diisi";
      errorIndex++;
    }
    if (this.Month) {
      var MonthContainer = this.Month;
    } else {
      this.error.Month = "Bulan Harus Diisi";
      errorIndex++;
    }
    if (this.WeavingUnit) {
      var WeavingUnitIdContainer = this.WeavingUnit.Id;
    } else {
      this.error.WeavingUnit = "Unit Weaving Harus Diisi";
      errorIndex++;
    }

    var MonthInNumber = 0;

    switch (MonthContainer) {
      case "Januari":
        MonthInNumber = 1;
        break;
      case "Februari":
        MonthInNumber = 2;
        break;
      case "Maret":
        MonthInNumber = 3;
        break;
      case "April":
        MonthInNumber = 4;
        break;
      case "Mei":
        MonthInNumber = 5;
        break;
      case "Juni":
        MonthInNumber = 6;
        break;
      case "Juli":
        MonthInNumber = 7;
        break;
      case "Agustus":
        MonthInNumber = 8;
        break;
      case "September":
        MonthInNumber = 9;
        break;
      case "Oktober":
        MonthInNumber = 10;
        break;
      case "November":
        MonthInNumber = 11;
        break;
      case "Desember":
        MonthInNumber = 12;
        break;
      default:
        MonthInNumber = 0;
        break;
    }

    if (errorIndex == 0) {
      this.service.getReportPdf(MonthInNumber, YearContainer, WeavingUnitIdContainer);
    }
  }
}
