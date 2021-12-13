import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { ItemDataService } from '../item-data.service';

@Component({
  selector: 'app-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.scss']
})
export class ItemEditorComponent implements OnInit{

  @Output() updateItems = new EventEmitter<any>();

  itemForm = new FormGroup({
      name: new FormControl('Taschenlampe')
  });

  constructor(private itemDataService: ItemDataService) {

  }

  onSubmit() {

    // todo validate 

    this.itemDataService.save(this.itemForm.value).subscribe(
      data => {console.log(data); this.updateItems.emit();}
    );

    // TODO: Use EventEmitter with form value

    console.warn(this.itemForm.value);
  }

  public ngOnInit() {
    // this.onFormGroupChange.emit(this.itemForm);
  }

}
