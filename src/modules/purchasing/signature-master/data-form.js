import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
var AccountLoader = require('../../../loader/account-signature-loader');
//var UnitLoader = require("../../../loader/garment-units-gmt-loader");
var UnitLoader = require("../../../loader/unit-loader");

@inject(BindingEngine, Element, Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable selectedAccount;
    @bindable options = { readOnly: false };
    //@bindable isEdit = false;

    get accountLoader() {
        return AccountLoader;
    }

    get unitLoader() {
        return UnitLoader;
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    };

    @bindable selectedUnit;
    async selectedUnitChanged(newVal) {
        this.data.Unit = newVal;
        this.data.UnitId = newVal.Id;
        this.data.UnitCode = newVal.Code;
        if (newVal) {
            this.data.UnitCode = newVal.Code;
            this.data.UnitId = newVal.Id;
            this.data.UnitName = newVal.Name;
        }
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    constructor(bindingEngine, element, service) {
        this.bindingEngine = bindingEngine;
        this.element = element;
        this.service = service;
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.options.readOnly = this.readOnly;
        if(this.data.Id){
            this.selectedAccount= {
                username: this.data.UserName,
                _id:this.data.AccountId,
                profile:{
                    firstname: this.data.FirstName,
                    lastname:this.data.LastName 
                }
            };
            this.selectedUnit= this.data.Unit;
            this.ImageSrc=this.data.SignatureImage;
        }
    }

    selectedAccountChanged(newValue, oldValue){
        var selectedAccount = newValue;
        if (selectedAccount) {
            if (selectedAccount._id) {
                this.data.FirstName = selectedAccount.profile.firstname;
                this.data.LastName = selectedAccount.profile.lastname;
                this.data.AccountId = selectedAccount._id;
                this.data.UserName = selectedAccount.username;
            }
        } else {
            this.data.FirstName = "";
            this.data.LastName = "";
            this.data.AccountId = 0;
            this.data.UserName = "";
        }
    }

    @bindable imageUpload;
    @bindable imageSrc;
    
    onFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
    
            reader.onload =async (e) => {
                const base64 = e.target.result;
                const compressed = await this.compressBase64Image(base64, 200, 0.7); // max width 500px, quality 70%

                this.ImageSrc = compressed; // preview image
                this.data.SignatureImage = compressed; // simpan ke data model
            };
            
            reader.readAsDataURL(file); // convert ke base64
        }
    }

    async compressBase64Image(base64, maxWidth = 500, quality = 0.7) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let scale = maxWidth / img.width;
                canvas.width = maxWidth;
                canvas.height = img.height * scale;
    
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
                const compressedBase64 = canvas.toDataURL('image/jpeg', quality); // output JPEG
                resolve(compressedBase64);
            };
            img.src = base64;
        });
    }
} 

