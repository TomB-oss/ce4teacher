import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent {
  email = new FormControl('');
  password = new FormControl('');
  showNavbar = true;
  showError = false;

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    this.http
      .post('http://localhost:3001/auth/login', {
        email: this.email.value,
        password: this.password.value,
      })
      .subscribe(
        (res) => {
          let obj: any;
          console.log(res);
          obj = res;
          localStorage.setItem('email', obj.email);
          this.router.navigate(['/home']);
        },
        (err) => {
          this.showError = true;
          setTimeout(() => {
            this.showError = false;
          }, 10000);
          console.log(err);
        }
      );
  }
}
