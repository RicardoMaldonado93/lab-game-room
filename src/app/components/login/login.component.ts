import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DialogData } from 'src/app/models/dialogModel';
import { AuthService } from './../../services/auth.service';
import { DialogFactoryService } from './../../services/dialog-factory.service';
import { DialogService } from './../../services/dialog.service';
@Component({
  selector: 'lb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements AfterViewInit, OnInit {
  title: string = 'Login';
  viewError!:boolean;
  private __emailValidator: ValidatorFn = Validators.pattern(
    '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
  );

  loginForm!: FormGroup;
  registerForm!: FormGroup;

  dialog!: DialogService;
  @ViewChild('login')
  loginTemplate!: TemplateRef<any>;
  @ViewChild('register')
  registerTemplate!: TemplateRef<any>;

  constructor(
    private dialogFactoryService: DialogFactoryService,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.formInicialization();
  }

  dispatchDialog() {
    this.openDialog({
      template: this.loginTemplate,
    });
  }

  changeTemplate(templateName: TemplateRef<any>) {
    this.dialog.setTemplate(templateName);
  }
  closeDialog() {
    this.dialog.close();
  }

  private openDialog(dialogData: DialogData): void {
    this.dialog = this.dialogFactoryService.open(dialogData, {
      width: '400px',
      height: 'min-content',
      hasBackdrop: true,
      disableClose: true,
      closeOnNavigation: false,
    });
  }

  ngAfterViewInit(): void {
    this.dispatchDialog();
  }

  async onSubmit() {
    const user = this.loginForm.get('user')?.value;
    const pass = this.loginForm.get('password')?.value;
    const { status, message } = await this.auth.loginWithEmailAndPassword({ user, pass });
    if (status) {
      setTimeout(() => {
        this.closeDialog();
        this.router.navigate(['/home']);
      }, 1000);
    }
    else{
      this.viewError = true
    }
  }

  async onSubmitRegister() {
    const displayName = this.registerForm.get('userName')?.value;
    const password = this.registerForm.get('password')?.value;
    const email = this.registerForm.get('email')?.value;
    const firstName = this.registerForm.get('firstName')?.value;
    const lastName = this.registerForm.get('lastName')?.value;

    const data = {
      displayName,
      password,
      email,
      firstName,
      lastName,
    };
    const {status, message} = await this.auth.createNewUserWithEmailAndPassword(data);
    if (status) {
      setTimeout(() => {
        this.closeDialog();
        this.router.navigate(['/home']);
      }, 1000);
    }
    else{
      this.viewError = true
    }
  }

  passwordConfirming(c: AbstractControl): { valid: boolean } {
    if (c.get('password')?.value !== c.get('confirmPassword')?.value) {
      c.get('password')?.setErrors({ incorrect: true });
      c.get('confirmPassword')?.setErrors({ incorrect: true });
      return { valid: false };
    }
    c.get('password')?.setErrors(null);
    c.get('confirmPassword')?.setErrors(null);
    return { valid: true };
  }

  private formInicialization() {
    this.registerForm = new FormGroup(
      {
        userName: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        email: new FormControl('', [
          Validators.required,
          this.__emailValidator,
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
      },
      // this.passwordConfirming
    );

    this.loginForm = new FormGroup({
      user: new FormControl('', [
        Validators.required,
        this.__emailValidator,
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  autocomplete(){
    this.loginForm.get("user")?.setValue("test@demo.com")
    this.loginForm.get("password")?.setValue("123456")
  }
}
