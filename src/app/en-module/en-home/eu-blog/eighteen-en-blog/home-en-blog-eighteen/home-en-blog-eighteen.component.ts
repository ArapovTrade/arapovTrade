import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-eighteen',
  templateUrl: './home-en-blog-eighteen.component.html',
  styleUrl: './home-en-blog-eighteen.component.scss',
})
export class HomeEnBlogEighteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Volumetric market analysis - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'The Grail of Trading - Volume Market Analysis',
    });
  }
}
