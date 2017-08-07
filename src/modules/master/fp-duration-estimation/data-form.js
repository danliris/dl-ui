import { inject, bindable, computedFrom } from 'aurelia-framework';

var ProcessTypeLoader = require('../../../loader/process-type-loader');

export class DataForm {
	@bindable title;
	@bindable readOnly;
	@bindable selectedProcessType;

	formOptions = {
		cancelText: "Kembali",
		saveText: "Simpan",
		deleteText: "Hapus",
		editText: "Ubah",
	};

	controlOptions = {
		label: {
			length: 4
		},
		control: {
			length: 5
		}
	}

	itemsColumns = [
		{ header: "Nama Area", value: "name" },
		{ header: "Durasi (hari)", value: "duration" }
	]

	@computedFrom("data._id")
	get isEdit() {
		return (this.data._id || '').toString() != '';
	}

	bind(context) {
		this.context = context;
		this.data = this.context.data;
		this.error = this.context.error;

		this.cancelCallback = this.context.cancelCallback;
		this.deleteCallback = this.context.deleteCallback;
		this.editCallback = this.context.editCallback;
		this.saveCallback = this.context.saveCallback;
	}

	get processTypeLoader() {
		return ProcessTypeLoader;
	}

	selectedProcessTypeChanged(newValue) {
		var selectedProcessType = newValue;
		if (!selectedProcessType) {
			this.data.processType = {};
			this.data.processTypeId = {};
		}
		else if (selectedProcessType._id) {
			this.data.processType = selectedProcessType;
			this.data.processTypeId = selectedProcessType._id;
		}
	}

	processTypeView = (processType) => {
		return processType.name
	}

	get addItems() {
		return (event) => {
			this.data.areas.push({})
		};
	}
} 
