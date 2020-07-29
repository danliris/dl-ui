import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
import { Service } from "./service";
import { CoreService } from "./service";
var InvoiceLoader = require('../../../loader/garment-packing-list-not-used-loader');
var AccountBankLoader = require('../../../loader/account-banks-loader');
var FabricTypeLoader = require('../../../loader/fabric-type-loader');
var ShippingStaffLoader = require('../../../loader/garment-shipping-staff-loader');


@inject(Service , CoreService)
export class DataForm {
    @bindable packinglists;
    @bindable shippingStaff;
    @bindable bankAccount;
    @bindable fabricType;
    @bindable data = {};
    @bindable items = {};
    @bindable readOnly = false;
     @bindable read = true;
    @bindable isCreate = false;
     @bindable isEdit = false;
     @bindable isUsed =false;
    
    constructor(service,coreService) {
        this.service = service;
        this.coreService = coreService;
    }
    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.save= this.context.saveCallback;
        this.cancel=this.context.cancelCallback;
        this.options = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            isEdit: this.context.isEdit,
            isUsed : this.context.isUsed
          
        }
        this.isEdit= this.context.isEdit;
     if(this.data.id !=undefined)
     {
           
             this.coreService.getBankAccountById(this.data.bankAccountId)
             .then(result=>{
            
                this.bankAccount =
                {
                   Id : this.data.bankAccountId,
                   BankName : result.BankName,
                   Currency : {
                       Code : result.Currency.Code
                   }
                } ;
                this.data.bankAccount = result.BankName;
             });
             this.shippingStaff= {
                Id : this.data.shippingStaffId,
                Name : this.data.shippingStaff
             }
             this.fabricType ={
                 Id :this.data.fabricTypeId,
                Name :this.data.fabricType}
          
            this.data.bankAccountId = this.data.bankAccountId;
            this.packinglists = this.data.invoiceNo;
     }  
    }

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

    paymentDueOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };

    get invoiceLoader() {
        return InvoiceLoader;
    }

    invoiceView = (inv) => {
        return `${inv.invoiceNo}`;
    }

    get accountBankLoader() {
        return AccountBankLoader;
    }

    accountBankView = (acc) => {
        return `${acc.BankName} - ${acc.Currency.Code }`;
    }

    get shippingStaffLoader() {
        return ShippingStaffLoader;
    }

    shippingStaffView = (acc) => {
        return `${acc.Name}`;
    }

    get fabricTypeLoader() {
        return FabricTypeLoader;
    }

    fabricTypeView = (acc) => {
        return `${acc.Name}`;
    }

    shippingStaffChanged(newValue,oldValue)
    {
        var selectedShipping = newValue;
        if(selectedShipping && this.data.id == undefined)
        {
            this.data.shippingStaffId = selectedShipping.Id;
            this.data.shippingStaff= selectedShipping.Name;
        }
    }
    bankAccountChanged(newValue,oldValue)
    {
        var selectedAccount = newValue;
        if(selectedAccount)
        {
            
            this.data.bankAccountId = selectedAccount.Id;
          
            this.data.bankAccount= selectedAccount.BankName;
        
        }
    }
    
    fabricTypeChanged(newValue,oldValue)
    {
        var selectedfabric = newValue;
        if(selectedfabric )
        {
            this.data.fabricTypeId = selectedfabric.Id;
            this.data.fabricType= selectedfabric.Name;
        }
    }
    async packinglistsChanged(newValue, oldValue) {
        var selectedInv = newValue;
        if (selectedInv && this.data.id == undefined ) {
       
            this.data.packinglistId= selectedInv.id;
            this.data.invoiceNo = selectedInv.invoiceNo;
            this.data.invoiceDate =  selectedInv.date ;
          
           
            this.data.section =
            {
                id : selectedInv.section.id,
                code : selectedInv.section.code
            }
            this.data.buyerAgent = 
            {
                id : selectedInv.buyerAgent.id,
                code : selectedInv.buyerAgent.code,
                name : selectedInv.buyerAgent.name
            };
            this.data.lcNo = selectedInv.lcNo;
            this.data.issuedBy = selectedInv.issuedBy;
           
            var packingItem= await this.service.getPackingListById(selectedInv.id);
            var buyer= await this.coreService.getBuyerById(this.data.buyerAgent.id);
            this.data.consigneeAddress= buyer.Address;
            this.data.items.splice(0);
            this.data.garmentShippingInvoiceAdjustments.splice(0);
            var consignee="";
            var TotalAmount=0;
            var _consignee="";
            for (var item of packingItem.items) {
                    var _item = {};
                    _item.roNo= item.roNo;
                    _item.scNo = item.scNo;
                    _item.price= item.price;
                    _item.priceRO= item.priceRO;
                    _item.quantity= item.quantity;
                    _item.comodity= {
                           id : item.comodity.id,
                           code : item.comodity.code,
                           name : item.comodity.name 

                    };
                    _item.buyerBrand= {
                        id : item.buyerBrand.id,
                        code : item.buyerBrand.code,
                        name : item.buyerBrand.name 

                    };
                    _item.uom= {
                        id : item.uom.id,
                        unit : item.uom.unit 

                    };
                    _item.unit= {
                        id : item.unit.id,
                        code : item.unit.code,
                        name : item.unit.name 

                    };
                    _item.amount = item.amount;
                    _item.currencyCode = item.valas;
                    consignee += item.buyerBrand.name;
                    TotalAmount= TotalAmount + item.amount;
                    this.data.items.push(_item);
                    _consignee += item.buyerBrand.name +"\n";
            }
            this.data.totalAmount= TotalAmount;
            
            this.data.consignee = _consignee;
          
        }
        // else
        // {
        //     this.data.packinglistId= null;
        //     this.data.invoiceNo = selectedInv.invoiceNo;
        //     this.data.invoiceDate = null ;
           
        //     this.data.section ={};
        //     this.data.buyerAgent = {};
        //     this.data.lcNo = null;
        //     this.data.issuedBy = null;
        //     this.data.items.slice(0);
        // }
       
    }
    packinglistColumns = {
        columns: [
          { header: "RoNo" ,value : "roNo"},
          { header: "SCNo" ,value :"scNo"},
          { header: "Buyer Brand",value : "buyerBrand.name" },
          { header: "Komoditi", value: "comodity.name" },
          { header: "D e s k r i p s i", value: "comodityDesc" },
          { header: "Qty", value: "quantity" },
          { header: "Satuan", value: "uom.unit" },
          { header: "Price RO", value: "priceRO" },
          { header: "Price", value: "price" },
          { header: "Currency", value: "currencyCode" },
          { header: "Amount", value: "amount" },
          { header: "Unit", value: "unit.code" },
          { header: "CMT Price", value: "cmtPrice" },
          { header: "Amount CMT", value: "cmtAmount" },
        ],
        onAdd: function () {
       
          this.data.items.push({
            roNo: this.data.roNo,
            scNo: this.data.scNo,
            buyerBrand: this.data.buyerBrand,
            comodity : this.data.comodity,
            comodityDesc: this.data.comodityDesc,
            quantity: this.data.quantity,
            uOMUnit: this.data.uom,
            priceRO: this.data.priceRO,
            price: this.data.price,
            currencyCode: this.data.currencyCode,
            amount: this.amount,
            unit: this.data.unit,
            cmtPrice : this.data.cmtPrice
          });
          this.data.items.forEach((m, i) => m.MaterialIndex = i);
        
        }.bind(this),
        onRemove: function () {
          this.data.items.forEach((m, i) => m.MaterialIndex = i);
        }.bind(this),
        options: {}
      }
 
      adjustmentColumns = {
        columns: [
          { header: "Penambahan/Pengurangan" },
          { header: "Nilai" },
         
        ],
        onAdd: function () {
          this.data.garmentShippingInvoiceAdjustments.push({
            adjustmentDescription: this.data.adjustmentDescription,
            adjustmentValue: this.data.adjustmentValue
          });
          this.data.garmentShippingInvoiceAdjustments.forEach((m, i) => m.MaterialIndex = i);
        }.bind(this),
        onRemove: function () {
          this.data.garmentShippingInvoiceAdjustments.forEach((m, i) => m.MaterialIndex = i);
        }.bind(this),
        options: {}
      }

    fabricTypeOptions=["Polyester/Cotton ( T/C )", "Cotton/Polyester ( CVC )","Cotton","Viscose","Viscose Polyester","Viscose Fujiette","Polyester"];

   
    countries =
    ["", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre and Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts and Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

    
    get amountToBePaid(){
        var totalAmount=0;
        var amountisCmt=0;
        var amountAll=0;
        var amountCMT=0;
        var adjustmentValue=0;
        var total=0;
        if(this.data.items){
            for(var item of this.data.items){
                if(this.data.totalAmount >0)
                {total = this.data.totalAmount};
                if(item.quantity)
                {
                    amountAll = amountAll + item.amount;
                    if(item.cmtPrice >0)
                    {
                            amountisCmt += item.quantity * item.price;
                            amountCMT += item.quantity * item.cmtPrice;
                    }
              
                totalAmount = amountAll - amountisCmt + amountCMT;        
                }
            }
            }

            if(this.data.garmentShippingInvoiceAdjustments)
            {
                for(var item of this.data.garmentShippingInvoiceAdjustments)
                {
                    if(item.adjustmentValue)
                    {
                    adjustmentValue = adjustmentValue + item.adjustmentValue;
                    }
                }
            }
   
       this.data.amountToBePaid =  totalAmount + adjustmentValue;
        return  totalAmount + adjustmentValue;
    }
    get totalAmounts(){
        var totalAmount=0;
       
        if(this.data.items){
          
            for(var item of this.data.items){
                
                   if(item.amount >0)
                   {
                    totalAmount =totalAmount + (item.price * item.quantity);        
                   }else
                   {
                    totalAmount =0;
                   }
            }
        }
     
       this.data.totalAmount = totalAmount;
        return totalAmount;
    }
    get sectionLoader() {
        return SectionLoader;
    }
    sectionView = (section) => {
        return `${section.Code} - ${section.Name}`
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
