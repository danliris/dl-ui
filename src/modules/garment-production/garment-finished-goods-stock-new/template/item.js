export class Item {

  activate(context) {
    this.context = context;
    this.data = context.data || {};
    this.error = context.error || {};
    this.options = context.options || {};
    this.readOnly = !!this.options.readOnly;

    this.data.Details = Array.isArray(this.data.Details)
      ? this.data.Details
      : [];

    this.detailOptions = Object.assign({}, this.options, {
      readOnly: this.readOnly,
      details: this.data.Details
    });

    this.isShowing = !!this.data.IsShowing;

    if (this.error && this.error.DetailsCount) {
      this.isShowing = true;
    }

    if (this.error && Array.isArray(this.error.Details)) {
      const hasDetailError = this.error.Details.some(detailError =>
        detailError && Object.keys(detailError).length > 0
      );

      if (hasDetailError) {
        this.isShowing = true;
      }
    }
  }


  toggle() {
    this.isShowing = !this.isShowing;
    this.data.IsShowing = this.isShowing;
  }


  get addDetails() {
    return event => {
      if (event) {
        event.preventDefault();
      }

      if (!Array.isArray(this.data.Details)) {
        this.data.Details = [];
      }

      const details = this.data.Details;
      const source =
        details.find(detail =>
          detail.Id && !detail.IsSplitChild
        ) ||
        details[0] ||
        {};

      const originalQuantity =
        parseFloat(source.OriginalQuantity) ||
        parseFloat(source.StockQuantity) ||
        parseFloat(this.data.StockQuantity) ||
        0;

      details.push({
        Id: null,
        SourceId: this.data.Id,
        FinishedGoodStockNo:source.FinishedGoodStockNo ||this.data.FinishedGoodStockNo,
        Quantity: null,
        // Box: source.Box || '',
        // Rack: source.Rack || '',
        Colour: source.Colour || '',
        WarehouseCode: source.WarehouseCode || '',
        Area: source.Area || '',
        LineCode: source.LineCode || '',
        PalletCode: source.PalletCode || '',
        StockQuantity: originalQuantity,
        IsSplitChild: true
      });

      this.isShowing = true;
      this.data.IsShowing = true;
    };
  }

 get removeDetails() {
    return event => {
      if (!Array.isArray(this.data.Details)) {
        return;
      }

      const removed = event && event.detail ? event.detail : event;
      if (!removed || !removed.Id) {
        return;
      }

      const details = this.data.Details;
      const target = details.find(candidate => !candidate.Id);
      if (target) {
        target.Id = removed.Id;
        target.IsSplitChild = false;
      }
    };
  }


  detailsColumns = [
    { header: 'Warna' },
    { header: 'Quantity' },
    { header: 'Kode Gudang' },
    { header: 'Area' },
    { header: 'Kode Line' },
    { header: 'Kode Pallet' }
  ];
}