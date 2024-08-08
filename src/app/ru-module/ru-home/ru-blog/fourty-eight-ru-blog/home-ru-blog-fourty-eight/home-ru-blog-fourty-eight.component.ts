import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-fourty-eight',
  templateUrl: './home-ru-blog-fourty-eight.component.html',
  styleUrl: './home-ru-blog-fourty-eight.component.scss',
})
export class HomeRuBlogFourtyEightComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Инструкция по самостоятельному обучению Трейдингу - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Инструкция по самостоятельному обучению Трейдингу',
    });
  }
}
