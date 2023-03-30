import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-see-posts',
  templateUrl: './see-posts.component.html',
  styleUrls: ['./see-posts.component.less'],
})
export class SeePostsComponent {
  postData: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.postData = JSON.parse(this.getData() as string);
    console.log(this.postData);
  }

  getData() {
    if (localStorage.getItem('post') == null) {
      return { nothing: 'nothing' };
    }
    return localStorage.getItem('post');
  }

  toggleHeart(icon: any) {
    icon.classList.toggle('far');
    icon.classList.toggle('fas');
  }

  backHome() {
    this.router.navigate(['/home']);
  }
}
