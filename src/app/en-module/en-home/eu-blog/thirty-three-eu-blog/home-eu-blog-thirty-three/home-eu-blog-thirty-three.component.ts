import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-eu-blog-thirty-three',
  templateUrl: './home-eu-blog-thirty-three.component.html',
  styleUrl: './home-eu-blog-thirty-three.component.scss',
})
export class HomeEuBlogThirtyThreeComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Pin Bar - The Grail of Trading - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Pin Bar - The Grail of Trading',
    });
  }
}
