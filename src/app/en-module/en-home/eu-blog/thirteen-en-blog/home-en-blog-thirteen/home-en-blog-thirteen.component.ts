import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-thirteen',
  templateUrl: './home-en-blog-thirteen.component.html',
  styleUrl: './home-en-blog-thirteen.component.scss',
})
export class HomeEnBlogThirteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Elliott Waves and Fibonacci Levels - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Elliott Waves and Fibonacci Levels | Trading Training',
    });
  }
}
