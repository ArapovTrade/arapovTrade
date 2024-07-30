import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-twenty-two',
  templateUrl: './home-uk-blog-twenty-two.component.html',
  styleUrl: './home-uk-blog-twenty-two.component.scss',
})
export class HomeUkBlogTwentyTwoComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Цінові фігури в трейдингу - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Про цінові фігури в трейдингу',
    });
  }
}
