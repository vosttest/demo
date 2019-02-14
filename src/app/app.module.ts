import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TopMenuComponent } from './views/shared/top-menu/top-menu.component';
import { BottomMenuComponent } from './views/shared/bottom-menu/bottom-menu.component';
import { OurStoryComponent } from './views/our-story/our-story.component';
import { OurEdgeComponent } from './views/our-edge/our-edge.component';
import { OurApproachComponent } from './views/our-approach/our-approach.component';
import { AppRoutingModule } from './app-routing.module';
import { OurExpertiseComponent } from './views/our-expertise/our-expertise.component';
import { FitComponent } from './views/shared/fit/fit.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { SlidesShowComponent } from './views/slides-show/slides-show.component';
import { ContactComponent } from './views/contact/contact.component';
import { OurCommunityComponent } from './views/our-community/our-community.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { ThankYouComponent } from './views/thank-you/thank-you.component';
import { NewsComponent } from './views/news/news.component';
import { NewsListComponent } from './views/news/news-list/news-list.component';
import { NewsContentComponent } from './views/news/news-content/news-content.component';
import { CwsTopTenComponent } from './views/news/news-pages/cws-top-ten/cws-top-ten.component';

@NgModule({
    declarations: [
        AppComponent,
        TopMenuComponent,
        BottomMenuComponent,
        OurStoryComponent,
        OurEdgeComponent,
        OurApproachComponent,
        OurExpertiseComponent,
        FitComponent,
        DashboardComponent,
        SlidesShowComponent,
        ContactComponent,
        OurCommunityComponent,
        ThankYouComponent,
        NewsComponent,
        NewsListComponent,
        NewsContentComponent,
        CwsTopTenComponent
    ],
    imports: [
        CommonModule,
        NgtUniversalModule,

        TransferHttpCacheModule,
        HttpClientModule,

        AppRoutingModule,
        RecaptchaModule
    ],
    providers: [],
})

export class AppModule { }