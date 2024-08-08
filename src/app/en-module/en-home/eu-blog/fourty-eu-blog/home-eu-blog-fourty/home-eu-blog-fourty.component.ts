import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-home-eu-blog-fourty',
  templateUrl: './home-eu-blog-fourty.component.html',
  styleUrl: './home-eu-blog-fourty.component.scss',
})
export class HomeEuBlogFourtyComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Why is trading so difficult? - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Why is trading so difficult?  Market Psychology',
    });
  }
}
