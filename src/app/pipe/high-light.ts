import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Pipe({
  name: "highlight",
})
export class HighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(string: string, searchText: string): SafeHtml {
    if (!string) {
      return "";
    }
    if (!searchText) {
      return string;
    }

    let simpletext = new RegExp("(" + searchText + ")", "gi");
    const value = string.replace(simpletext, "<b>$1</b>");
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
