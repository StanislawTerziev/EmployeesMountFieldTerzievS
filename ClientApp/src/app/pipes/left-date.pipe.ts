import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "leftDate" })
export class LeftDatePipe implements PipeTransform {
  transform(value: Date): string {
    const properValue = this.attemptToDateConversion(value);
    return value != null && properValue != null
      ? properValue
          .toLocaleDateString("cs-CZ", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .replace(/\./g, "/")
          .replace(/\s/g, "")
      : "Present";
  }

  private attemptToDateConversion(value: any) {
    if (value instanceof Date) return value;
    else {
      const properDate = new Date(value);
      if (properDate instanceof Date && !isNaN(properDate.getTime()))
        return properDate;
      else return null;
    }
  }
}
