import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-fifty-one',
  templateUrl: './home-ru-blog-fifty-one.component.html',
  styleUrl: './home-ru-blog-fifty-one.component.scss',
})
export class HomeRuBlogFiftyOneComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Cвечные паттерны в Price Action - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Cвечные паттерны в Price Action',
    });
  }
}
