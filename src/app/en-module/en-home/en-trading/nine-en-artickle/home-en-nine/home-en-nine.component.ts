import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-nine',
  templateUrl: './home-en-nine.component.html',
  styleUrl: './home-en-nine.component.scss',
})
export class HomeEnNineComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Formation of exchange rates - Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Formation of exchange rates on the Forex market',
    });
  }
}
