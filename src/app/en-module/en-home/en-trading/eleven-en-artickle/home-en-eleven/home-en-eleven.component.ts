import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-eleven',
  templateUrl: './home-en-eleven.component.html',
  styleUrl: './home-en-eleven.component.scss',
})
export class HomeEnElevenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Value date - Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'What is SWAP in the Forex market?',
    });
  }
}
