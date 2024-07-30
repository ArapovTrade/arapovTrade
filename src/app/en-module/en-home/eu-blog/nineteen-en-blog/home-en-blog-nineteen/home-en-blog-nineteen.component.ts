import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-nineteen',
  templateUrl: './home-en-blog-nineteen.component.html',
  styleUrl: './home-en-blog-nineteen.component.scss',
})
export class HomeEnBlogNineteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Smart Money - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Introduction to the Smart Money Concept',
    });
  }
}
