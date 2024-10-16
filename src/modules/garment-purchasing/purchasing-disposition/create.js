import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import {activationStrategy} from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class Create {
    hasCancel = true;
    hasSave = true;
    hasCreate = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.isView=false;
    }

    activate(params) {

    }
    
    bind() {
        this.data = { items: [] };
        this.dataConv = {};
        this.error = {};
    }

    cancel(event) {
        if (confirm(`Apakah Anda yakin akan kembali?`))
            this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    save() {
        var isOver=false;
        var poItem=[];
        var bodyRequest = {};
        bodyRequest.Amount = this.data.Amount;
        bodyRequest.Bank = this.data.Bank;
        bodyRequest.Category = this.data.Category;
        //bodyRequest.Currency = this.data.Currency;
        bodyRequest.CurrencyCode = this.data.CurrencyCode;
        bodyRequest.CurrencyDate = this.data.CurrencyDate;
        bodyRequest.CurrencyId = this.data.CurrencyId;
        bodyRequest.CurrencyName = this.data.CurrencyName;
        bodyRequest.DPP = this.data.DPP;
        bodyRequest.Id = this.data.Id;
        bodyRequest.IncomeTaxValue = this.data.IncomeTaxValue;
        bodyRequest.IncomeTaxValueView = this.data.IncomeTaxValueView;
        bodyRequest.MiscAmount = this.data.MiscAmount;
        bodyRequest.PaymentDueDate = this.data.PaymentDueDate;
        bodyRequest.PaymentType = this.data.PaymentType;
        bodyRequest.ProformaNo = this.data.ProformaNo;
        bodyRequest.Remark = this.data.Remark;
        //bodyRequest.Supplier = this.data.Supplier;
        bodyRequest.SupplierCode = this.data.SupplierCode;
        bodyRequest.SupplierId = this.data.SupplierId;
        bodyRequest.SupplierIsImport = this.data.SupplierIsImport;
        bodyRequest.SupplierName = this.data.SupplierName;
        bodyRequest.VatValue = this.data.VatValue;
        bodyRequest.VatValueView = this.data.VatValueView;
        bodyRequest.ConfirmationOrderNo = this.data.ConfirmationOrderNo;
        bodyRequest.Items = [];
        if(this.data.Items){
            this.data.Items.forEach(element => {
                element.Items.forEach(item =>{
                    console.log(element)
                    var itemDisp ={};
                    itemDisp.CurrencyRate = item.CurrencyRate;
                    itemDisp.DPPValue = item.DPPValue;
                    itemDisp.DispositionAmountCreated = item.DispositionAmountCreated;
                    itemDisp.DispositionPaidCreated=item.DispositionPaidCreated;
                    itemDisp.EPOId = item.EPOId;
                    itemDisp.EPONo = item.EPONo;
                    itemDisp.IncomeTax = item.IncomeTax;
                    itemDisp.IncomeTaxId = item.IncomeTaxIdId;
                    itemDisp.IncomeTaxName = item.IncomeTaxName;
                    itemDisp.IncomeTaxRate = item.IncomeTaxRate;
                    itemDisp.IncomeTaxValue = item.IncomeTaxValue;
                    itemDisp.IncomeTaxValueView = item.IncomeTaxValueView;
                    itemDisp.IsIncomeTax = item.IsIncomeTax;
                    itemDisp.IsPayIncomeTax = item.IsPayIncomeTax;
                    itemDisp.IsPayVAT = item.IsPayVAT;
                    itemDisp.IsUseIncomeTax = item.IsUseIncomeTax;
                    itemDisp.IsUseVat = item.IsUseVat;
                    itemDisp.VatId = item.VatId;
                    itemDisp.VatRate = item.VatRate;
                    itemDisp.VatValue = item.VatValue;
                    itemDisp.VatValueView = item.VatValueView;
                    itemDisp.Details = item.Details;
                    itemDisp.Invoice = element.Invoice;
                    itemDisp.CurrencyCode = this.data.CurrencyCode;
                    itemDisp.CurrencyDate = this.data.CurrencyDate;
                    itemDisp.CurrencyId = this.data.CurrencyId;
                    bodyRequest.Items.push(itemDisp);
                });
            });
    
            this.dataConv = bodyRequest;
    
            //console.log(this.dataConv);
            if(this.dataConv.Items){
                this.dataConv.Amount=0;
                this.dataConv.IncomeTaxValue=0;
                this.dataConv.IncomeTaxValueView=0;
                this.dataConv.DPP=0;
                this.dataConv.VatValue=0;
                this.dataConv.VatValueView = 0;
                var incomeTaxCalculate = 0;
                var vatCalculate = 0;
                for(var item of this.dataConv.Items){
                    if(item.Details){
                        for(var detail of item.Details){
                            if(!poItem[detail.IPONo]){
                                poItem[detail.IPONo]=detail.QTYRemains;
                            }
                            else{
                                if(poItem[detail.IPONo]<=0){
                                    isOver=true;
                                    alert("QTY PO dengan nomor "+detail.IPONo+" sudah melebihi alokasi.")
                                    break;
                                }
                                poItem[detail.IPONo]-=detail.QTYPaid;
                                detail.QTYRemains=poItem[detail.IPONo];
                            }
                        }
                    }
                            var pph=0;
                            var pphView=0;
                            var ppn=0;
                            var ppnView =0;
                            if (item.IsIncomeTax) {
                              // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                              // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                              pphView = item.IncomeTaxValueView;
                            }
                            if (item.IsPayIncomeTax) {
                                // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                                // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                                pph = item.IncomeTaxValue;
                            }
                            if (item.IsPayVAT) {
                                // ppn=detail.PriceTotal*0.1;
                                ppn = item.VatValue;
                            }
                            if (item.IsUseVat) {
                                // ppn=detail.PriceTotal*0.1;
                                ppnView = item.VatValueView;
                            }
                            this.dataConv.IncomeTaxValue+=pphView;
                            this.dataConv.IncomeTaxValueView +=pphView;                        
                            this.dataConv.VatValue+=ppnView;
                            this.dataConv.VatValueView+=ppnView;                        
                            this.dataConv.DPP+=item.DPPValue;
                            incomeTaxCalculate +=pph;
                            vatCalculate +=ppn;
                            // if(this.data.IncomeTaxBy=="Supplier"){
                            //     this.data.Amount+=detail.PaidPrice+ppn;
                            // }
                            // else
                            //     this.data.Amount+=detail.PaidPrice+ppn+pph;
                    //     }
                    // }
                }
                // this.data.Amount =(this.data.DPP+this.data.VatValue+this.data.MiscAmount)-this.data.IncomeTaxValue;
                this.dataConv.Amount = parseFloat((this.dataConv.DPP+vatCalculate+this.dataConv.MiscAmount)-incomeTaxCalculate).toFixed(3);
                // this.data.IncomeTaxValue = this.data.IncomeTaxValueView;
                // this.data.VatValue = this.data.VatValueView;   
            }
            
    
            // let filledData = this.dataConv.Items.filter(function (item) {
            //     return item.EPONo != undefined;
            // });
            // var valueArr = filledData.map(function (item) { return item.EPONo });
    
            // var isDuplicate = valueArr.some(function (item, idx) {
            //     return valueArr.indexOf(item, idx + 1) !== -1
            // });
        }
        

        // console.log("data bawah",this.data);
        // console.log("item bawah",this.data.Items);


        // if(this.data.Items){
        //     this.data.Amount=0;
        //     this.data.IncomeTaxValue=0;
        //     this.data.IncomeTaxValueView=0;
        //     this.data.DPP=0;
        //     this.data.VatValue=0;
        //     this.data.VatValueView = 0;
        //     var incomeTaxCalculate = 0;
        //     var vatCalculate = 0;
        //     for(var item of this.data.Items){
        //         // if(item.Details){
        //         //     for(var detail of item.Details){
        //                 var pph=0;
        //                 var pphView=0;
        //                 var ppn=0;
        //                 var ppnView =0;
        //                 if (item.IsIncomeTax) {
        //                   // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
        //                   // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
        //                   pphView = item.IncomeTaxValueView;
        //                 }
        //                 if (item.IsPayIncomeTax) {
        //                     // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
        //                     // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
        //                     pph = item.IncomeTaxValue;
        //                 }
        //                 if (item.IsPayVAT) {
        //                     // ppn=detail.PriceTotal*0.1;
        //                     ppn = item.VatValue;
        //                 }
        //                 if (item.IsUseVat) {
        //                     // ppn=detail.PriceTotal*0.1;
        //                     ppnView = item.VatValueView;
        //                 }
        //                 this.data.IncomeTaxValue+=pphView;
        //                 this.data.IncomeTaxValueView +=pphView;                        
        //                 this.data.VatValue+=ppnView;
        //                 this.data.VatValueView+=ppnView;                        
        //                 this.data.DPP+=item.DPPValue;
        //                 incomeTaxCalculate +=pph;
        //                 vatCalculate +=ppn;
        //                 // if(this.data.IncomeTaxBy=="Supplier"){
        //                 //     this.data.Amount+=detail.PaidPrice+ppn;
        //                 // }
        //                 // else
        //                 //     this.data.Amount+=detail.PaidPrice+ppn+pph;
        //         //     }
        //         // }
        //     }
        //     // this.data.Amount =(this.data.DPP+this.data.VatValue+this.data.MiscAmount)-this.data.IncomeTaxValue;
        //     this.data.Amount = parseFloat((this.data.DPP+vatCalculate+this.data.MiscAmount)-incomeTaxCalculate).toFixed(3);
        //     // this.data.IncomeTaxValue = this.data.IncomeTaxValueView;
        //     // this.data.VatValue = this.data.VatValueView;   
        // }
        

        // let filledData = this.data.Items.filter(function (item) {
        //     return item.EPONo != undefined;
        // });
        // var valueArr = filledData.map(function (item) { return item.EPONo });

        // var isDuplicate = valueArr.some(function (item, idx) {
        //     return valueArr.indexOf(item, idx + 1) !== -1
        // });

        // console.log("data bawah",this.data);
        // console.log("item bawah",this.data.Items);
        



        //if(!isDuplicate){
        if(!isOver){
            this.service.create(this.dataConv)
            .then(result => {
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
            })
            .catch(e => {
                if (e.statusCode == 500) {
                    alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
                } else {
                    this.error = e;
                }
            })
        }
        
        // }
        // else{
        //     alert("Terdapat No. PO External yang Sama");
        // }


        // this.service.create(this.data)
        //     .then(result => {
        //         alert("Data berhasil dibuat");
        //         console.log(this.data);
        //         this.router.navigateToRoute('create',{}, { replace: true, trigger: true });
        //     })
        //     .catch(e => {
        //         if (e.statusCode == 500) {
        //             alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
        //         } else {
        //             this.error = e;
        //         }
        //     })


        // console.log(this.data);
    }
}
