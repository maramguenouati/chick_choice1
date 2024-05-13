import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PatternValidatorsService } from '../pattern-validators/pattern-validators.service';
import { ConfirmPasswordService } from '../ConfirmPassword/confirm-password.service';
import { Validators , FormGroup , FormBuilder , FormControl} from '@angular/forms';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any; 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit , OnInit  {
  @ViewChild('container') container!: ElementRef;  /* Référence au conteneur principal */
  @ViewChild('signUpBtn') signUpBtn!: ElementRef;  /* Référence au bouton "Sign up" */
  @ViewChild('signInBtn') signInBtn!: ElementRef;  /* Référence au bouton "Sign in" */
  @ViewChild('password-input') passwordInput!: ElementRef;  /* Référence au champ de mot de passe */


  registerForm!: FormGroup;
  signinForm!: FormGroup;
  constructor(
    private _router: Router,
    private _fb: FormBuilder,
  ) { }

  ngAfterViewInit() {
    if (this.signUpBtn && this.container) {
      this.signUpBtn.nativeElement.addEventListener('click', () => {
        this.container.nativeElement.classList.add('sign-up-mode');  /* Ajoute la classe pour la transition */
      });
    }

    if (this.signInBtn && this.container) {
      this.signInBtn.nativeElement.addEventListener('click', () => {
        this.container.nativeElement.classList.remove('sign-up-mode');  /* Retire la classe pour revenir au formulaire de connexion */
      });
    }
    
   

    
  }

  ngOnInit(): void {
    this.buildRegisterForm();
    this.buildSignInForm();
  }
  buildSignInForm(){
    this.signinForm = this._fb.group({
      userNamein : ['', [Validators.required, ]],
      Passwordin: ['', [Validators.required]],

  }
)
}
get Passwordin() {
  return this.registerForm.get('Passwordin');
}

get userNamein() {
  return this.registerForm.get('userNamein');
}
  buildRegisterForm() {
    this.registerForm = this._fb.group({
      firstName : ['', [Validators.required ]],
      lastName : ['', [Validators.required, ]],
      userName : ['', [Validators.required, ]],
    
      email: ['', [Validators.required, Validators.email]],
      
      password:['' ,
      [
        Validators.compose(
          [
            Validators.required,
            PatternValidatorsService.patternValidators(/\d/,{hasNumber:true}),
            PatternValidatorsService.patternValidators(/[A-Z]/,{hasCapitalCase:true}),
            PatternValidatorsService.patternValidators(/[a-z]/,{hasSmallCase:true}),
            PatternValidatorsService.patternValidators(/[!@#&%$*+?-[\]{};,:<>]/,{hasSpecialCharacters:true}),
            Validators.minLength(8),
          ]

        )
        
      ]
      ],
      confirm_password: [
        '' ,
      [
        Validators.compose(
          [
            Validators.required,
            PatternValidatorsService.patternValidators(/\d/,{hasNumber:true}),
            PatternValidatorsService.patternValidators(/[A-Z]/,{hasCapitalCase:true}),
            PatternValidatorsService.patternValidators(/[a-z]/,{hasSmallCase:true}),
            PatternValidatorsService.patternValidators(/[!@#&%$*+?-[\]{};,:<>]/, {hasSpecialCharacters:true}), 
                       Validators.minLength(8),
          ]

        )
        
      ]
      ],
    },{validator:ConfirmPasswordService.MatchingPAssword});
    }
    
  

  get firstName(){
    return this.registerForm.get('firstName');
  }
  get lastName(){
    return this.registerForm.get('lastName');
  }
  get userName(){
    return this.registerForm.get('userName');
  }
  get email(){
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirm_password() {
    return this.registerForm.get('confirm_password');
  }
 
   // form validation
   isFormValid: boolean = false;
   resolved(captchaResponse: string) {
     console.log('Resolved captcha with response: ${captchaResponse}');
 
     if (captchaResponse != null) {
       this.isFormValid = true;
     }
   }

   sign_up() {
    // Vérifiez si les champs du formulaire sont remplis
    if (!this.areFieldsFilled()) {
      $('#signModal').modal('show');
    } else {
      this._router.navigate(['/home']);
    }
  }
  sign_in() {

   
  }
areFieldsFilled(): boolean {
    
    return !!this.registerForm.get('name')?.value &&
           !!this.registerForm.get('lastname')?.value &&
           !!this.registerForm.get('email')?.value &&
           !!this.registerForm.get('password')?.value &&
           !!this.registerForm.get('confirm_password')?.value;
  }
}