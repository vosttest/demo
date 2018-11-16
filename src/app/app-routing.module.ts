import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OurEdgeComponent } from './views/our-edge/our-edge.component';
import { OurStoryComponent } from './views/our-story/our-story.component';
import { OurApproachComponent } from './views/our-approach/our-approach.component';
import { OurExpertiseComponent } from './views/our-expertise/our-expertise.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full'},
  { path: 'our-edge', component: OurEdgeComponent},
  { path: 'our-story', component: OurStoryComponent},
  { path: 'our-approach', component: OurApproachComponent},
  { path: 'our-expertise', component: OurExpertiseComponent},
  { path: 'index', component: DashboardComponent}
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
