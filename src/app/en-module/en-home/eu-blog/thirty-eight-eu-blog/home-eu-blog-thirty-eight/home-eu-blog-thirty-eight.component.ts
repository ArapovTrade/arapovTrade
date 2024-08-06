import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-eu-blog-thirty-eight',
  templateUrl: './home-eu-blog-thirty-eight.component.html',
  styleUrl: './home-eu-blog-thirty-eight.component.scss',
})
export class HomeEuBlogThirtyEightComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Complete Course on Smart Money Concept - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Complete Course on Smart Money Concept | Smart Money in Trading',
    });
  }
}
