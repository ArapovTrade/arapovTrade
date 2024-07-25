import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-six',
  templateUrl: './home-uk-blog-six.component.html',
  styleUrl: './home-uk-blog-six.component.scss',
})
export class HomeUkBlogSixComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Смарт Мані - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Смарт Мані - Повний Курс з Трейдингу! Навчання трейдингу з нуля',
    });
  }
}
