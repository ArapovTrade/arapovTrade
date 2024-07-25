import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-five',
  templateUrl: './home-uk-blog-five.component.html',
  styleUrl: './home-uk-blog-five.component.scss',
})
export class HomeUkBlogFiveComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Ціноутворення та Ліквідність - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Ціноутворення та Ліквідність | Що це та як використовувати?',
    });
  }
}
