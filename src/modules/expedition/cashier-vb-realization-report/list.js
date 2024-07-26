import { inject, bindable } from "aurelia-framework";
import moment from "moment";
import numeral from "numeral";
import { Service } from "./service";

@inject(Service)
export class List {

  constructor(service) {
    this.service = service;
    this.info = {};
    this.error = {};
    this.data = [];
  }

  approvalStartDate = null;
  approvalEndDate = null;

  realizeStartDate = null;
  realizeEndDate = null;

  divisions = null;
  inklaringTypes = null;

  divisions = ['GARMENT', 'TEXTILE']; 
  inklaringTypes = ['', 'YA', 'TIDAK'];

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

searching() {
        {
        var info = {
            divisionName : this.divisionName ? this.divisionName : "",  
            isInklaring : this.isInklaring ? this.isInklaring : "",  
                    
            approvalDateFrom : this.approvalStartDate ? moment(this.approvalStartDate).format("YYYY-MM-DD") : "",
            approvalDateTo : this.approvalEndDate ? moment(this.approvalEndDate).format("YYYY-MM-DD") : "",

            realizeDateFrom : this.realizeStartDate ? moment(this.realizeStartDate).format("YYYY-MM-DD") : "",
            realizeDateTo : this.realizeEndDate ? moment(this.realizeEndDate).format("YYYY-MM-DD") : ""
         }

        console.log(info);

         this.service.search(info)
            .then(result => {
                  this.data = result;
                  console.log(result);
                  var datas = [];
                  for (var item of this.data){

                      item.RealizationDate=moment(item.RealizationDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(item.ApprovalDate).format("DD MMM YYYY");
                
                      item.Amount=item.Amount.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
              
                      datas.push(item);
                  }
                  this.data = datas;
             });   
        }   
    }

   ExportToExcel() {
        {
            var info = {
                divisionName : this.divisionName ? this.divisionName : "",  
                isInklaring : this.isInklaring ? this.isInklaring : "",      
                approvalDateFrom : this.approvalStartDate ? moment(this.approvalStartDate).format("YYYY-MM-DD") : "",
                approvalDateTo : this.approvalEndDate ? moment(this.approvalEndDate).format("YYYY-MM-DD") : "",
                realizeDateFrom : this.realizeStartDate ? moment(this.realizeStartDate).format("YYYY-MM-DD") : "",
                realizeDateTo : this.realizeEndDate ? moment(this.realizeEndDate).format("YYYY-MM-DD") : ""
            }

        this.service.generateExcel(info)
            .catch(e => {
                alert(e.replace(e, "Error: ",""))
            });
        }
    }

 reset() {
        this.approvalStartDate = null;
        this.approvalEndDate = null;
        this.realizeStartDate = null;
        this.realizeEndDate = null;
        this.divisionName = null;
        this.isInklaring = null; 
        this.data = []; 
    }

}
