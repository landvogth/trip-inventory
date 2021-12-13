import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn, FormGroup, Validators, FormControl } from '@angular/forms'
import { TripDataService } from '../trip-data.service';
import { Observable, map, of, delay } from 'rxjs';
import { Trip } from '../trip';

@Component({
  selector: 'app-trip-editor',
  templateUrl: './trip-editor.component.html',
  styleUrls: ['./trip-editor.component.scss']
})
export class TripEditorComponent implements OnInit {

  @Output() update = new EventEmitter<any>();

  showSavedMessage = false;
  showOverlappingMessage = false;

  tripFormGroup = new FormGroup({
    tripname: new FormControl('Spain', Validators.required),
    startdate: new FormControl('2021-05-12', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/), this.invalidDateValidator()]),
    enddate: new FormControl('2021-05-15', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/), this.invalidDateValidator()])
  }, this.crossValidateForm);


  invalidDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      if (!control) {
        return null;
      }

      let isValidDate = Date.parse(control.value);
      const invalidDate = isNaN(isValidDate);
      return invalidDate ? { invalidDate: { value: control.value } } : null;
    };
  }


  crossValidateForm(formGroup: FormGroup) {

    const tripname = formGroup.controls['tripname'];
    const startdate = formGroup.controls['startdate'];
    const enddate = formGroup.controls['enddate'];

    if (!startdate || !enddate || !tripname) {
      return null;
    }

    if (!startdate.value || !enddate.value) {
      return null;
    }

    let start = Date.parse(startdate.value);
    let end = Date.parse(enddate.value);

    if (isNaN(start) || isNaN(end)) {
      return null;
    }

    if (start > end) {
      startdate.setErrors({ toSmall: true });
    } else {
      if (startdate.hasError('toSmall')) {
        delete startdate.errors['toSmall'];
        startdate.updateValueAndValidity();
      }
    }
  }

  showFormError(controllName: string) {
    let control = this.tripFormGroup.controls[controllName];
    return control.invalid && (control.dirty || control.touched);
  }

  showValidClass(controlName: string) {
    const control = this.tripFormGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  showInvalidClass(controlName: string) {
    return this.showFormError(controlName);
  }

  constructor(private tripDataService: TripDataService) {

  }

  fc_errors(fromControlName) {
    return this.tripFormGroup.controls[fromControlName].errors;
  }

  onSubmit() {

    this.showOverlappingMessage = false;
    let startdate = this.tripFormGroup.value.startdate;
    let enddate = this.tripFormGroup.value.enddate;

    this.areThereOverlappingTrips(startdate, enddate).then((overlappingTrips: boolean) => {
      if( !overlappingTrips) {
        this.saveNewTrip();
      } else {
        this.showOverlappingMessage = true;
      }
    });
  }

  areThereOverlappingTrips(startdate: string, enddate: string): Promise<boolean> {
    return new Promise(resolve => {
      this.tripDataService.get().subscribe((trips: any) => {
        let overlaps = Object.keys(trips).filter(key => {

          let endDateStoredTrip = Date.parse(trips[key].enddate);
          let startDateNewTrip = Date.parse(startdate);

          let endDateNewTrip = Date.parse(enddate);
          let startDateStoredTrip = Date.parse(trips[key].startdate);

          return !(endDateStoredTrip < startDateNewTrip ||
            endDateNewTrip < startDateStoredTrip);

        });
        resolve(overlaps.length > 0);
      });
    });
  }

  saveNewTrip() {
    return this.tripDataService.save(this.tripFormGroup.value).subscribe(
      data => {
        console.log(data); this.update.emit();

        // todo replace with fade animation for saved message
        this.showSavedMessage = true;
        setTimeout(() => {
          this.showSavedMessage = false;
        }, 3000);

      }
    );
  }


  public ngOnInit() {
    // this.onFormGroupChange.emit(this.tripFormGroup);
  }

}
