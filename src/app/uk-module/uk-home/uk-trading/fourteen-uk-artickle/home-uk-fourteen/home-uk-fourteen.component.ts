import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-fourteen',
  templateUrl: './home-uk-fourteen.component.html',
  styleUrl: './home-uk-fourteen.component.scss',
})
export class HomeUkFourteenComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Що таке кредитне плече у трейдингу? Основні ризики',
    });
  }
}
