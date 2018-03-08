import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
const UnitLoader = require('../../../../loader/unit-loader');

@inject(Service)
export class DataForm {
	@bindable title;
	@bindable readOnly;
	@bindable unit;
	@bindable type;

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

	constructor(service) {
		this.service = service;

		this.mdnInfo = {
			columns: ["Masukkan No SPB"],
			onAdd: () => {
				this.data.MaterialDistributionNoteItems.push({});
			},
			options: {
				filter: {}
			}
		};

		this.types = ["", "PRODUKSI", "RE-GRADING", "TEST"];
		this.unitQuery = { "division.name": "FINISHING & PRINTING" };
	}

	bind(context) {
		this.context = context;
		this.data = this.context.data;
		this.error = this.context.error;

		this.cancelCallback = this.context.cancelCallback;
		this.deleteCallback = this.context.deleteCallback;
		this.saveCallback = this.context.saveCallback;
	}

	unitChanged(newValue, oldValue) {
		if (newValue) {
			this.data.Unit = newValue;
			Object.assign(this.mdnInfo.options.filter, { "UnitId": this.data.Unit._id });
		}
		else {
			this.data.Unit = undefined;
		}

		this.error = {};
		this.data.MaterialDistributionNoteItems.splice(0, this.data.MaterialDistributionNoteItems.length);
	}

	typeChanged(newValue, oldValue) {
		if (newValue) {
			this.data.Type = newValue;

			delete this.mdnInfo.options.filter.RequestType;

			if (this.data.Type === "TEST")
				Object.assign(this.mdnInfo.options.filter, { "RequestType": this.data.Type });
		}
		else {
			this.data.Type = "";
		}

		this.error = {};
		this.data.MaterialDistributionNoteItems.splice(0, this.data.MaterialDistributionNoteItems.length);
	}

	get unitLoader() {
		return UnitLoader;
	}
} 