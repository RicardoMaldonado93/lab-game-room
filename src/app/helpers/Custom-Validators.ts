import { AbstractControl, ValidatorFn } from '@angular/forms';

// function AgeValidator(control: AbstractControl): { [key: string]:boolean  } | null {
//   console.log(typeof control.value, control.value)
//   if (control.value !== undefined && (isNaN(control.value) || control.value < 18 || control.value > 45)) {
//     return { 'ageRange': true };
// }
// return null;
// }

function AgeRangeValidator(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (!c.value || c.value < min || c.value > max) return { errorAge: true };
    return null;
  };
}
function PhoneValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const reg = /^(11|15)+/g;
  if (!reg.test(control.value) || control.value.length < 10 ) return { errorPhone: true };
  return null;
}
export { AgeRangeValidator, PhoneValidator };
