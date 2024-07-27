import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-twelve',
  templateUrl: './home-ru-blog-twelve.component.html',
  styleUrl: './home-ru-blog-twelve.component.scss',
})
export class HomeRuBlogTwelveComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Торговля уровней- Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Торговля уровней - основные правила работы',
    });
  }
}
