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
    this.http.get('http://localhost:3001/posts').subscribe(
      (res) => {
        console.log(res);
        this.allPosts = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
