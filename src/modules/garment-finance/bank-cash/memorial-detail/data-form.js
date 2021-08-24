import { Router } from 'aurelia-router';
import { CoreService, Service } from './service';
import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Dialog } from '../../../../au-components/dialog/dialog';
import moment from 'moment';

var MemorialLoader = require('../../../../loader/garment-finance-memorial-loader');

@inject(Router, Service, CoreService, Dialog)
export class DataForm {
	@bindable title;
	@bindable readOnly;
	@bindable data = {};
	@bindable error = {};
	@bindable selectedMemorial;

	controlOptions = {
		label: {
			length: 3
		},
		control: {
			length: 5
		}
	};

	filter = {
		IsUsed: false
	}

	formOptions = {
		cancelText: "Kembali",
		saveText: "Simpan",
		deleteText: "Hapus",
		editText: "Ubah",
	}
	get accountingBookLoader() {
		return AccountingBookLoader;
	}

	itemsColumns = [
		{ header: "No Invoice" },
		{ header: "Kode Buyer" },
		{ header: "Nama Buyer" },
		{ header: "Kurs" },
		{ header: "Rate" },
		{ header: "Jumlah" },
		{ header: "Total IDR" },
		{ header: "" },
	]

	otherItemsColumns = [
		{ header: "No Account" },
		{ header: "Nama Account" },
		{ header: "Kurs" },
		{ header: "Rate" },
		{ header: "Jumlah" },
		{ header: "Total IDR" },
		{ header: "" },
	]


	constructor(router, service, coreService, dialog) {
		this.router = router;
		this.service = service;
		this.coreService = coreService;
		this.dialog = dialog;
	}

	bind(context) {
		this.context = context;
		this.data = this.context.data;
		this.error = this.context.error;
		this.cancelCallback = this.context.cancelCallback;
		this.deleteCallback = this.context.deleteCallback;
		this.editCallback = this.context.editCallback;
		this.saveCallback = this.context.saveCallback;
		this.Options = {
			isCreate: this.context.isCreate,
			isView: this.context.isView,
			isEdit: this.context.isEdit,
			header: this.data
		}

		if (this.data) {
			this.selectedMemorial = this.data.MemorialId ? {
				Id: this.data.MemorialId,
				MemorialNo: this.data.MemorialNo,
				Date: this.data.MemorialDate
			} : null;
		}
	}

	selectedMemorialChanged(newValue) {
		this.data.TotalAmount=0;
		if (newValue) {
			if(newValue.Items){
				for(var item of newValue.Items){
					this.data.TotalAmount+=item.Credit;
				}
			}
			
			this.data.MemorialDate = newValue.Date;
			this.data.MemorialId = newValue.Id;
			this.data.MemorialNo = newValue.MemorialNo;
		}
	}

	get memorialLoader() {
		return MemorialLoader;
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

	get addOtherItems() {
		return (event) => {
			this.data.OtherItems.push({});
		};
	}

	get removeOtherItems() {
		return (event) => {
			this.error = null;
		};
	}


}
