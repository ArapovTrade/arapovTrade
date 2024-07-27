import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-en-home',
  templateUrl: './en-home.component.html',
  styleUrl: './en-home.component.scss',
})
export class EnHomeComponent implements OnInit {
  constructor(
    private router: Router,
    private meta: Meta,
    private titleService: Title
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (typeof window !== 'undefined') {
          // Ваш код, который использует window
          window.scrollTo(0, 0);
        }
      }
    });
  }
  ngOnInit(): void {
    this.titleService.setTitle(
      "Trading courses Author's online trading education| Igor Arapov"
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: "Author's ⏩ trading courses from Igor Arapov",
    });
    this.meta.addTag({
      name: 'keywords',
      content:
        'trading courses, trading, currencies, trading training, free trading training, free trading training, cryptocurrency trading training, free trading courses, trading from scratch, trading courses',
    });
  }
  isMenuOpen = false;

  openMenu() {
    this.isMenuOpen = true;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
