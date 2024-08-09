import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-fifty',
  templateUrl: './home-uk-blog-fifty.component.html',
  styleUrl: './home-uk-blog-fifty.component.scss',
})
export class HomeUkBlogFiftyComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Алгоритмічні Ордери на Біржі - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Алгоритмічні Ордери на Біржі | Основи Трейдінга',
    });
  }
}
