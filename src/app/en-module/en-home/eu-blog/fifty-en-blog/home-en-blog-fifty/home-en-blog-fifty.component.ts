import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-fifty',
  templateUrl: './home-en-blog-fifty.component.html',
  styleUrl: './home-en-blog-fifty.component.scss',
})
export class HomeEnBlogFiftyComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Algorithmic Orders on the Exchange - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Algorithmic Orders on the Exchange | Trading Basics',
    });
  }
}
