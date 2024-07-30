import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-twenty-three',
  templateUrl: './home-uk-blog-twenty-three.component.html',
  styleUrl: './home-uk-blog-twenty-three.component.scss',
})
export class HomeUkBlogTwentyThreeComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Ліквідність у Трейдингу - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Смарт Мані | Ліквідність у Трейдингу | Рівні Ліквідності',
    });
  }
}
