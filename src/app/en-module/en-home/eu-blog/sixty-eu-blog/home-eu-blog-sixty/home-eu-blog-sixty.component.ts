import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-eu-blog-sixty',
  templateUrl: './home-eu-blog-sixty.component.html',
  styleUrl: './home-eu-blog-sixty.component.scss',
})
export class HomeEuBlogSixtyComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Trading Vs Options comparison of instruments - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Trading Vs Options comparison of instruments',
    });
  }
}
