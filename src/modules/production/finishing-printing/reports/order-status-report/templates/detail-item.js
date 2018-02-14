export class DetailItem {
    reasons = ["", "Tunggu Material", "Tunggu Acc Buyer"];

    activate(item) {
        this.data = item.data;
        this.error = item.error;
    }
}