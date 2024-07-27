import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-eleven',
  templateUrl: './home-ru-blog-eleven.component.html',
  styleUrl: './home-ru-blog-eleven.component.scss',
})
export class HomeRuBlogElevenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Стартовый депозит Трейдера - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Стартовый депозит Трейдера: с какой суммы лучше начинать?',
    });
  }
}
