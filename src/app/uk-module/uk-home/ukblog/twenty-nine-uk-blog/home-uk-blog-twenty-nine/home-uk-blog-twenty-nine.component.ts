import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-home-uk-blog-twenty-nine',
  templateUrl: './home-uk-blog-twenty-nine.component.html',
  styleUrl: './home-uk-blog-twenty-nine.component.scss',
})
export class HomeUkBlogTwentyNineComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Швидкий Старт у Трейдінгу - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Швидкий Старт у Трейдінгу | Як стати трейдером?',
    });
  }
}
