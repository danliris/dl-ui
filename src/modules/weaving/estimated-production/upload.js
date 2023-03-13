import { inject, bindable, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

console.log('masuk upload.js');
@inject(Router, Service)
export class Create {
    @bindable infoArea;
    @bindable error = {};

    controlOptions = {
        label: {
          length: 4,
        },
        control: {
          length: 6,
        },
    };
    yearOptions = [];

    yearLabel = null;

   

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
       // this.info.month = this.monthOptions[new Date().getMonth()];
        //this.info.year = new Date().getFullYear();
        
    }
    areaOptions
    async activate(context) {
        this.data = context.data;
        this.error = context.error; 
    }
 
    cancelCallback(event) {
     
    this.router.navigateToRoute("list");
    }

    saveCallback(event) {
        var e = {};
        var formData = new FormData();
        var fileInput = document.getElementById("fileCsv");
        var fileList = fileInput.files;
       
          if (fileList[0] == undefined) {
            e.file = "File Path harus dipilih";
            this.error = e;
         
        } else {
            
            formData.append("fileUpload", fileList[0]);

            var endpoint = `weaving/daily-operations-warping/upload?month=${this.info.month.text}&year=${this.info.year.value}&monthId=${this.info.month.value}`;
            var request = {
                method: 'POST',
                headers: {
                },
                body: formData
            };
            var promise = this.service.endpoint.client.fetch(endpoint, request);
            this.service.publish(promise);
            return promise
                .then((result) => {
                    this.service.publish(promise);
                    if ( result.status == 500) {
                        var getRequest = this.service.endpoint.client.fetch(endpoint, request);
                        result.json()
                        .then(result => {
                            alert(result.message + " Inputan Data harus benar");
                        });
                    }
                    else if (result.status == 404) {
                        alert("Data gagal disimpan. Hubungi Administrator");
                    }
                    else{
                        alert("Data Berhasil Diupload");
                        document.getElementById("fileCsv").value = "";
            
                    }
                    return Promise.resolve(result);
                });

            }
    }

}
