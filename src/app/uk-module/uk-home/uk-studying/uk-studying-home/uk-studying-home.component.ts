import {  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  RendererFactory2,  ElementRef, HostListener, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
declare var AOS: any;
import { ThemeservService } from '../../../../servises/themeserv.service';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { LangService } from '../../../../servises/lang.service';

@Component({
  selector: 'app-uk-studying-home',
  templateUrl: './uk-studying-home.component.html',
  styleUrl: './uk-studying-home.component.scss',
})
export class UkStudyingHomeComponent implements OnInit , AfterViewInit, OnDestroy{
 
  private renderer: Renderer2;
  constructor(
    private router: Router,
    private meta: Meta,
       private cdr:ChangeDetectorRef,
       private themeService:ThemeservService,
        private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
    private titleService: Title,
    private lang: LangService
  ) {

    this.renderer = rendererFactory.createRenderer(null, null);


     
  }

  ngAfterViewInit() {
  setTimeout(() => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        once: false,
        offset: 100
      });
    }
     
  }, 500); // Задержка 0.5s
}
  isMenuOpen = false;

  openMenu() {
    this.isMenuOpen = true;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

   
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      this.dropdownOpen = false; // Закрываем меню языков, если открываем навигацию
    }
  } 
  isDark!:boolean  ;
  languages = ['ua', 'en', 'ru']; // какие языки нужны
  currentLang = 'ua';
  dropdownOpen = false;
  menuOpen: boolean = false;


  ngOnInit(): void {
    this.lang.setNumber(1);

    this.titleService.setTitle(
      'Курси трейдингу онлайн | Навчання трейдингу з нуля'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Онлайн-курси з трейдингу від Ігоря Арапова — навчання трейдингу та інвестиціям з нуля, дистанційно та безкоштовно. Вивчайте технічний та фундаментальний аналіз, торгові стратегії та управління ризиками крок за кроком.',
    });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'курси трейдингу, навчання трейдингу онлайн, трейдинг з нуля, дистанційне навчання, інвестиції, торгові стратегії',
    });

    this.themeSubscription =this.themeService.getTheme().subscribe(data=>{
      this.isDark=data;
        this.cdr.detectChanges();
    })


    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
        }
      }
    });


  }
  navigateToHomeWithId() {
    this.router.navigateByUrl('/uk').then(() => {
      setTimeout(() => {
        this.scrollToRegistration();
      }, 100);
    });
  }
  scrollToRegistration() {
    const element = document.getElementById('registration');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private routerSubscription!: Subscription;
      private themeSubscription!: Subscription;
       ngOnDestroy() {
        // Отписка от подписок
        if (this.routerSubscription) {
          this.routerSubscription.unsubscribe();
        }
        if (this.themeSubscription) {
          this.themeSubscription.unsubscribe();
        }
      } 
      hovered: string | null = null;
      toggleTheme() {
      this.isDark = !this.isDark;
      this.themeService.setTheme(this.isDark)
       
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
     
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    }
    selectLang(lang: string) {
      this.currentLang = lang;
  
      this.dropdownOpen = false;
  
       
    }
    navigateTo(path: string) {
      this.router.navigate([path]);
    }

 @ViewChild('programSection', { static: true }) section!: ElementRef;
  @ViewChild('timelineProgress', { static: true }) progress!: ElementRef;

  @HostListener('window:scroll', [])
onScroll() {
  const section = this.section.nativeElement;
  const progress = this.progress.nativeElement;

  const rect = section.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // расстояние от верха страницы до секции
  const start = rect.top + window.scrollY - windowHeight;
  const end = rect.bottom + window.scrollY;
  const scrollPos = window.scrollY;

  // процент прокрутки блока
  const percent = Math.min(Math.max((scrollPos - start) / (end - start), 0), 1);

  progress.style.height = `${percent * 100}%`;
}
    
}
