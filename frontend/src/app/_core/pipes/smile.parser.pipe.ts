import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "smile"
})
export class ParseSmilePipe  implements PipeTransform {
  transform(array: any, smiles: any): any[] {
    if (!Array.isArray(array)) {
      return;
    }
    for(const i of array) {
      let msg = i.message
      for(const s of smiles){
        msg = msg.split(s.alias).join(`<img src="${s.image}">`);
      }
      i.message = msg
    }
    return array;
  }
}
