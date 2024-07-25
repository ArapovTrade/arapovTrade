import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-seven',
  templateUrl: './home-uk-blog-seven.component.html',
  styleUrl: './home-uk-blog-seven.component.scss',
})
export class HomeUkBlogSevenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Як Заробляють у Трейдінгу? - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Як Заробляють у Трейдінгу? | Основи Трейдингу для Початківців',
    });
  }
}
