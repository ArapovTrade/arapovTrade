import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-one',
  templateUrl: './home-en-blog-one.component.html',
  styleUrl: './home-en-blog-one.component.scss',
})
export class HomeEnBlogOneComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Market phases in trading  - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Market phases in trading, what are they?',
    });
  }
}
