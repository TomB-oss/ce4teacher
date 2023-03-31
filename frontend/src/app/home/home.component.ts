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
  likedPosts: any;
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.getPosts();
    // this.getLikedPost();
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

  async getLikedPost() {
    await this.http
      .post('http://localhost:3001/posts/liked-posts', {
        email: localStorage.getItem('email'),
      })
      .subscribe(
        (res) => {
          console.log(res);
          this.likedPosts = res;
          if (this.likedPosts != null) {
            this.likedPosts.forEach((post: any) => {
              console.log(post.id);
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  toggleHeart(icon: any, event: any, post: any) {
    event.stopPropagation();

    icon.classList.toggle('far');
    icon.classList.toggle('fas');

    this.http
      .post('http://localhost:3001/posts/like', {
        email: localStorage.getItem('email'),
        postId: post.id,
      })
      .subscribe((res) => {
        console.log('liked: ', res);
      });
  }

  clickPost(post: any) {
    localStorage.setItem('post', JSON.stringify(post));
    this.router.navigate(['/see-posts']);
  }
}
