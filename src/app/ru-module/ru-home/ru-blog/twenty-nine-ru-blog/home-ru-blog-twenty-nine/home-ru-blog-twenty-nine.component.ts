import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-twenty-nine',
  templateUrl: './home-ru-blog-twenty-nine.component.html',
  styleUrl: './home-ru-blog-twenty-nine.component.scss',
})
export class HomeRuBlogTwentyNineComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Быстрый Старт в Трейдинге - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Быстрый Старт в Трейдинге | Как стать трейдером ?',
    });
  }
}
