import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-twenty',
  templateUrl: './home-en-blog-twenty.component.html',
  styleUrl: './home-en-blog-twenty.component.scss',
})
export class HomeEnBlogTwentyComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Best time for trading - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'When is the best time to trade?',
    });
  }
}
