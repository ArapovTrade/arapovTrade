import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-thirty-four',
  templateUrl: './home-en-thirty-four.component.html',
  styleUrl: './home-en-thirty-four.component.scss',
})
export class HomeEnThirtyFourComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Stop-Limit Order - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'What is a limit order and how to use it?',
    });
  }
}
