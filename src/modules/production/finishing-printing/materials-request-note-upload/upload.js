import { inject, bindable, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';
import { AuthService } from "aurelia-authentication";

var UnitLoader = require('../../../../loader/unit-loader');

@inject(Router, Service,AuthService)
export class Create {
    
    @bindable error = {};
    @bindable unitFilter = { "DivisionName": "DYEING & PRINTING" };

    controlOptions = {
        label: {
          length: 3,
        },
        control: {
          length: 4,
        },
    };

    get unitLoader() {
        return UnitLoader;
    }

    disabled = false;

    constructor(router, service,authService) {
        this.authService=authService;
        this.router = router;
        this.service = service;
        this.data = {};
    }
    
    async bind(context) {
        this.context = context;
    }
    
    list() {
        this.router.navigateToRoute('list');
    }

    unitView = (unit) => {
        return `${unit.Name}`
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
        } else {
            formData.append("file", fileList[0]);
            formData.append("unitId", this.unit.Id);
            formData.append("unitName", this.unit.Name);
            formData.append("date", moment(this.date).format("DD MMM YYYY"));
            formData.append("username", username);
 
            var endpoint = 'UploadExcelMaterialRequest';
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
