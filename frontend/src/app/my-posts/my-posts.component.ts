import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.less'],
})
export class MyPostsComponent {
  title = 'frontend';
  myPosts: any;
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.http
      .post('http://localhost:3001/posts/my-posts', {
        email: localStorage.getItem('email'),
      })
      .subscribe(
        (res) => {
          console.log(res);
          this.myPosts = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
