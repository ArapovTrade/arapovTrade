import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-thirty-six',
  templateUrl: './home-uk-blog-thirty-six.component.html',
  styleUrl: './home-uk-blog-thirty-six.component.scss',
})
export class HomeUkBlogThirtySixComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Навчання Трейдінгу Криптовалют - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Навчання Трейдингу | Навчання Трейдінгу Криптовалют',
    });
  }
}
