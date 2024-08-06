import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-eu-blog-thirty-two',
  templateUrl: './home-eu-blog-thirty-two.component.html',
  styleUrl: './home-eu-blog-thirty-two.component.scss',
})
export class HomeEuBlogThirtyTwoComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      ' Is it worth purchasing trading courses? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Is it worth purchasing trading courses?',
    });
  }
}
