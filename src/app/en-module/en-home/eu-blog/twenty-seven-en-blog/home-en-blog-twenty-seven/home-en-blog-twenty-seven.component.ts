import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-twenty-seven',
  templateUrl: './home-en-blog-twenty-seven.component.html',
  styleUrl: './home-en-blog-twenty-seven.component.scss',
})
export class HomeEnBlogTwentySevenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'How to read Japanese candlesticks? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'How to read Japanese candlesticks? The right way for beginners',
    });
  }
}
