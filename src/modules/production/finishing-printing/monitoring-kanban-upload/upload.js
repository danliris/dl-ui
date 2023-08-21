import { inject, bindable, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { AuthService } from "aurelia-authentication";


@inject(Router, Service,AuthService)
export class Create {
    
    @bindable error = {};

    controlOptions = {
        label: {
          length: 4,
        },
        control: {
          length: 6,
        },
    };
    Machine = null;
    yearOptions = [];

    yearLabel = null;

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
        { text: "PRETREATMENT", value: 1},
        { text: "DYEING", value: 2 },
        { text: "PRINTING", value: 3 },
        { text: "FINISHING", value: 4 },
    ];

    constructor(router, service,authService) {
        this.router = router;
        this.service = service;
        this.authService = authService;
        this.data = {};
        this.showMonth = true;

        let yearList = []

        for (var i = 2021; i <= new Date().getFullYear() + 9; i++) {
            yearList.push({ text:i, value:i });
        }
        this.yearOptions = yearList
    }
    info=[];
    async bind(context) {
        this.context = context;
        this.info.month = this.monthOptions[new Date().getMonth()];
        this.info.year = new Date().getFullYear();
        this.infoAreaHard="";
    }
    
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
        this.disabled = true;
        let username=null;
        if (this.authService.authenticated) {
            const me = this.authService.getTokenPayload();
            username = me.username;
        }
        var e = {};
        var formData = new FormData();
        var fileInput = document.getElementById("fileCsv");
        
        var fileList = fileInput.files;
        
        if (fileList[0] == undefined) {
            e.file = "File Path harus dipilih";
            this.error = e;
        } 
        else {
            formData.append("file", fileList[0]);
           
            formData.append("monthId", this.info.month.value);
            formData.append("area", this.infoAreaHard);
            formData.append("month", this.info.month.text);
            formData.append("username", username);
            formData.append("year", this.info.year.value);
 
            var endpoint = 'UploadMonitoringKanban';
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
