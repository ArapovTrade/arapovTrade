import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-fifty-five',
  templateUrl: './home-ru-blog-fifty-five.component.html',
  styleUrl: './home-ru-blog-fifty-five.component.scss',
})
export class HomeRuBlogFiftyFiveComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Скальпинг в трейдинге - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Скальпинг в трейдинге что нужно знать начинающим?',
    });
  }
}
