import { Component, OnInit } from '@angular/core';
declare var grecaptcha: any;

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    public vm: any = {};
    public captchaError: boolean = false;
    public siteKey: string = '';
    public canSubmit: boolean = false;
    public retURL: string = '';

    constructor() { }

    ngOnInit() {
        var rurl = window.location.href;

        // if (rurl.indexOf("uat.reddotpower.com.sg") != -1 || rurl.indexOf("rdp-uat.herokuapp.com") != -1) {
        //     this.siteKey = "6LftAHIUAAAAAOGAJANTcBv7QiKTRNJG8vEnJfU1";
        // } else if (rurl.indexOf("reddotpower.com.sg") != -1 || rurl.indexOf("reddotpower.herokuapp.com") != -1) {
        //     this.siteKey = "6LfV_HEUAAAAAF-riAePSZAe7zc1MYGNEH_oLgs_";
        // }
        // else if (rurl.indexOf("rdp-dev.herokuapp.com") != -1) {
        //     this.siteKey = "6LeT2nEUAAAAAL8Dzz5LdwFqUwq6W4CGo_m_VcH6";
        // } else {
        //     this.siteKey = "6Lf6xnEUAAAAAD_JEOlb3zfayVHTlxAkCiVKCMNp";
        // }

        this.siteKey = "6LdDXX8UAAAAAAms5crMGgDVA7OVWZNlp1Fs4bVV";

        this.vm = {
            "action": "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8",
            "oid": "00D90000000vowU",
            "retURL": "http://www.cws-web.herokuapp.com/thank-you",
            "f1": "dsadas"
        };

        setTimeout(function () {
            const response = (<HTMLInputElement[]><any>document.getElementsByName("g-recaptcha-response"))[0];
            if (response == null || response.value.trim() == "") {
                let x = (<HTMLInputElement[]><any>document.getElementsByName("captcha_settings"))[0];
                var elems = JSON.parse(x.value);
                elems["ts"] = JSON.stringify(new Date().getTime());
                x.value = JSON.stringify(elems);
            }
        }, 500);
    }

    public resolved(e) {
        const response = grecaptcha.getResponse();
        if (response.length === 0) {
            this.captchaError = true;
            return;
        }
        this.canSubmit = true;
    }

}
