import { inject, bindable, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Create {
    @bindable error = {};

    controlOptions = {
        label: {
          length: 4,
        },
        control: {
          length: 4,
        },
    };

    yearOptions = [];

    areaOptions = [];

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

        let yearList = []
        for (var i = new Date().getFullYear(); i > 2010; i--) {
            yearList.push({ text:i, value:i });
        }
        this.yearOptions = yearList
    }
    
    async bind(context) {
        this.context = context;
        this.info.area = "";
        this.info.month = this.monthOptions[new Date().getMonth()];
        this.info.year = new Date().getFullYear();
        
        console.log(this.areaOptions);
        console.log(this.info.area);
    }

    async activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.service.getArea().then(result => {
            let areaList = [];
            if (result !== null){ 
                result.map(x => {
                    areaList.push({ text: x.name, value: x.id});
                });
                this.areaOptions = areaList;
                this.info.area = areaList[0];
            }
        });
    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
      this.list();
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
            formData.append("file", fileList[0]);
            formData.append("area", this.info.area.value);
            formData.append("periode", this.info.month.value + "/" + this.info.year.value);
            formData.append("areaName", this.info.area.text);
            formData.append("monthName", this.info.month.text);
 
            var endpoint = 'UploadExcel';
            var request = {
                method: 'POST',
                headers: {
                },
                body: formData
            };
 
            this.service.endpoint.client.fetch(endpoint, request)
                .then(response => {
                    if (response.status == 200) {
                        
                        alert("Data Berhasil Diupload");
                        this.list();
                    }
                    else if (response.status == 400) {
                        response.json()
                            .then(result => {
                                alert(result.message);
                            });
                        // alert(response.data.message);
                    }
                })
        }
    }

}
