import { inject, bindable } from 'aurelia-framework'
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");
const SubconContractLoader = require("../../../../loader/garment-subcon-contract-loader");

@inject(Router, Service)
export class List {
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    @bindable selectedContractType;
    @bindable selectedSubconCategory;
    buyerAgent = null;
    optionDate = "";
    dateFrom = null;
    dateTo = null;
    // @bindable JnsInv;
   
    // OptionDate = ['','TGL INVOICE', 'TGL TRUCKING', 'TGL PEB'];
    ContractTypeOptions = ["SUBCON GARMENT", "SUBCON BAHAN BAKU", "SUBCON JASA"];
    //SubconCategoryTypeOptions = ["SUBCON CUTTING SEWING", "SUBCON SEWING"];
    get garmentbuyerLoader() {
        return GarmentBuyerLoader;
    }

    buyerAgentView = (buyerAgent) => {
        return `${buyerAgent.Code} - ${buyerAgent.Name}`
    }

    activate() {
       
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };

    // JnsInvChanged(newvalue) {
    //     if (newvalue) {
    //         if (newvalue === "TGL INVOICE") {
    //             this.optionDate = "TGL INVOICE";
    //         }
    //         else if (newvalue === "TGL TRUCKING") {
    //             this.optionDate = "TGL TRUCKING";
    //         }
    //         else {
    //             this.optionDate = "TGL PEB"; 
    //         }
    //     }
    // }

    selectedContractTypeChanged(newValue) {
        if (newValue) {
            //this.data.ContractType = newValue;
            console.log(newValue);
            // if (this.data.Items) {
            //     this.data.Items.splice(0);
            // }
            if (newValue == "SUBCON GARMENT") {
                this.SubconCategoryTypeOptions = ["SUBCON CUTTING SEWING", "SUBCON SEWING"];
            }
            else if (newValue == "SUBCON BAHAN BAKU") {
                this.SubconCategoryTypeOptions = ["SUBCON BB SHRINKAGE/PANEL", "SUBCON BB FABRIC WASH/PRINT"];
            }
            else if (newValue== "SUBCON JASA") {
                this.SubconCategoryTypeOptions = ["SUBCON JASA GARMENT WASH", "SUBCON JASA KOMPONEN", "SUBCON JASA BARANG JADI"];
            }
        }

        // this.itemOptions.isSubconCutting = this.data.SubconCategory == "SUBCON CUTTING SEWING"?true : false;

    }

    // selectedSubconCategoryChanged(newValue) {
    //     if (newValue != this.data.SubconCategory) {
    //         this.data.SubconCategory = newValue;
    //         if (this.data.Items) {
    //             this.data.Items.splice(0);
    //         }
    //         if (this.data.SubconCategory == "SUBCON CUTTING SEWING" || this.data.SubconCategory == "SUBCON SEWING" || this.data.SubconCategory == "SUBCON JASA KOMPONEN") {
    //             this.isItems = true;
    //         }
    //         else {
    //             this.isItems = false;
    //         }
    //         // this.itemOptions.isSubconCutting = this.data.SubconCategory == "SUBCON CUTTING SEWING"? true:false;
    //     }

    // }

    searching() {
        {
        var info = {
            subconcontractNo : this.subconContract ? this.subconContract.ContractNo : "", 
            subconContractType : this.selectedContractType,  
            subconCategory   : this.selectedSubconCategory  
           
        }

         this.service.search(info)
            .then(result => {
                  this.data = result;
                  console.log(result);
                  var dataIN = [];
                  var dataOut = [];
                  this.contractNo = this.subconContract.ContractNo;
                  this.bpjNo = this.subconContract.BPJNo;
                  this.dueDate = moment(this.subconContract.DueDate).format("DD MMM YYYY");
                  
                  this.totalItemIN = 0;
                  this.totalItemOUT = 0;
                  this.totalSubconItem = 0;
                  this.totalLeftoverItemOUT = 0;
                  this.totalLeftoverItemIN = 0;

                  var rowDoc=[];
                var index=0;
                var indexNumb=0;
                  for (var item of this.data.IN){
 
                       
                        this.totalItemIN += item.quantityOut;
                        // let dup=this.data.IN.find(o=> o.bcNoOut == _data.bcNoOut);
                        //     // if(invoice){
                        //     //     invoice.rowspan=this.rowCount[_data.InvoiceNo];
                        //     // }

                        // // let bcno=result.data.find(o=> o.BCType + o.BCNo==b.BCType + b.BCNo);
                        //     if(dup){
                        //         if(dup.count ==0)
                        //         {
                        //             index++;
                        //             dup.count = index;
                        //         }
                        //     }
                        //     item.numb += dup.count ;
                            dataIN.push(item);
                        var doc=item.bcNoOut;
                   


                    if(!rowDoc[doc]){
                        index++;
                        //a.count=index;
                        rowDoc[doc]=1;
                    }

                    else{
                        rowDoc[doc]++;
                    }
                  }



                for (var _data of this.data.IN)
                {
                    console.log(_data.bcNoOut);
                    let bcNo=this.data.IN.find(o=> o.bcNoOut == _data.bcNoOut);
                            // if(invoice){
                            //     invoice.rowspan=this.rowCount[_data.InvoiceNo];
                            // }

                        // let bcno=result.data.find(o=> o.BCType + o.BCNo==b.BCType + b.BCNo);
                            if(bcNo){
                                bcNo.docspan=rowDoc[_data.bcNoOut];
                            }
                }


                var rowDocOut=[];
                var indexOut=0;
                  for (var item of this.data.Out){
 
                    dataOut.push(item);
                    this.totalItemOUT += item.quantityOut;
                    this.totalSubconItem = item.subconContractQuantity;
                    this.TotalLeftoverItemOUT = this.totalSubconItem - this.totalItemOUT;

                    var docOut=item.bcNoOut;
                    if(!rowDocOut[docOut]){
                        indexOut++;
                        //a.count=index;
                        rowDocOut[docOut]=1;
                    }

                    else{
                        rowDocOut[docOut]++;
                    }
                  }

                for (var _data of this.data.Out)
                {
                    console.log(_data.bcNoOut);
                    let bcNo2=this.data.Out.find(o=> o.bcNoOut == _data.bcNoOut);
                            // if(invoice){
                            //     invoice.rowspan=this.rowCount[_data.InvoiceNo];
                            // }

                        // let bcno=result.data.find(o=> o.BCType + o.BCNo==b.BCType + b.BCNo);
                            if(bcNo2){
                                bcNo2.docspanout=rowDocOut[_data.bcNoOut];
                            }
                }

                  this.IN = dataIN;
                  this.Out = dataOut;
                  this.totalLeftoverItemIN = this.totalItemOUT - this.totalItemIN;
             });   
        }   
    }

    ExportToExcel() {
        {
            var info = {
                subconcontractNo : this.subconContract ? this.subconContract.ContractNo : "",               
                subconContractType : this.selectedContractType,  
                subconCategory   : this.selectedSubconCategory  
            }

        this.service.generateExcel(info)
            .catch(e => {
                alert(e.replace(e, "Error: ",""))
            });
        }
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.buyerAgent = null;
        this.optionDate = null; 
        this.data = []; 
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    } 

    get subconContractLoader() {
        return SubconContractLoader;
    }
}