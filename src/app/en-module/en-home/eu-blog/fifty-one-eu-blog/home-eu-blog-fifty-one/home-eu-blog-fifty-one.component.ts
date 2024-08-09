import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-eu-blog-fifty-one',
  templateUrl: './home-eu-blog-fifty-one.component.html',
  styleUrl: './home-eu-blog-fifty-one.component.scss',
})
export class HomeEuBlogFiftyOneComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Candlestick patterns in Price Action - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Candlestick patterns in Price Action',
    });
  }
}
