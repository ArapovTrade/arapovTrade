import { Component, OnInit,ChangeDetectorRef,Inject,Renderer2, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeservService } from '../../../../../servises/themeserv.service';
import { artickle } from '../../../../../servises/articles.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-fifty-one',
  templateUrl: './home-ru-blog-fifty-one.component.html',
  styleUrl: './home-ru-blog-fifty-one.component.scss',
})
export class HomeRuBlogFiftyOneComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr:ChangeDetectorRef,
  private router: Router,
    private themeService:ThemeservService,
    private artickleServ: ArticlesService,private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}
  private routerSubscription!: Subscription;
 private themeSubscription!: Subscription;
  isDark!:boolean  ;
  ukrGroups: any = [];
 grr!: any;
  checkedGroup!: any;

  readonly panelOpenState = signal(false);

 ngOnInit(): void {
     this.removeSelectedSchemas();
    this.setArticleSchema();
    this.setPersonSchema();
    this.setFaqSchema();
    this.setHowToSchema();
    this.setGlossarySchema();


     this.themeSubscription =this.themeService.getTheme().subscribe(data=>{
      this.isDark=data;
        this.cdr.detectChanges();
    })
    
 this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
    this.titleService.setTitle('Price Action в трейдинге: полное руководство | ArapovTrade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Узнайте, как использовать метод Price Action в трейдинге. Свечные паттерны, уровни поддержки и сопротивления, стратегии торговли без индикаторов.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-17' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/candlestickpatterns.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }
  
  
  hoveredIndex: number | null = null;
  
  projects = [
  { title: 'Быстрый старт', link: 'https://arapov.education/course/' },
  { title: 'Введение в трейдинг', link: 'https://arapov.education/reg-workshop/' },
  { title: 'Профессиональные курсы', link: 'https://arapov.trade/ru/studying' },
  { title: 'Базовый курс', link: 'https://arapov.trade/ru/freestudying/freeeducation' },
  { title: 'Копитрейдинг', link: 'https://arapovcopytrade.com' },
];
  
  
  
   
    onGroupChange(event: Event) {
       
     
       const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
    
      this.router.navigate(['/ru/freestudying'], {
      queryParams: { group: value }
    });
     
   
    
    this.checkedGroup = this.artickleServ.selectedGroups;
    
    }
    paginatedArticles = []; // Статьи для отображения на текущей странице
    currentPage = 0;
    pageSize = 10;
     
  
     
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
         
         
    
    
      }
    
       
       
      navigateTo(path: string) {
        this.router.navigate([path]);
      }
  
  
  
      articleCounts: { [key: string]: number } = {};
      updateArticleCounts() {
    this.articleCounts = {}; // очищаем
  
    this.artickleServ.ukrArtickles.forEach(article => {
      // article.groupsUkr — это массив, например ['Програмування', 'Маркетинг']
      article.groupsRus.forEach(group => {
        if (!this.articleCounts[group]) {
          this.articleCounts[group] = 1;
        } else {
          this.articleCounts[group]++;
        }
      });
    });
  }
    //popup
    flag1: boolean = false;
    flagTrue1: boolean = true;
    searchtoggle(event: Event) {
      this.flag1 = !this.flag1;
      this.flagTrue1 = !this.flagTrue1;
    }
  
  
  isFocused = false;
  displayedArticles: artickle[] = [];
  maxResults = 5;
  searchQuery: string = '';
  
  onFocus() {
    this.isFocused = true;
  
    // Показываем 5 случайных статей при фокусе, если инпут пуст
    if (!this.searchQuery) {
      const shuffled = [...this.artickleServ.ukrArtickles].sort(() => Math.random() - 0.5);
      this.displayedArticles = shuffled.slice(0, this.maxResults);
    }
  }
  
  onBlur() {
    setTimeout(() => {
      this.isFocused = false;
    }, 150); // таймаут чтобы клик по статье сработал
  }
  
  onSearchChange() {
    // Логика асинхронного поиска
    const filtered = this.artickleServ.ukrArtickles.filter(a =>
      a.titleUkr.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.displayedArticles = filtered.slice(0, this.maxResults);
  }
  
  moveToTheTop(){
    const element = document.getElementById('scrollToTop');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
  groupsMenuOpen = false;
     toggleGroupsMenu(event: Event) {
      
      this.groupsMenuOpen = !this.groupsMenuOpen;
    }

    goToNextPage(){
      let nextpage:any;
      const path:string=this.router.url.split('/')[this.router.url.split('/').length-1];
      let index=this.artickleServ.ukrArtickles.findIndex(a=>a.linkUkr==path);
     
      if(this.artickleServ.ukrArtickles.length-1==index){
      nextpage=this.artickleServ.ukrArtickles[0].linkUkr;
      }else{
        nextpage=this.artickleServ.ukrArtickles[index+1].linkUkr;
      }
      
       
       this.router.navigate(['/ru/freestudying', nextpage] )
      
    }



    goToPreviousPage(){
      let nextpage:any;
      const path:string=this.router.url.split('/')[this.router.url.split('/').length-1];
      let index=this.artickleServ.ukrArtickles.findIndex(a=>a.linkUkr==path);
     
      if(index==1){
      nextpage=this.artickleServ.ukrArtickles[this.artickleServ.ukrArtickles.length-1].linkUkr;
      }else{
        nextpage=this.artickleServ.ukrArtickles[index-1].linkUkr;
      }
      
         
       this.router.navigate(['/ru/freestudying', nextpage] )
    }



    private removeSelectedSchemas(): void {
  const typesToRemove = [
    'Article',
    'FAQPage',
    'HowTo',
    'DefinedTermSet',
    'Person',
  ];

  const scripts = this.document.querySelectorAll(
    'script[type="application/ld+json"]'
  );

  scripts.forEach((script) => {
    try {
      const json = JSON.parse(script.textContent || '{}');

      // Массив, объект-граф или одиночный объект
      const candidates = json['@graph'] ?? (Array.isArray(json) ? json : [json]);

      const shouldRemove = candidates.some((entry: any) =>
        entry['@type'] && typesToRemove.includes(entry['@type'])
      );

      if (shouldRemove) {
        script.remove();
      }

    } catch {
      /* ignore invalid */
    }
  });
}





private addJsonLdSchema(data: any): void {
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.renderer.appendChild(this.document.head, script);
  }

  // ============================================================
  //  ARTICLE
  // ============================================================
  private setArticleSchema(): void {
    const data = {
       "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Price Action в трейдинге: полное руководство по торговле без индикаторов",
            "description": "Подробное руководство по методу Price Action. Свечные паттерны (пин-бар, поглощение, внутренний бар), уровни поддержки и сопротивления, стратегии торговли на чистых графиках.",
            "author": {
                "@type": "Person",
                "name": "Игорь Арапов",
                "url": "https://arapov.trade/ru",
                "description": "Профессиональный трейдер с 2013 года. Специалист по Smart Money, методу Вайкоффа и объёмному анализу.",
                "sameAs": [
                    "https://www.youtube.com/@ArapovTrade"
                ]
            },
            "publisher": {
                "@type": "Organization",
                "name": "ArapovTrade",
                "url": "https://arapov.trade",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://arapov.trade/assets/img/favicon.ico"
                }
            },
            "datePublished": "2025-01-15",
            "dateModified": "2025-06-04",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://arapov.trade/ru/freestudying/candlestickpatterns"
            },
            "image": {
                "@type": "ImageObject",
                "url": "https://arapov.trade/assets/img/content/priceaction1.png",
                "width": 1200,
                "height": 630
            },
            "articleSection": "Технический анализ",
            "keywords": "Price Action, свечные паттерны, пин-бар, поглощение, трейдинг",
            "inLanguage": "ru"
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  PERSON
  // ============================================================
  private setPersonSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://arapov.trade/#person',
      name: 'Игорь Арапов',
      url: 'https://arapov.trade/ru/',
      image: 'https://arapov.trade/assets/redesignArapovTrade/img/imageAuthor-light.png',
      sameAs: [
        'https://www.youtube.com/@ArapovTrade',
        'https://t.me/ArapovTrade',
      ],
      jobTitle: 'Профессиональный трейдер',
      description:
        'Активно торгую на финансовых рынках с 2013 года. Автор бесплатного курса по трейдингу.',
    };

    this.addJsonLdSchema(data);
  }

   

  // ============================================================
  //  FAQ
  // ============================================================
  private setFaqSchema(): void {
    const data = {
       "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Что такое Price Action в трейдинге?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Price Action — это метод технического анализа, основанный на изучении движения цены без использования индикаторов. Трейдеры анализируют чистые ценовые графики, свечные паттерны, уровни поддержки и сопротивления для принятия торговых решений. Метод помогает понять психологию рынка и действия крупных игроков."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Какие основные паттерны Price Action существуют?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Основные паттерны Price Action включают: пин-бар (свеча с длинной тенью, сигнализирующая о развороте), поглощение (свеча полностью перекрывает предыдущую), внутренний бар (свеча внутри диапазона предыдущей), доджи (нерешительность рынка). Эти паттерны наиболее эффективны на ключевых уровнях поддержки и сопротивления."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Как определить уровни поддержки и сопротивления?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Уровни поддержки и сопротивления определяются по историческим точкам, где цена многократно разворачивалась или консолидировалась. Поддержка — зона, где покупатели останавливают падение цены. Сопротивление — зона, где продавцы препятствуют росту. Значимые уровни подтверждаются множественными касаниями и высокими объёмами торгов."
                    }
                },
                {
                    "@type": "Question",
                    "name": "В чём преимущества торговли по Price Action?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Преимущества Price Action: простота анализа без сложных индикаторов, универсальность для любых рынков и таймфреймов, понимание психологии участников рынка, отсутствие запаздывания сигналов (в отличие от индикаторов), возможность видеть действия крупных игроков через свечные формации."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Как избежать ложных сигналов Price Action?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Для фильтрации ложных сигналов: торгуйте паттерны только на значимых уровнях поддержки/сопротивления, дожидайтесь закрытия сигнальной свечи, анализируйте контекст (тренд, волатильность), используйте подтверждение объёмами, избегайте торговли во время важных новостей, комбинируйте несколько таймфреймов для анализа."
                    }
                }
            ]
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  HOWTO
  // ============================================================
  private setHowToSchema(): void {
    const data = {
       "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "Как торговать по методу Price Action",
            "description": "Пошаговое руководство по применению Price Action для прибыльной торговли на финансовых рынках.",
            "step": [
                {
                    "@type": "HowToStep",
                    "position": 1,
                    "name": "Определите ключевые уровни на графике",
                    "text": "Найдите значимые зоны поддержки и сопротивления, где цена многократно разворачивалась в прошлом. Отмечайте уровни на старшем таймфрейме (дневной или недельный) для определения глобальной структуры рынка."
                },
                {
                    "@type": "HowToStep",
                    "position": 2,
                    "name": "Определите направление тренда",
                    "text": "Проанализируйте структуру максимумов и минимумов. Восходящий тренд характеризуется более высокими максимумами и минимумами. Нисходящий — более низкими. Торгуйте в направлении основного тренда для повышения вероятности успеха."
                },
                {
                    "@type": "HowToStep",
                    "position": 3,
                    "name": "Дождитесь формирования паттерна",
                    "text": "Ищите свечные паттерны (пин-бар, поглощение, внутренний бар) на ключевых уровнях. Паттерн должен полностью сформироваться — дождитесь закрытия сигнальной свечи перед принятием решения о входе."
                },
                {
                    "@type": "HowToStep",
                    "position": 4,
                    "name": "Проанализируйте контекст сигнала",
                    "text": "Оцените рыночные условия: сила тренда, волатильность, новостной фон. Сигнал пин-бара в направлении тренда надёжнее контртрендового. Проверьте экономический календарь на наличие важных событий."
                },
                {
                    "@type": "HowToStep",
                    "position": 5,
                    "name": "Установите стоп-лосс и цель прибыли",
                    "text": "Разместите стоп-лосс за экстремум паттерна или за ключевой уровень. Определите цель прибыли на ближайшем уровне сопротивления или поддержки. Соотношение риска к прибыли должно быть минимум 1:2."
                }
            ]
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  GLOSSARY
  // ============================================================
  private setGlossarySchema(): void {
    const data = {
       "@context": "https://schema.org",
            "@type": "DefinedTermSet",
            "name": "Глоссарий терминов Price Action",
            "description": "Основные термины и определения метода Price Action в техническом анализе",
            "definedTerm": [
                {
                    "@type": "DefinedTerm",
                    "name": "Price Action",
                    "description": "Метод технического анализа, основанный на изучении движения цены без использования индикаторов, анализируя чистые ценовые графики."
                },
                {
                    "@type": "DefinedTerm",
                    "name": "Пин-бар (Pin Bar)",
                    "description": "Свечной паттерн с длинной тенью и маленьким телом, сигнализирующий о развороте цены и отвержении определённого ценового уровня рынком."
                },
                {
                    "@type": "DefinedTerm",
                    "name": "Поглощение (Engulfing)",
                    "description": "Паттерн из двух свечей, где вторая свеча полностью перекрывает тело первой, указывая на смену рыночных настроений."
                },
                {
                    "@type": "DefinedTerm",
                    "name": "Внутренний бар (Inside Bar)",
                    "description": "Свеча, диапазон которой полностью находится внутри диапазона предыдущей материнской свечи, сигнализирующая о консолидации перед пробоем."
                },
                {
                    "@type": "DefinedTerm",
                    "name": "Уровень поддержки",
                    "description": "Ценовая зона, где спрос превышает предложение и покупатели останавливают падение цены, вызывая отскок вверх."
                },
                {
                    "@type": "DefinedTerm",
                    "name": "Уровень сопротивления",
                    "description": "Ценовая зона, где предложение превышает спрос и продавцы останавливают рост цены, вызывая отскок вниз."
                },
                {
                    "@type": "DefinedTerm",
                    "name": "Доджи (Doji)",
                    "description": "Свеча с очень маленьким телом, где цены открытия и закрытия почти совпадают, указывающая на нерешительность рынка."
                },
                {
                    "@type": "DefinedTerm",
                    "name": "Фейковый пробой (False Breakout)",
                    "description": "Ситуация, когда цена пробивает уровень, но быстро возвращается обратно, заманивая трейдеров в ловушку."
                },
                {
                    "@type": "DefinedTerm",
                    "name": "Свинг-хай и Свинг-лоу",
                    "description": "Локальные максимумы и минимумы на графике, используемые для определения структуры тренда и ключевых разворотных точек."
                },
                {
                    "@type": "DefinedTerm",
                    "name": "Чистый график",
                    "description": "Ценовой график без технических индикаторов, отображающий только свечи или бары и используемый в методе Price Action."
                }
            ]
    };

    this.addJsonLdSchema(data);
  }


}
