import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

var SectionLoader = require('../../../loader/garment-sections-loader');

@inject(Service)
export class DataForm {

    constructor(service) {
        this.service = service;
    }
    activeTab = 0;
    changeRole(tab) {
        this.activeTab = tab;
        if (tab != 2) {
            this.context.saveCallback=null;
            this.context.cancelCallback=null;
        }
        else{
            this.context.saveCallback=this.save;
            this.context.cancelCallback=this.cancel;
        }
    }
    @bindable readOnly = false;
    @bindable title;

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };

    footerOptions = {
        label: {
            length: 3
        },
        control: {
            length: 2
        }
    };

    itemsColumns = [
        { header: "Unit", value: "UnitCode" },
        { header: "RO", value: "RONo" },
        { header: "Jumlah Stock", value: "StockQuantity" },
        { header: "Jumlah Keluar", value: "ExpenditureQuantity" },
    ]

    measureColumns = [
        { header: "No" },
        { header: "Length" },
        { header: "Width" },
        { header: "Height" },
        { header: "Qty Cartons" },
        { header: "CBM" },
    ]


    expenditureToOptions=["JUAL LOKAL", "LAIN-LAIN"];

    InvoiceTypeOptions=["DL", "SM"];
    PriceTypeOptions=["FOB", "CNF","CIF","CPT","FCA","CFR"];
    countries =
    ["", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre and Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts and Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

    get say(){
        var number= this.data.totalCartons;

        const first = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
        const tens = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
        const mad = ['', 'thousand', 'million', 'billion', 'trillion'];
        let word = '';

        for (let i = 0; i < mad.length; i++) {
            let tempNumber = number%(100*Math.pow(1000,i));
            if (Math.floor(tempNumber/Math.pow(1000,i)) !== 0) {
                if (Math.floor(tempNumber/Math.pow(1000,i)) < 20) {
                    word = first[Math.floor(tempNumber/Math.pow(1000,i))] + mad[i] + ' ' + word;
                } else {
                    word = tens[Math.floor(tempNumber/(10*Math.pow(1000,i)))] + '-' + first[Math.floor(tempNumber/Math.pow(1000,i))%10] + mad[i] + ' ' + word;
                }
            }

            tempNumber = number%(Math.pow(1000,i+1));
            if (Math.floor(tempNumber/(100*Math.pow(1000,i))) !== 0) 
                word = first[Math.floor(tempNumber/(100*Math.pow(1000,i)))] + 'hundred ' + word;
        }
            return word;

    }
    get sectionLoader() {
        return SectionLoader;
    }
    sectionView = (section) => {
        return `${section.Code} - ${section.Name}`
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.save= this.context.saveCallback;
        this.cancel=this.context.cancelCallback;
        this.Options = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            isEdit: this.context.isEdit,
            checkedAll: this.context.isCreate == true ? false : true 
        }
        
        if(this.activeTab!=2){
            this.context.saveCallback=null;
            this.context.cancelCallback=null;
        }
        else{
            this.context.saveCallback=this.save;
            this.context.cancelCallback=this.cancel;
        }
    }

    get addMeasurements() {
        return (event) => {
            this.data.Measurements.push({});
            this.data.Measurements.forEach((m, i) => m.MeasurementIndex = i);
        };
    }

    get removeMeasurements() {
        return (event) => {
            this.error = null;
            this.data.Measurements.forEach((m, i) => m.MeasurementIndex = i);
            //this.Options.error = null;
     };
    }

    get addItems() {
        return (event) => {
            this.data.Items.push({});
        };
    }

    get removeItems() {
        return (event) => {
            this.error = null;
     };
    }

}
