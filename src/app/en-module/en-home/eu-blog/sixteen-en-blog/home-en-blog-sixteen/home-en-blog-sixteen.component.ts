import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-sixteen',
  templateUrl: './home-en-blog-sixteen.component.html',
  styleUrl: './home-en-blog-sixteen.component.scss',
})
export class HomeEnBlogSixteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Trending channels - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Trading for beginners from A to Z | Trending channels',
    });
  }
}
