import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-eighteen',
  templateUrl: './home-en-eighteen.component.html',
  styleUrl: './home-en-eighteen.component.scss',
})
export class HomeEnEighteenComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Psychology of Trading',
    });
  }
}
