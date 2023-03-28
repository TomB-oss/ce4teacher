import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class RegisterComponent {
  name = new FormControl('');
  email = new FormControl('');
  password = new FormControl('');

  constructor(private router: Router, private http: HttpClient) {}

  register() {
    this.http
      .post('http://localhost:3001/auth/register', {
        name: this.name.value,
        email: this.email.value,
        password: this.password.value,
      })
      .subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/home']);
        },

        (err) => {
          console.log(err);
        }
      );
  }
}
