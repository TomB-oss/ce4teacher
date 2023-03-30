import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent {
  title = 'frontend';
  allPosts: any;
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.http
      .post('http://localhost:3001/posts', {
        email: localStorage.getItem('email'),
      })
      .subscribe(
        (res) => {
          console.log(res);
          this.allPosts = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  toggleHeart(icon: any) {
    icon.classList.toggle('far');
    icon.classList.toggle('fas');
  }

  clickPost(post: any) {
    localStorage.setItem('post', JSON.stringify(post));
    this.router.navigate(['/see-posts']);
  }
}
