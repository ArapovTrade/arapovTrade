import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-thirty',
  templateUrl: './home-en-blog-thirty.component.html',
  styleUrl: './home-en-blog-thirty.component.scss',
})
export class HomeEnBlogThirtyComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Cryptocurrency Basics for Beginner Traders - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Cryptocurrency Basics for Beginner Traders',
    });
  }
}
