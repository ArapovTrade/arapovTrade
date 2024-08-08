import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-fourty-nine',
  templateUrl: './home-ru-blog-fourty-nine.component.html',
  styleUrl: './home-ru-blog-fourty-nine.component.scss',
})
export class HomeRuBlogFourtyNineComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Как выбрать торговую платформу для трейдинга - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Как выбрать торговую платформу для трейдинга',
    });
  }
}
