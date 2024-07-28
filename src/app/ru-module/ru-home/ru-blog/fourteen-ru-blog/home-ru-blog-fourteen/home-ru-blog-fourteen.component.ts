import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-fourteen',
  templateUrl: './home-ru-blog-fourteen.component.html',
  styleUrl: './home-ru-blog-fourteen.component.scss',
})
export class HomeRuBlogFourteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Трейдинг и Инвестиции что лучше? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Трейдинг и Инвестиции что лучше? Плюсы и минусы',
    });
  }
}
