import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-twenty-eight',
  templateUrl: './home-ru-blog-twenty-eight.component.html',
  styleUrl: './home-ru-blog-twenty-eight.component.scss',
})
export class HomeRuBlogTwentyEightComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Smart Money - стратегия трейдинга - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Smart Money - Лучшая стратегия для трейдинга ! Концепция Смарт Мани !',
    });
  }
}
