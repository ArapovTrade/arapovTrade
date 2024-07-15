import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-six',
  templateUrl: './home-en-six.component.html',
  styleUrl: './home-en-six.component.scss',
})
export class HomeEnSixComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Main participants of the exchange - Arapov.trade'
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Main participants of the exchange. Classification and functionality',
    });
  }
}
