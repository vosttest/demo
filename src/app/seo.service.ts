import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class SeoService {

    constructor(
        private title: Title,
        private meta: Meta
    ) { }

    generateTags(config) {
        config = {
            title: 'CRIMSONWORKS',
            description: 'ok crimsonworks',
            ...config
        }

        this.title.setTitle(config.title + ' | CrimsonWorks');
        this.meta.updateTag({ name: 'description', content: config.description });
    }

}