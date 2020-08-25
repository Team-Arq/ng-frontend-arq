import { FormGroup } from '@angular/forms';

export class FormUtils {

    /**
     * Form Group Validator logic
     * @param controlName setting control name
     * @param matchingControlName Matching control name
     */
    public static validator( controlName: string, matchingControlName: string ): any {
        return ( formGroup: FormGroup ) => {
            const control = formGroup.controls[ controlName ];
            const matchingControl = formGroup.controls[ matchingControlName ];

            if ( matchingControl.errors && !matchingControl.errors.mustMatch ) {
                // return if another validator has already found an error on the matchingControl
                return;
            }

            // set error on matchingControl if validation fails
            if ( control.value !== matchingControl.value ) {
                matchingControl.setErrors( { mustMatch: true } );
            } else {
                matchingControl.setErrors( null );
            }
        };
    }
}
