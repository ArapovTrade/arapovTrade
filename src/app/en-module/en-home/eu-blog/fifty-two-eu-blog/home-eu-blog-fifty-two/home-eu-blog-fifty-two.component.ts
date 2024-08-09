import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-eu-blog-fifty-two',
  templateUrl: './home-eu-blog-fifty-two.component.html',
  styleUrl: './home-eu-blog-fifty-two.component.scss',
})
export class HomeEuBlogFiftyTwoComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Anatomy of market trends - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Anatomy of market trends | Volumetric market analysis',
    });
  }
}
