import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-seventeen',
  templateUrl: './home-uk-blog-seventeen.component.html',
  styleUrl: './home-uk-blog-seventeen.component.scss',
})
export class HomeUkBlogSeventeenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Топ міфів про трейдинг - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Топ міфів про трейдинг і помилки новачків',
    });
  }
}
