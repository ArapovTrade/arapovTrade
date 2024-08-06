import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-eu-blog-thirty-one',
  templateUrl: './home-eu-blog-thirty-one.component.html',
  styleUrl: './home-eu-blog-thirty-one.component.scss',
})
export class HomeEuBlogThirtyOneComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Levels of Support and Resistance - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Levels of Support and Resistance! How to determine! Trading training',
    });
  }
}
