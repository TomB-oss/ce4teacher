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
  titleValue = '';
  description = new FormControl('');
  descriptionValue = '';
  category = new FormControl('');
  categoryValue = '';
  image = new FormControl('');
  location = new FormControl('');
  locationValue = '';
  price = new FormControl(0);

  constructor(private router: Router, private http: HttpClient) {}

  submit() {
    if (
      this.title.value === '' ||
      this.category.value === '' ||
      this.description.value === '' ||
      this.location.value === ''
    ) {
      console.log('Please fill the title and description fields');
      return;
    }
    console.log(this.category);
    const post = {
      email: localStorage.getItem('email'),
      title: this.title.value,
      description: this.description.value,
      location: this.location.value,
      category: this.category.value,
      image: this.image.value,
      price: this.price.value,
    };
    console.log(post);
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
