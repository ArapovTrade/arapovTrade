import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-nineteen',
  templateUrl: './home-en-nineteen.component.html',
  styleUrl: './home-en-nineteen.component.scss',
})
export class HomeEnNineteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'How to Trade on the FOREX Currency Market Online - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'How to trade Forex correctly?',
    });
  }
}
