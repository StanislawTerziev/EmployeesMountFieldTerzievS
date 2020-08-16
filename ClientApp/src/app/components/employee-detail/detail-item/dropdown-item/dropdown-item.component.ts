import {
  Component,
  TemplateRef,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-dropdown-item",
  templateUrl: "./dropdown-item.component.html",
  styleUrls: ["./dropdown-item.component.css"],
})
export class DropdownItemComponent implements OnInit {
  ngOnInit(): void {}
  @Input() itemList: any[];
  @Input() formGroupInstance: FormGroup;
  @Input() displayName: string;
  @Input() formControlLabel: string;
  @Input() dropdownItemsTemplate: TemplateRef<any>;
  @Input() propName: string;

  @ViewChild("dropdownDetailItemTmplt", { static: true })
  dropdownTmplt: TemplateRef<any>;

  changeDropdownValue(item: string, prop: string) {
    this.formGroupInstance.get(prop).setValue(item);
  }
}
