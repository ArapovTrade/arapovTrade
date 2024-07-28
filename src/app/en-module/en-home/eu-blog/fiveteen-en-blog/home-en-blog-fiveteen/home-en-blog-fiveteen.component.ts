import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-fiveteen',
  templateUrl: './home-en-blog-fiveteen.component.html',
  styleUrl: './home-en-blog-fiveteen.component.scss',
})
export class HomeEnBlogFiveteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'The whole truth about futures trading - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'The whole truth about futures trading',
    });
  }
}
