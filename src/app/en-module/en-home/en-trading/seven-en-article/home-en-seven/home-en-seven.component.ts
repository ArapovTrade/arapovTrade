import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-seven',
  templateUrl: './home-en-seven.component.html',
  styleUrl: './home-en-seven.component.scss',
})
export class HomeEnSevenComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'What is the Forex market? Why is it needed?',
    });
  }
}
