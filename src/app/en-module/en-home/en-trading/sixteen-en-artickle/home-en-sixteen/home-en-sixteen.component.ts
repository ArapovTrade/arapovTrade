import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-sixteen',
  templateUrl: './home-en-sixteen.component.html',
  styleUrl: './home-en-sixteen.component.scss',
})
export class HomeEnSixteenComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Psychology of trading. Behavioral risks',
    });
  }
}
