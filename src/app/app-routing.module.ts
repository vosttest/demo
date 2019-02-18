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
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'our-edge', component: OurEdgeComponent, data: { title: 'Our Edge', meta: 'crimsonworks our edge' } },
  { path: 'our-story', component: OurStoryComponent, data: { title: 'Our Story', meta: 'crimsonworks our story' } },
  { path: 'our-approach', component: OurApproachComponent, data: { title: 'Our Approach', meta: 'crimsonworks our approach' } },
  { path: 'our-expertise', component: OurExpertiseComponent, data: { title: 'Our Expertise', meta: 'crimsonworks our expertise' } },
  { path: 'index', component: DashboardComponent, data: { title: 'Home', meta: 'crimsonworks home' } },
  { path: 'contact', component: ContactComponent, data: { title: 'Contact', meta: 'crimsonworks contact' } },
  { path: 'our-community', component: OurCommunityComponent, data: { title: 'Our Community', meta: 'crimsonworks our community' } },
  { path: 'thank-you', component: ThankYouComponent, data: { title: 'Thank you', meta: 'crimsonworks thank you' } },
  {
    path: 'news', component: NewsComponent, data: { title: 'News', meta: 'crimsonworks news' },
    children: [
      { path: '', redirectTo: 'crimson-works-top-10-saleforce', pathMatch: 'full' },
      { path: 'crimson-works-top-10-saleforce', component: CwsTopTenComponent, data: { title: 'Re-imagine Digitalization for Long-term Business Success', meta: 'crimsonworks news' } }
    ]
  }

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
