
import { computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from 'aurelia-api';

export class DeliveryOrderItem {
    conversionError = '';

    async activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.readOnly = context.options.readOnly;

        if (!this.data.Buyer) {
            this.data.Buyer = { Name: "" };
        }

        if (!this.readOnly && !this.data.Id) {
            await this.loadConversion();
        }
    }

    get product() {
        return `${this.data.Product.Code} - ${this.data.Product.Name}`;
    }

    @computedFrom("data.ReceiptQuantity", "data.Conversion")
    get SmallQuantity() {
        var conversion = Number(this.data.Conversion);

        if (
            this.data.Conversion === null ||
            this.data.Conversion === undefined ||
            this.data.Conversion === '' ||
            !Number.isFinite(conversion) ||
            conversion <= 0
        ) {
            this.data.SmallQuantity = 0;
            return '0.00';
        }

        var quantity = Number(this.data.ReceiptQuantity) * conversion;

        if (!Number.isFinite(quantity)) {
            this.data.SmallQuantity = 0;
            return '0.00';
        }

        this.data.SmallQuantity = quantity.toFixed(2);

        return quantity.toLocaleString('id-ID', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    @computedFrom("data.Conversion")
    get conversionText() {
        var value = Number(this.data.Conversion);

        if (
            this.data.Conversion === null ||
            this.data.Conversion === undefined ||
            this.data.Conversion === '' ||
            !Number.isFinite(value) ||
            value <= 0
        ) {
            return '';
        }

        return value.toLocaleString('id-ID', {
            minimumFractionDigits: 4,
            maximumFractionDigits: 4
        });
    }

    async findConversion(big, small) {
        var endpoint = Container.instance.get(Config).getEndpoint("core");

        var unitOf = (u) =>
            (u.Unit || u.unit || '').toString().trim().toUpperCase();

        var result = await endpoint.find('master/uom-conversions', {
            keyword: unitOf(big),
            size: 100
        });

        var list = (result && result.data) || [];

        return list.find(c => {
            var bigMatch = big.Id != null && c.BigUomId != null
                ? String(c.BigUomId) === String(big.Id)
                : (c.BigUomUnit || '').trim().toUpperCase() === unitOf(big);

            var smallMatch = small.Id != null && c.SmallUomId != null
                ? String(c.SmallUomId) === String(small.Id)
                : (c.SmallUomUnit || '').trim().toUpperCase() === unitOf(small);

            return bigMatch && smallMatch;
        });
    }

    async loadConversion() {
        this.data.ConversionLoading = true;
        this.data.ConversionMissing = true;
        this.data.Conversion = null;
        this.data.SmallQuantity = 0;
        this.conversionError = '';

        try {
            var big = this.data.Uom;
            var small = this.data.SmallUom;

            if (!big || !small) {
                this.conversionError = 'Satuan belum lengkap';
                return;
            }

            var norm = (u) =>
                (u.Unit || u.unit || '').toString().trim().toUpperCase();

            var sameId = big.Id != null &&
                small.Id != null &&
                String(big.Id) === String(small.Id);

            var sameUnit = norm(big) !== '' &&
                norm(big) === norm(small);

            if (sameId || sameUnit) {
                this.data.Conversion = 1;
                this.data.ConversionMissing = false;
                return;
            }

            var found = await this.findConversion(big, small);
            var value = found ? Number(found.Value) : NaN;

            if (found && Number.isFinite(value) && value > 0) {
                this.data.Conversion = value;
                this.data.ConversionMissing = false;
            } else {
                this.conversionError = 'Master Satuan Konversi harus diisi';
            }
        } catch (e) {
            this.conversionError = 'Gagal mengambil Master Satuan Konversi';
        } finally {
            this.data.ConversionLoading = false;
        }
    }

    controlOptions = {
        control: {
            length: 12
        }
    };
}
