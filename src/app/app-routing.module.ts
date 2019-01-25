import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OurEdgeComponent } from './views/our-edge/our-edge.component';
import { OurStoryComponent } from './views/our-story/our-story.component';
import { OurApproachComponent } from './views/our-approach/our-approach.component';
import { OurExpertiseComponent } from './views/our-expertise/our-expertise.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { SlidesShowComponent } from './views/slides-show/slides-show.component';
import { ContactComponent } from './views/contact/contact.component';
import { OurCommunityComponent } from './views/our-community/our-community.component';
import { ThankYouComponent } from './views/thank-you/thank-you.component';
import { NewsComponent } from './views/news/news.component';
import { CwsTopTenComponent } from './views/news/news-pages/cws-top-ten/cws-top-ten.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full'},
  { path: 'our-edge', component: OurEdgeComponent},
  { path: 'our-story', component: OurStoryComponent},
  { path: 'our-approach', component: OurApproachComponent},
  { path: 'our-expertise', component: OurExpertiseComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'slides-show', component: SlidesShowComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'index', component: DashboardComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'our-community', component: OurCommunityComponent},
  { path: 'thank-you', component: ThankYouComponent},
  { path: 'news', component: NewsComponent,
    children: [
      { path: '', redirectTo: 'crimson-works-top-10-saleforce', pathMatch: 'full' },
      { path: 'crimson-works-top-10-saleforce', component: CwsTopTenComponent }
    ]
  }

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {

 }
