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
      readOnly: this.readOnly
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
        Box: source.Box || '',
        Rack: source.Rack || '',
        StockQuantity: originalQuantity,
        IsSplitChild: true
      });

      this.isShowing = true;
      this.data.IsShowing = true;
    };
  }


  removeDetails(detail, event) {
    if (event) {
      event.preventDefault();
    }
    if (!Array.isArray(this.data.Details)) {
      return;
    }
    const details = this.data.Details;
    const index = details.indexOf(detail);
    if (index < 0) {
      return;
    }
    if (details.length > 1) {
      const sourceId =detail.SourceId ||detail.Id ||null;
      let target = details.find(
        (candidate, candidateIndex) => {
          if (candidateIndex === index) {
            return false;
          }
          const candidateSourceId =
            candidate.SourceId ||
            candidate.Id ||
            null;
          return sourceId == null ||
            candidateSourceId == sourceId;
        }
      );

      if (!target) {
        target = details.find(
          (candidate, candidateIndex) =>
            candidateIndex !== index
        );
      }
      if (target) {
        target.Quantity =
          (parseFloat(target.Quantity) || 0) +
          (parseFloat(detail.Quantity) || 0);

      }
    }
    details.splice(index, 1);
    this.data.Details = [...details];
  }


  detailsColumns = [
    { header: 'Quantity' },
    { header: 'Box' },
    { header: 'Rack' }
  ];
}