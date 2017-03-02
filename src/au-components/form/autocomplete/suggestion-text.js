export class SuggestionTextValueConverter {
  toView(suggestion, field) {
    if (!suggestion)
      return "";
    else if (typeof suggestion === "string")
      return suggestion;
    else if (typeof suggestion === "object" && field) {
      return suggestion[field];
    }
    else
      return suggestion.toString();
  }
}
