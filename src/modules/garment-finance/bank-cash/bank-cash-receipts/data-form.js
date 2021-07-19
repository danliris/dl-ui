import { Router } from 'aurelia-router';
import { CoreService, Service } from './service';
import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Dialog } from '../../../../au-components/dialog/dialog';

@inject(Router, Service, CoreService, Dialog)
export class DataForm {
	@bindable title;
	@bindable readOnly;
	@bindable data = {};
	@bindable error = {};
	@bindable numberingCode;

	formOptions = {
		cancelText: "Kembali",
		saveText: "Simpan",
		deleteText: "Hapus",
		editText: "Ubah",
	}


	numberingCodeOptionsIDR = ["", "BDM", "BPJSM", "COH", "CRM", "DNM", "FJM", "GBT", "GMT", "GPT", "GRK", "GRM", "HBM", "HBT", "KCM", "KCM", "KGM", "KIK", "KIM", "KVK", "LJM", "MGP", "RJM", "RJM", "RJM"];

	numberingCodeOptionsNotIDR = ["", "CIM", "KVM", "MET", "PVT"];

	incomeTypeOptions = ["", "BELI VALAS", "HASIL TUKAR VALAS", "ISI KAS", "ISI KAS RP", "JASA GIRO", "KELEBIHAN BAYAR", "LAIN - LAIN", "PEMINDAHAN ANTAR KAS", "PENGEMB.UPAH", "PENGEMBALIAN BIAYA INKLARING", "PENGEMBALIAN BIAYA PIBK", "PENGEMBALIAN BIAYA STMB BPJS", "PENGEMBALIAN FREIGHT", "PENGEMBALIAN PEMBELIAN CASH", "PENGEMBALIAN TAMBAHAN UPAH", "PENGEMBL. VB UANG MUKA BIAYA IMPOR", "PENJUALAN EKSPOR", "PENJUALAN LOKAL", "PINDAHAN ANTAR BANK", "PT EFRATA EX PENGEMB.PINJAMAN", "PT EFRATA EX PINJ.SEMENTARA", "SETORAN TUNAI", "TERIMA DARI KEI", "TERIMA DARI PEMBAYARAN SANKSI ADMINISTRASI", "TEXTILE EX PENGEMB.PINJAMAN", "TEXTILE EX PENJUALAN LOKAL", "TEXTILE EX PINJ.SEMENTARA", "TEXTILE EX. PINJAMAN SEMENTARA", "TITIPAN TEXTILE", "TUKAR VALAS"];

	itemsColumns = [
		{ header: "No Acc" },
		{ header: "Sub Acc" },
		{ header: "Acc Unit" },
		{ header: "Acc Biaya" },
		{ header: "Amount" },
		{ header: "Jumlah" },
		{ header: "C2A" },
		{ header: "C2B" },
		{ header: "C2C" },
		{ header: "C1A" },
		{ header: "C1B" },
		{ header: "No Nota" },
		{ header: "Ket" },
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
			this.bankAccount = this.data.Bank || null;
			this.chartOfAccount = this.data.DebitCoa || null;
			this.currencies = this.data.Currency || null;
			this.numberingCode = this.data.NumberingCode || null;

		}
	}

	bankView = (bank) => {
		return bank.AccountNumber + " - " + bank.AccountName;
	}

	@bindable bankAccount;
	bankAccountChanged(newValue, oldValue) {
		this.data.Bank = newValue;
	}

	get bankLoader() {
		return (keyword) => {
			let args = {
				size: 10,
				keyword: keyword,
				filter: { "DivisionName": "G" }
			}

			return this.coreService.getAccountBank(args).then(result => {
				return result.data;
			});

		}
	}

	chartOfAccountView = (coa) => {
		return coa.Code + " - " + coa.Name;
	}

	@bindable chartOfAccount;
	chartOfAccountChanged(newValue, oldValue) {
		this.data.DebitCoa = newValue;
	}

	get chartOfAccountLoader() {
		return (keyword) => {
			let args = {
				size: 10,
				keyword: keyword,
				filter: { "Code3": "4" }
			}

			return this.service.getChartOfAccounts(args).then(result => {
				return result.data;
			});

		}
	}

	currenciesView = (currency) => {
		return currency.Code || currency.code;
	}

	@bindable currencies;
	currenciesChanged(newValue, oldValue) {
		if (newValue != this.data.Currency) {
			this.data.Currency = newValue;
			this.data.Items.splice(0);
		}
	}

	get currenciesLoader() {
		return (keyword) => {
			let args = {
				size: 10,
				keyword: keyword,
			}

			return this.coreService.getBudgetCurrencies(args).then(result => {
				return result.data;
			});

		}

	}

	get addItems() {
		return (event) => {
			if (this.data.Currency == null || this.data.Currency == {}) {
				this.dialog.prompt('Silahkan isi Kurs', 'Info');
			} else {

				this.data.Items.push({});
			}

		};
	}

	get removeItems() {
		return (event) => {
			this.error = null;
		};
	}

	get rate() {
		return this.data.Currency ? this.data.Currency.Rate || this.data.Currency.rate : 0;
	}

	numberingCodeChanged(newValue, oldValue) {
		this.data.NumberingCode = newValue;
	}




}
