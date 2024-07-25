import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-nine',
  templateUrl: './home-en-blog-nine.component.html',
  styleUrl: './home-en-blog-nine.component.scss',
})
export class HomeEnBlogNineComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'How to predict the market price? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'How to predict the market price? About Trading for Beginners',
    });
  }
}
