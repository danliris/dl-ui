import { inject, BindingEngine } from 'aurelia-framework';

@inject(BindingEngine)
export class DeliveryOrderItemSparepart {
	constructor(bindingEngine) {
		this.bindingEngine = bindingEngine;
		this.subscription = null;
	}

	activate(context) {
		this.context = context;
		this.data = context.data;
		this.error = context.error;
		this.readOnly = context.options.readOnly;
		if (this.data.deliveredQuantity) {
			this.data.deliveredQuantity = this.data.deliveredQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2 });
		}
		this.isShowing = false;

		// Expand if there are initial validation errors
		if (this.error && Object.keys(this.error).some(k => this.error[k])) {
			this.isShowing = true;
		}

		// Observe `error` reference and auto-expand when any error appears
		this.subscription = this.bindingEngine.propertyObserver(this, 'error')
			.subscribe((newVal) => {
				if (newVal && Object.keys(newVal).some(k => newVal[k])) {
					this.isShowing = true;
				}
			});
	}

	toggle() {
		this.isShowing = !this.isShowing;
	}

	unbind() {
		if (this.subscription && this.subscription.dispose) {
			this.subscription.dispose();
			this.subscription = null;
		}
	}

	get isStorage() {
		// Selalu ambil dari context.options agar reaktif
		return this.context && this.context.context && this.context.context.options && this.context.context.options.isStorage;
	}

	get product() {
		return `${this.data.product.code} - ${this.data.product.name}`;
	}
}