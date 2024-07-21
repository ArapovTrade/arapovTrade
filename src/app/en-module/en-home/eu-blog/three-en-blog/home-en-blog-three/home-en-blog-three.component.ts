import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-three',
  templateUrl: './home-en-blog-three.component.html',
  styleUrl: './home-en-blog-three.component.scss',
})
export class HomeEnBlogThreeComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Volatility in trading  - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Volatility in trading - what is it and how to use it?',
    });
  }
}
