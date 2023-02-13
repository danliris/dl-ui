import { inject, bindable, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

var MachineLoader = require("../../../loader/machines-loader");

console.log('masuk upload.js');
@inject(Router, Service)
export class Create {
    @bindable infoArea;
    // @bindable infoArea2;
    
    @bindable error = {};

    controlOptions = {
        label: {
          length: 4,
        },
        control: {
          length: 4,
        },
    };
    Machine = null;
    yearOptions = [];

    yearLabel = null;

    areaOptions = [];

    // areaOptions2 = [];

    disabled = false;

    monthOptions = [
        { text: "Januari", value: 1 },
        { text: "Februari", value: 2 },
        { text: "Maret", value: 3 },
        { text: "April", value: 4 },
        { text: "Mei", value: 5 },
        { text: "Juni", value: 6 },
        { text: "Juli", value: 7 },
        { text: "Agustus", value: 8 },
        { text: "September", value: 9 },
        { text: "Oktober", value: 10 },
        { text: "November", value: 11 },
        { text: "Desember", value: 12 },
    ];

    areaOptionsHard = [
        { text: "DIGITAL PRINT", value: 1 },
        { text: "DYEING", value: 2 },
        { text: "FINISHING", value: 3 },
        { text: "PRETREATMENT", value: 4 },
        { text: "PRINTING", value: 5 },
            ];

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
        this.showMonth = true;

        let yearList = []

        for (var i = 2021; i <= new Date().getFullYear() + 9; i++) {
            yearList.push({ text:i, value:i });
        }
        this.yearOptions = yearList
    }
    
    async bind(context) {
        this.context = context;
        this.infoArea = "";
        // this.infoArea2 = "";
        this.info.month = this.monthOptions[new Date().getMonth()];
        this.info.year = new Date().getFullYear();
        this.infoAreaHard="";
    }
    areaOptions
    async activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.service.getArea().then(result1 => {
            let areaList = [];
            if (result1 !== null){ 
                result1.map(x => {
                    areaList.push({ text: x.name, value: x.id});
                
                    console.log(areaList);
                });
                
                this.areaOptions = areaList;
                this.infoArea = areaList[0];
            }
        });
        
    }

    // areaOptions2
    // async bind(context) {
    //     this.data = context.data;
    //     this.error = context.error;
    //     this.service.getAreaBaru().then(result => {
    //         let areaList2 = [];
    //         if (result !== null){ 
    //             result.map(x => {
    //                 areaList2.push({ text: x.name, value: x.id});
    //             });
    //             this.areaOptions2 = areaList2;
    //             this.infoArea2 = areaList2[0];
    //         }
    //     });
    // }

    list() {
        this.router.navigateToRoute('list');
    }

    infoAreaChanged(newValue) {
        if (newValue.text === 'Yarn Dyeing') {
            this.showMonth = false;
            this.yearLabel = "Periode"
        } else {
            this.yearLabel = null;
            this.showMonth = true;
        }
    }


    get machineLoader() {
        return MachineLoader;
    }
    
    cancelCallback(event) {
      this.list();
    }

    saveCallback(event) {
        console.log('masuk saveCallback');
        this.disabled = true;

        var e = {};
        var formData = new FormData();
        var fileInput = document.getElementById("fileCsv");
        console.log('fileInput : '+fileInput);
        // if(!fileInput.endsWith('.xlsx')&&!fileInput.endsWith('.xls')){
        //     alert("Silahkan Pilih File Excel");
        //     return false;
        // }
        var fileList = fileInput.files;
        console.log('fileList : '+fileList);
        if (fileList[0] == undefined) {
            e.file = "File Path harus dipilih";
            this.error = e;
        } else {
            formData.append("file", fileList[0]);
            //formData.append("area", this.infoArea.value);
            formData.append("area", this. infoAreaHard.value);
           
            formData.append("idMesin", this.Machine.Id);
           // formData.append("namaMesin", this.Machine.Name);
            formData.append("periode", this.info.month.value + "/" + this.info.year.value);
            //formData.append("areaName", this.infoArea.text);
            formData.append("areaName", this.infoAreaHard.text);
            formData.append("monthName", this.info.month.text);
 
            var endpoint = 'UploadExcel';
            var request = {
                method: 'POST',
                headers: {
                },
                body: formData
            };
 
            var promise = this.service.endpoint.client.fetch(endpoint, request);
            this.service.publish(promise);
            return promise.then(response => {
                if (response.status == 200) {
                    alert("Data Berhasil Diupload");
                    this.service.publish(promise);
                    this.list();
                }
                else if (response.status == 400) {
                    this.disabled = false;
                    response.json()
                        .then(result => {
                            alert(result.message);
                        });
                    this.router.navigateToRoute('upload');
                    this.service.publish(promise);
                }
            })
        }
    }

}
