import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less'],
})
export class ProfileComponent {
  oldPassword = new FormControl('');
  newPassword = new FormControl('');
  message = 'Password changed successfully';
  showParagraph = false;

  constructor(private router: Router, private http: HttpClient) {}

  changePassword() {
    console.log(this.oldPassword.value, this.newPassword.value);
    if (this.oldPassword.value === '' || this.newPassword.value === '') {
      console.log('Please fill the password fields');
      return;
    }
    const password = {
      email: localStorage.getItem('email'),
      oldPassword: this.oldPassword.value,
      newPassword: this.newPassword.value,
    };
    this.http
      .post('http://localhost:3001/auth/change-password', password)
      .subscribe(
        (res) => {
          console.log(res);
          this.showParagraph = true;
          setTimeout(() => {
            this.showParagraph = false;
          }, 5000);
          this.oldPassword.setValue('');
          this.newPassword.setValue('');
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
