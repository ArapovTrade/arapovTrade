import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-four',
  templateUrl: './home-ru-blog-four.component.html',
  styleUrl: './home-ru-blog-four.component.scss',
})
export class HomeRuBlogFourComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Основные причины потери депозита  - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Основные причины потери депозита в Трейдинге',
    });
  }
}
