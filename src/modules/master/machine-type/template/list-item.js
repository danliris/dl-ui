export class listItem {
  

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    console.log(this.data);
  }  

  dropDownMenu = ["input teks", "input angka", "input pilihan", "input skala angka"];

  
  // people = [
  //   { id: 1, name: "Alice Ecila", age: 27, email: "alice.ecila@live.com" },
  //   { id: 2, name: "Beatrix Xirtaeb", age: 26, email: "beatrix.xirtaeb@facebook.com" },
  //   { id: 3, name: "Clara Aralc", age: 29, email: "clara.aralc@google.com" },
  //   { id: 4, name: "Donna Annod", age: 28, email: "donna.annod@twitter.com" }];

  listIndicatorsColumns = [
      { header: "Indikator", value: "indicator" },
      { header: "Tipe Data", value: "dataType" },
      { header: "Petunjuk Data", value: "defaultValue" },
      { header: "Satuan", value: "uom" },
    ]

}
