import { Component, Input, OnInit, TemplateRef } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-detail-item",
  templateUrl: "./detail-item.component.html",
  styleUrls: ["./detail-item.component.css"],
})
export class DetailItemComponent {
  @Input() formGroupInstance: FormGroup;
  @Input() displayName: string;
  @Input() formControlLabel: string;

  @Input() inputTemplate: TemplateRef<any>;

  constructor() {}
}
