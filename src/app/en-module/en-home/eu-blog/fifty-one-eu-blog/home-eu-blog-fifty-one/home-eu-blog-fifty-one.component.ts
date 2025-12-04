import { Component, OnInit,ChangeDetectorRef,Inject,Renderer2, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeservService } from '../../../../../servises/themeserv.service';
import { artickle } from '../../../../../servises/articles.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-eu-blog-fifty-one',
  templateUrl: './home-eu-blog-fifty-one.component.html',
  styleUrl: './home-eu-blog-fifty-one.component.scss',
})
export class HomeEuBlogFiftyOneComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr:ChangeDetectorRef,
  private router: Router,
    private themeService:ThemeservService,
    private artickleServ: ArticlesService, private renderer: Renderer2,
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
 this.ukrGroups = this.artickleServ.getEnglishGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
    this.titleService.setTitle('Price Action: A Complete Guide');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Learn everything about the Price Action method: its core principles, popular patterns, strategies, and practical examples. A complete guide for beginner and experienced traders.',
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
    { title: 'Quick start', link: 'https://arapov.education/en/course-en/' },
    {
      title: 'Introduction to Trading',
      link: 'https://arapov.education/en/reg-workshop-en/',
    },
    { title: 'Professional courses', link: 'https://arapov.trade/en/studying' },
    {
      title: 'Basic course',
      link: 'https://arapov.trade/en/freestudying/freeeducation',
    },
    { title: 'Copy-trading', link: 'https://arapovcopytrade.com/en/home-en/' },
  ];
    onGroupChange(event: Event) {
       const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
      this.router.navigate(['/en/freestudying'], {
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
      article.groupsEng.forEach(group => {
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
       this.router.navigate(['/en/freestudying', nextpage] )
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
       this.router.navigate(['/en/freestudying', nextpage] )
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
        "headline": "Price Action Trading: Complete Guide to Indicator-Free Trading",
        "description": "Comprehensive guide to Price Action method. Candlestick patterns (pin bar, engulfing, inside bar), support and resistance levels, clean chart trading strategies.",
        "author": {
            "@type": "Person",
            "name": "Igor Arapov",
            "url": "https://arapov.trade/en",
            "description": "Professional trader since 2013. Smart Money specialist, Wyckoff method and volume analysis expert.",
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
            "@id": "https://arapov.trade/en/freestudying/candlestickpatterns"
        },
        "image": {
            "@type": "ImageObject",
            "url": "https://arapov.trade/assets/img/content/priceaction1.png",
            "width": 1200,
            "height": 630
        },
        "articleSection": "Technical Analysis",
        "keywords": "Price Action, candlestick patterns, pin bar, engulfing, trading",
        "inLanguage": "en"
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  PERSON
  // ============================================================
 // ============================================================
  private setPersonSchema(): void {
    const data = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://arapov.trade/#person',
  name: 'Igor Arapov',
  url: 'https://arapov.trade/en',
  image: 'https://arapov.trade/assets/redesignArapovTrade/img/imageAuthor-light.png',
  sameAs: [
    'https://www.youtube.com/@ArapovTrade',
    'https://t.me/ArapovTrade',
  ],
  jobTitle: 'Professional trader',
  description:
    'I have been actively trading on financial markets since 2013. Author of a free trading course.',
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
                "name": "What is Price Action in trading?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Price Action is a technical analysis method based on studying price movement without using indicators. Traders analyze clean price charts, candlestick patterns, support and resistance levels to make trading decisions. The method helps understand market psychology and actions of major players."
                }
            },
            {
                "@type": "Question",
                "name": "What are the main Price Action patterns?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Main Price Action patterns include: pin bar (candle with long wick signaling reversal), engulfing (candle completely covers the previous one), inside bar (candle within previous candle's range), doji (market indecision). These patterns are most effective at key support and resistance levels."
                }
            },
            {
                "@type": "Question",
                "name": "How to identify support and resistance levels?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Support and resistance levels are identified by historical points where price repeatedly reversed or consolidated. Support is a zone where buyers stop price decline. Resistance is a zone where sellers prevent price growth. Significant levels are confirmed by multiple touches and high trading volumes."
                }
            },
            {
                "@type": "Question",
                "name": "What are the advantages of Price Action trading?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Price Action advantages: simplicity of analysis without complex indicators, universality for any markets and timeframes, understanding market participant psychology, no signal lag (unlike indicators), ability to see major players' actions through candlestick formations."
                }
            },
            {
                "@type": "Question",
                "name": "How to avoid false Price Action signals?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "To filter false signals: trade patterns only at significant support/resistance levels, wait for signal candle closure, analyze context (trend, volatility), use volume confirmation, avoid trading during major news events, combine multiple timeframes for analysis."
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
        "name": "How to Trade Using Price Action Method",
        "description": "Step-by-step guide to applying Price Action for profitable trading in financial markets.",
        "step": [
            {
                "@type": "HowToStep",
                "position": 1,
                "name": "Identify key levels on the chart",
                "text": "Find significant support and resistance zones where price repeatedly reversed in the past. Mark levels on higher timeframes (daily or weekly) to determine the global market structure."
            },
            {
                "@type": "HowToStep",
                "position": 2,
                "name": "Determine trend direction",
                "text": "Analyze the structure of highs and lows. An uptrend is characterized by higher highs and higher lows. A downtrend shows lower highs and lows. Trade in the direction of the main trend to increase success probability."
            },
            {
                "@type": "HowToStep",
                "position": 3,
                "name": "Wait for pattern formation",
                "text": "Look for candlestick patterns (pin bar, engulfing, inside bar) at key levels. The pattern must fully form — wait for the signal candle to close before deciding on entry."
            },
            {
                "@type": "HowToStep",
                "position": 4,
                "name": "Analyze signal context",
                "text": "Evaluate market conditions: trend strength, volatility, news background. A pin bar signal in the trend direction is more reliable than counter-trend. Check the economic calendar for important events."
            },
            {
                "@type": "HowToStep",
                "position": 5,
                "name": "Set stop-loss and profit target",
                "text": "Place stop-loss beyond the pattern extreme or key level. Determine profit target at the nearest resistance or support level. Risk-to-reward ratio should be at least 1:2."
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
        name: "Price Action Glossary",
        description: "Key terms and definitions of Price Action method in technical analysis",
       hasDefinedTerm: [
            {
                "@type": "DefinedTerm",
                name: "Price Action",
                description: "Technical analysis method based on studying price movement without indicators, analyzing clean price charts."
            },
            {
                "@type": "DefinedTerm",
                name: "Pin Bar",
                description: "Candlestick pattern with a long wick and small body, signaling price reversal and market rejection of a certain price level."
            },
            {
                "@type": "DefinedTerm",
                name: "Engulfing Pattern",
                description: "Two-candle pattern where the second candle completely covers the first candle's body, indicating a shift in market sentiment."
            },
            {
                "@type": "DefinedTerm",
                name: "Inside Bar",
                description: "A candle whose range is completely within the previous mother candle's range, signaling consolidation before a breakout."
            },
            {
                "@type": "DefinedTerm",
                name: "Support Level",
                description: "Price zone where demand exceeds supply and buyers stop price decline, causing an upward bounce."
            },
            {
                "@type": "DefinedTerm",
                name: "Resistance Level",
                description: "Price zone where supply exceeds demand and sellers stop price growth, causing a downward bounce."
            },
            {
                "@type": "DefinedTerm",
                name: "Doji",
                description: "A candle with very small body where opening and closing prices nearly coincide, indicating market indecision."
            },
            {
                "@type": "DefinedTerm",
                name: "False Breakout",
                description: "Situation when price breaks through a level but quickly returns, trapping traders."
            },
            {
                "@type": "DefinedTerm",
                name: "Swing High and Swing Low",
                description: "Local highs and lows on the chart used to determine trend structure and key reversal points."
            },
            {
                "@type": "DefinedTerm",
                name: "Clean Chart",
                description: "Price chart without technical indicators, displaying only candles or bars, used in Price Action method."
            }
        ]
    };

    this.addJsonLdSchema(data);
  }
}
