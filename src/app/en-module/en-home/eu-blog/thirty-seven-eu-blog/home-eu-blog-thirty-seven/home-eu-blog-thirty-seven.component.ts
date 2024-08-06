import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-eu-blog-thirty-seven',
  templateUrl: './home-eu-blog-thirty-seven.component.html',
  styleUrl: './home-eu-blog-thirty-seven.component.scss',
})
export class HomeEuBlogThirtySevenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Drawdowns in trading - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Drawdowns in trading | The main mistakes of new traders',
    });
  }
}
