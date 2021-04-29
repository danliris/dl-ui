import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from "moment";
import numeral from "numeral";
const SupplierLoader = require('../../../../loader/supplier-loader');

@inject(Service)
export class List {
   controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    tableOptions = {
        showColumns: false,
        search: false,
        showToggle: false,
        sortable: false,
        pagination: false,
      };

    constructor(service) {
        this.service = service;
        this.info = {};
        this.error = {};

        this.isEmpty = true;
    }

    activate(){
      // console.log("Active");
      var param = this.param;
      this.service.search(param).then(response=>{
        console.log("DummyData", response);
        var data = response.data.map((item)=>{
          var countDispo = item.DispositionExpenditures.length;
          var countMemo = item.Memos.length;
          var minDispoSpan = 0;
          var maxDispoSpan = 0;
          var minMemoSpan =0;
          var maxMemoSpan =0;

          var maxRow = countMemo > countDispo? countMemo : countDispo;
          if(countMemo > countDispo){
            maxRow = countMemo;
            maxDispoSpan = Math.ceil(countMemo / countDispo);
            minDispoSpan = countMemo % countDispo;
            minDispoSpan = minDispoSpan == 0?maxDispoSpan: minDispoSpan;
            minMemoSpan = 1;
            maxMemoSpan = 1;
          }else{
            maxRow = countDispo;
            maxDispoSpan = 1;
            minDispoSpan = 1;
            maxMemoSpan= Math.ceil(countDispo/countMemo);
            minMemoSpan = countDispo % countMemo;
            minMemoSpan = minMemoSpan == 0 ? maxMemoSpan : minMemoSpan;
          }
          
          var itemDispositionExpenditures = item.DispositionExpenditures.map((dispo,index)=>{
            if(countDispo === index + 1){
              dispo._rowspan = countDispo==1? maxDispoSpan: minDispoSpan;
              // dispo._rowspan = maxRow - ((index+1)*maxDispoSpan);              
            }else{
              dispo._rowspan = maxDispoSpan;
            }
            return dispo;
          });

          var itemMemos = item.Memos.map((memo,index1)=>{
            if(countMemo === index1 + 1){
              memo._rowspan = countMemo == 1? maxMemoSpan: minMemoSpan;
              // memo._rowspan = maxRow - ((index1+1)*maxMemoSpan);              
            }else{
              memo._rowspan = maxMemoSpan;
            }
            return memo;
          });

          item.DispositionExpenditures = itemDispositionExpenditures;
          item.Memos = itemMemos;
          item._maxRow = maxRow;

          return item;
        });

        console.log("After Process",data);
        console.log("After Process string",JSON.stringify(data));
        
      });

    }
    reset() {
        this.error = {};
        this.selectedDate = undefined;
        this.accountingBook = undefined;
        this.data.result = [];
        this.isEmpty = true;
    }

    get supplierLoader() {
        return SupplierLoader;
    }
}