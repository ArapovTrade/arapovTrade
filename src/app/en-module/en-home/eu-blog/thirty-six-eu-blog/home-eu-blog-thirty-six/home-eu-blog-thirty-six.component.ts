import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-eu-blog-thirty-six',
  templateUrl: './home-eu-blog-thirty-six.component.html',
  styleUrl: './home-eu-blog-thirty-six.component.scss',
})
export class HomeEuBlogThirtySixComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Cryptocurrency Trading Training - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Trading Training | Cryptocurrency Trading Training',
    });
  }
}
