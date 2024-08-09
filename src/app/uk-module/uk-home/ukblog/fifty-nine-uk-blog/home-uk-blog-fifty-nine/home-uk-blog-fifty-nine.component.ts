import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-fifty-nine',
  templateUrl: './home-uk-blog-fifty-nine.component.html',
  styleUrl: './home-uk-blog-fifty-nine.component.scss',
})
export class HomeUkBlogFiftyNineComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Як торгувати Пробій рівня у трейдингу - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Як торгувати Пробій рівня у трейдингу',
    });
  }
}
