import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export interface AllValidationErrors {
  control_name: string;
  error_name: string;
  error_value: any;
}

export interface FormGroupControls {
  [key: string]: AbstractControl;
}

export function getValidationErrors(formGroup: FormGroup): AllValidationErrors[] {
  let errors: AllValidationErrors[] = [];
  const controlErrors: ValidationErrors = formGroup.errors;
  if (controlErrors !== null) {
    Object.keys(controlErrors).forEach(keyError => {
      errors.push({
        control_name: null,
        error_name: keyError,
        error_value: controlErrors[keyError]
      });
    });
  }

  errors = errors.concat(getFormValidationErrors(formGroup.controls))
  return errors;
}

export function getFormValidationErrors(controls: FormGroupControls): AllValidationErrors[] {
  let errors: AllValidationErrors[] = [];
  Object.keys(controls).forEach(key => {
    const control = controls[key];
    if (control instanceof FormGroup) {
      errors = errors.concat(getFormValidationErrors(control.controls));
    }
    const controlErrors: ValidationErrors = controls[key].errors;
    if (controlErrors !== null) {
      Object.keys(controlErrors).forEach(keyError => {
        errors.push({
          control_name: key,
          error_name: keyError,
          error_value: controlErrors[keyError]
        });
      });
    }
  });

  return errors;
}
