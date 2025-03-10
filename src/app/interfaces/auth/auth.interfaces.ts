import {FormControl} from '@angular/forms';

export interface ILoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface IAuthData {
  name: string;
  email: string;
}
