import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-thirty-six',
  templateUrl: './home-en-thirty-six.component.html',
  styleUrl: './home-en-thirty-six.component.scss',
})
export class HomeEnThirtySixComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Separation of trading systems. Duration of the transaction - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Types of trading systems in trading. By timing of trades',
    });
  }
}
