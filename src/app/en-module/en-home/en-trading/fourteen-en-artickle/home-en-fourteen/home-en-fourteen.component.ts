import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-fourteen',
  templateUrl: './home-en-fourteen.component.html',
  styleUrl: './home-en-fourteen.component.scss',
})
export class HomeEnFourteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Leverage Risk on FOREX - Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'What is leverage in trading? Main risks',
    });
  }
}
