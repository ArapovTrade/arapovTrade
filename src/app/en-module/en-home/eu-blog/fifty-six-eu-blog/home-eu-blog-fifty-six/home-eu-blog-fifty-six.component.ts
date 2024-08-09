import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-eu-blog-fifty-six',
  templateUrl: './home-eu-blog-fifty-six.component.html',
  styleUrl: './home-eu-blog-fifty-six.component.scss',
})
export class HomeEuBlogFiftySixComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'What are the benefits of books on trading for beginners? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'What are the benefits of books on trading for beginners?',
    });
  }
}
