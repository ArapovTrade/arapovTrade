import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-fifty-six',
  templateUrl: './home-uk-blog-fifty-six.component.html',
  styleUrl: './home-uk-blog-fifty-six.component.scss',
})
export class HomeUkBlogFiftySixComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Книги з трейдингу - в чому користь для початківців? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Книги з трейдингу - в чому користь для початківців?',
    });
  }
}
