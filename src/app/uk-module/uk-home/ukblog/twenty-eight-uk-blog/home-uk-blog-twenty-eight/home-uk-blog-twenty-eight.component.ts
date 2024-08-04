import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-twenty-eight',
  templateUrl: './home-uk-blog-twenty-eight.component.html',
  styleUrl: './home-uk-blog-twenty-eight.component.scss',
})
export class HomeUkBlogTwentyEightComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Smart Money - стратегія трейдингу - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Smart Money - Найкраща стратегія для трейдингу! Концепція Смарт Мані!',
    });
  }
}
