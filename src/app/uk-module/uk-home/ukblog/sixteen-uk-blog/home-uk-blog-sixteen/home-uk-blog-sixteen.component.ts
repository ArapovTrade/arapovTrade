import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-sixteen',
  templateUrl: './home-uk-blog-sixteen.component.html',
  styleUrl: './home-uk-blog-sixteen.component.scss',
})
export class HomeUkBlogSixteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Трендові канали - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Трейдинг для початківців від А до Я | Трендові канали',
    });
  }
}
