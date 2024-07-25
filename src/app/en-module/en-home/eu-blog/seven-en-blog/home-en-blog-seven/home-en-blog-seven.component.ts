import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-seven',
  templateUrl: './home-en-blog-seven.component.html',
  styleUrl: './home-en-blog-seven.component.scss',
})
export class HomeEnBlogSevenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'How to make money from trading? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'How to make money from trading? | Trading Basics for Beginners',
    });
  }
}
