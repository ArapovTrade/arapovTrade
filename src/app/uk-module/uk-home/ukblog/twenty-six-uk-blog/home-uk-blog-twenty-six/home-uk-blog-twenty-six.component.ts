import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-twenty-six',
  templateUrl: './home-uk-blog-twenty-six.component.html',
  styleUrl: './home-uk-blog-twenty-six.component.scss',
})
export class HomeUkBlogTwentySixComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Види ордерів на біржі - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Види ордерів на біржі та їх вплив на ціну',
    });
  }
}
