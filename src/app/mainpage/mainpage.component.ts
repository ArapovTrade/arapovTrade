import { Component, OnInit, HostListener,AfterViewInit, ChangeDetectorRef} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router ,NavigationEnd } from '@angular/router';
 
declare var AOS: any;

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.scss',
})
export class MainpageComponent implements OnInit, AfterViewInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private router: Router,
    private cdr:ChangeDetectorRef
  ) {
    this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
            if (typeof window !== 'undefined') {
              window.scrollTo(0, 0);
            }
          }
        });
  }

  ngAfterViewInit() {
     if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        once: false,
        offset: 100
      });
    }  
  }
  isDark = false;
  languages = ['ua', 'en', 'ru']; // какие языки нужны
  currentLang = 'ua';
  dropdownOpen = false;
  menuOpen: boolean = false;
  ngOnInit() {
    this.titleService.setTitle(
      'Безкоштовне навчання трейдингу — курс Ігоря Арапова'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Безкоштовний курс з трейдингу Ігоря Арапова: 130 + статей і 70 відео. Вивчайте теханаліз, ризик-менеджмент і торгові стратегії онлайн',
    });

    this.meta.addTag({
      name: 'keywords',
      content:
        'трейдинг, навчання трейдингу, технічний аналіз, фінансова біржа, торгова система, Ігор Арапов',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-06-07' });
    this.meta.updateTag({
      property: 'og:image',
      content: 'assets/img/photo_mainpage.jpg',
    });

    const savedTheme = this.getLocal('theme');
    if (savedTheme) {
      this.isDark = savedTheme === 'dark';
    }
  }
  toggleTheme() {
    this.isDark = !this.isDark;
    this.setLocal('theme', this.isDark ? 'dark' : 'light');
     this.refreshAOS();


  }
refreshAOS() {
    if (typeof AOS !== 'undefined') {
      setTimeout(() => {
        AOS.refresh(); // Обновление позиций AOS
        this.cdr.detectChanges(); // Принудительное обнаружение изменений
      }, 100); // Задержка для синхронизации
    } else {
      console.warn('AOS is not defined, refresh skipped');
    }
  }
  private getLocal(key: string): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem(key) : null;
  }

  private setLocal(key: string, value: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  selectLang(lang: string) {
    this.currentLang = lang;

    this.dropdownOpen = false;

    // this.router.navigate([`/${lang}`]);
  }
  navigateTo(path: string) {
    this.router.navigate([path]);
  }
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      this.dropdownOpen = false; // Закрываем меню языков, если открываем навигацию
    }
  }

  scrollPosition: number = 0;
  circleRadius: number = 25;
  circumference: number = 2 * Math.PI * this.circleRadius;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = Math.min(
      100,
      (this.scrollPosition / maxScroll) * 100
    );
    this.updateProgressRing(scrollPercentage);
    this.toggleButtonVisibility();
  }

  toggleButtonVisibility() {
    const button = document.querySelector('.scroll-to-top') as HTMLElement;
    if (this.scrollPosition > 100) {
      // Показываем кнопку после 100px скролла
      button.classList.add('visible');
    } else {
      button.classList.remove('visible');
    }
  }

  updateProgressRing(percentage: number) {
    const path = document.querySelector('.progress-ring__path') as SVGElement;
    const dashOffset =
      this.circumference - (percentage / 100) * this.circumference;
    path.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
    path.style.strokeDashoffset = dashOffset.toString();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  hovered: string | null = null;
}
