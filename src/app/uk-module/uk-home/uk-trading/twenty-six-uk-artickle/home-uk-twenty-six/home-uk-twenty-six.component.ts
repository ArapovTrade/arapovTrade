import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-twenty-six',
  templateUrl: './home-uk-twenty-six.component.html',
  styleUrl: './home-uk-twenty-six.component.scss',
})
export class HomeUkTwentySixComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Технічний аналіз ринку - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Технічний аналіз ринку. Трейдинг',
    });
  }
}
