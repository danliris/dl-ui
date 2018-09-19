import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
import { Service } from './service';

import CCLoader from "../../../loader/cost-calculation-garment-loader";
import AccountBankLoader from "../../../loader/account-banks-loader";

@inject(BindingEngine, Service, Element)
export class DataForm {
  @bindable isCreate = false;

  @bindable readOnly = false;
  @bindable data = {};
  @bindable error = {};
  @bindable hasItems=false;
  lampHeader = [{ header: "Standar Lampu" }];

  DeliveryOptions = ["BY SEA", "BY AIR", "BY SEA-AIR"];

  countries =
    ["", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre and Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts and Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

  filterBank = {
    "DivisionName.toUpper()":"GARMENT"
  };


  constructor(bindingEngine, service, element) {
    this.bindingEngine = bindingEngine;
    this.element = element;
    this.service = service;
  }

  async bind(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.data.CreatedUtc=this.data.CreatedUtc?this.data.CreatedUtc:new Date();
    if(this.data.SalesContractNo){
      this.selectedRO={
        RO_Number:this.data.RONumber
      }
      if(this.data.AccountBankId||this.data.AccountBank.Id){
        var accId=this.data.AccountBankId?this.data.AccountBankId:this.data.AccountBank.Id;
        this.selectedAccountBank=await this.service.getAccountBankById(accId);
      }
      this.data.UomUnit=this.data.Uom.Unit;
    }
    this.hasItems=false;
    if(this.data.Items)
      if(this.data.Items.length>0){
        this.data.Amount=0;
        for(var item of this.data.Items){
          item.Uom=this.data.Uom.Unit;
          item.PricePerUnit=this.data.Uom.Unit;
          this.data.Amount+=item.Price*item.Quantity;
        }
        this.hasItems=true;
        console.log(this.hasItems)
      }

  }


  @bindable selectedRO;
  selectedROChanged(newValue, oldValue) {
    //this.data.Buyer = newValue;
    if(oldValue)
      if(newValue.RO_Number!=oldValue.RO_Number){
        this.data.BuyerName= "";
        this.data.BuyerId="";
        this.data.RONumber="";
        this.data.Quantity=0;
        this.data.Article="";
        this.data.ComodityId="";
        this.data.Comodity="";
        this.data.Uom=null;
        this.data.UomId="";
        this.data.UomUnit="";
        this.data.Price=0;
        this.data.Items = [];
      }
    if (newValue) {
      this.data.RONumber=newValue.RO_Number;
      if(newValue.Id){
        this.data.BuyerName= newValue.Buyer.Name;
        this.data.BuyerId=newValue.Buyer._id;
        this.data.Quantity=newValue.Quantity;
        this.data.Article=newValue.Article;
        this.data.ComodityId=newValue.Commodity._id;
        var como=null;
        if(this.data.ComodityId){
          como=this.service.getComodityById(this.data.ComodityId);
        }
        if(como!=null){
          this.data.Comodity=newValue.Commodity.name;
          this.data.ComodityCode=newValue.Commodity.code;
        }
        
        this.data.Uom=newValue.UOM;
        this.data.UomId=newValue.UOM._id;
        this.data.UomUnit=newValue.UOM.unit;
        this.data.Price=newValue.ConfirmPrice;
        if(this.data.Items.length==0){
          this.data.Amount=this.data.Price*this.data.Quantity;
        }
      }
      
    } else {
      this.data.BuyerName= "";
      this.data.BuyerId="";
      this.data.RONumber="";
      this.data.Quantity=0;
      this.data.Article="";
      this.data.ComodityId="";
      this.data.Comodity="";
      this.data.Uom=null;
      this.data.UomId="";
      this.data.UomUnit="";
      this.data.Price=0;
      this.data.Items = [];
    }
  }

  @bindable selectedAccountBank;
  selectedAccountBankChanged(newValue, oldValue) {
    if (newValue) {
      this.data.AccountBank =newValue;
    } else {
      this.data.AccountBank = null;
    }
  }


  get detailHeader() {
      return [{ header: "Keterangan" }, { header: "Quantity" }, { header: "Satuan" }, { header: "Harga" },{ header: "Satuan Harga" }];
  }

  itemsInfo = {
    onAdd: function () {
      this.data.Items.push({
        Uom: this.data.UomUnit,
        Description: '',
        Price: 0,
        Quantity: 0,
        PricePerUnit: this.data.UomUnit
      });
    }.bind(this)
  }

  get roLoader() {
    return CCLoader;
  }

  roView(cc) {
    return `${cc.RO_Number} ` ;
  }

  get accountBankLoader() {
    return AccountBankLoader;
  }

  bankView(bank) {
    return bank.AccountName ? `${bank.AccountName} - ${bank.BankName} - ${bank.AccountNumber} - ${bank.Currency.Code}` : '';
  }

  controlOptions = {
    label: {
      length: 4
    },
    control: {
      length: 7,
      align: "right"
    }
  }

  itemsChanged(e){
    this.hasItems=true;
    this.data.Price=0;
    this.data.Amount=0;
    if(this.data.Items){
      for(var item of this.data.Items){
        if(item.Price && item.Quantity){
          this.data.Amount+=item.Price*item.Quantity;
        }
      }
    }
  }

  get removeItems() {
    return (event) => //console.log(event.detail);
    {
        if(this.data.Items){
          for(var item of this.data.Items){
            if(item.Price && item.Quantity){
              this.data.Amount+=item.Price*item.Quantity;
          }
        }
      }
      if(this.data.Items.length==0){
        this.data.Amount=this.data.Price*this.data.Quantity;
        this.hasItems=false;
        console.log(this.hasItems);
      }
    }
  }
}
