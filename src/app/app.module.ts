import { BrowserModule } from '@angular/platform-browser';
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
        ContactComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
