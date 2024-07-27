import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-twelve',
  templateUrl: './home-uk-blog-twelve.component.html',
  styleUrl: './home-uk-blog-twelve.component.scss',
})
export class HomeUkBlogTwelveComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Торгівля рівнів - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Торгівля рівнів - основні правила роботи',
    });
  }
}
