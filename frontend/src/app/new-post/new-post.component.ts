import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.less'],
})
export class NewPostComponent {
  title = new FormControl('');
  description = new FormControl('');
  category = new FormControl('');
  image = new FormControl('');
  price = new FormControl(0);

  constructor(private router: Router, private http: HttpClient) {}

  submit() {
    if (this.title.value === '' || this.description.value === '') {
      console.log('Please fill the title and description fields');
      return;
    }
    const post = {
      email: localStorage.getItem('email'),
      title: this.title.value,
      description: this.description.value,
      category: this.category.value,
      image: this.image.value,
      price: this.price.value,
    };
    this.http.post('http://localhost:3001/new-post/create', post).subscribe(
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
