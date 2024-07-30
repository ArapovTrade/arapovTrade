import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-twenty-one',
  templateUrl: './home-uk-blog-twenty-one.component.html',
  styleUrl: './home-uk-blog-twenty-one.component.scss',
})
export class HomeUkBlogTwentyOneComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Як визначити маркетмейкера - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Як визначити маркетмейкера?',
    });
  }
}
