import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-fourty-six',
  templateUrl: './home-en-fourty-six.component.html',
  styleUrl: './home-en-fourty-six.component.scss',
})
export class HomeEnFourtySixComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Main Reasons for Losing Money on the Stock Exchange - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'How not to lose money in trading?',
    });
  }
}
