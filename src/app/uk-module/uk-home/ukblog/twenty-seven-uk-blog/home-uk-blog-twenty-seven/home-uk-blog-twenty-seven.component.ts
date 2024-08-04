import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-twenty-seven',
  templateUrl: './home-uk-blog-twenty-seven.component.html',
  styleUrl: './home-uk-blog-twenty-seven.component.scss',
})
export class HomeUkBlogTwentySevenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Як читати японські свічки? - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Як читати японські свічки? Правильний спосіб для початківців',
    });
  }
}
