import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
const TransferDeliveryOrderLoader = require('../../../loader/transfer-delivery-order-loader');

@inject(Service, BindingEngine)
export class DataForm {
	@bindable title;
	@bindable readOnly;
	@bindable selectedBuyer;
	

	formOptions = {
		cancelText: "Kembali",
		saveText: "Simpan",
		deleteText: "Hapus"
	};

	controlOptions = {
		label: {
			length: 4
		},
		control: {
			length: 4
		}
	};

	constructor(service, bindingEngine) {
		this.service = service;
		this.bindingEngine= bindingEngine;

		// this.stnInfo = {
		// 	columns: ["Nomor Surat Jalan", "Tanggal Surat Jalan", "Tanggal Tiba", "Remark"],
		// 	onAdd: () => {
		// 		this.data.StockTransferNoteItems.push({});
		// 	},
		// 	options: {
		// 		filter: {}
		// 	}
		// };

	}

	bind(context) {
		this.context = context;
		this.data = this.context.data;
		this.error = this.context.error;

		if (this.data.SupplierId) {
            this.selectedSupplier = await this.service.getSupplierById(this.data.SupplierId);
            this.data.SupplierId =this.selectedSupplier._id;
        }

		if (!this.data.DeliveryOrderDate) {
            this.data.DeliveryOrderDate = new Date();
		}
		
		if (!this.data.ArrivedDate) {
            this.data.ArrivedDate = new Date();
		}

		this.cancelCallback = this.context.cancelCallback;
		this.deleteCallback = this.context.deleteCallback;
		this.saveCallback = this.context.saveCallback;

	}

	selectedSupplierChanged(newValue) {
        var _selectedSupplier = newValue;
        if (_selectedSupplier) {
            this.data.SupplierId = _selectedBuyer;
            this.data.garmentBuyerId = _selectedBuyer._id ? _selectedBuyer._id : "";
            
        }
    }

	get storageLoader() {
		return StorageLoader;
	}
} 