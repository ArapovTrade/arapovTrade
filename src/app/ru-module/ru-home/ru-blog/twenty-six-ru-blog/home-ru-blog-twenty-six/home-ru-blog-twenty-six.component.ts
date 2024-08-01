import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-twenty-six',
  templateUrl: './home-ru-blog-twenty-six.component.html',
  styleUrl: './home-ru-blog-twenty-six.component.scss',
})
export class HomeRuBlogTwentySixComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Виды ордеров на бирже - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Виды ордеров на бирже и их влияние на цену',
    });
  }
}
