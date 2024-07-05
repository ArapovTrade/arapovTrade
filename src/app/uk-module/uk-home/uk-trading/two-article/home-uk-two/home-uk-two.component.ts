import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CanonicalService } from '../../../../../servises/canonical.service';
@Component({
  selector: 'app-home-uk-two',
  templateUrl: './home-uk-two.component.html',
  styleUrl: './home-uk-two.component.scss',
})
export class HomeUkTwoComponent implements OnInit {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private cs: CanonicalService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Основи ринку');
    this.metaService.addTag({
      name: 'description',
      content: 'Короткий словник термінів',
    });
    this.metaService.addTag({
      name: 'keywords',
      content: 'Основи ринку, словник ткрмінів',
    });
  }
}
