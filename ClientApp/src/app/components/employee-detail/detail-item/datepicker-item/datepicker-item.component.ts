import {
  Component,
  ViewChild,
  TemplateRef,
  Input,
  OnInit,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-datepicker-item",
  templateUrl: "./datepicker-item.component.html",
  styleUrls: ["./datepicker-item.component.css"],
})
export class DatepickerItemComponent implements OnInit {
  @Input() formGroupInstance: FormGroup;
  @Input() displayName: string;
  @Input() formControlLabel: string;

  @ViewChild("datepickerDetailItem", { static: true })
  datepickerTmplt: TemplateRef<any>;

  private originalDateValue: Date;

  ngOnInit() {
    this.preserveOriginalDateFormat();
  }

  private preserveOriginalDateFormat() {
    this.originalDateValue = this.formGroupInstance.get(
      this.formControlLabel
    ).value;
  }

  changeDate(value: NgbDateStruct) {
    this.originalDateValue = new Date(value.year, value.month - 1, value.day);
    this.formGroupInstance
      .get(this.formControlLabel)
      .setValue(this.originalDateValue);
  }
}
