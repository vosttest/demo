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

    constructor() { }

    ngOnInit() {
        var rurl = window.location.href;

        if (rurl.indexOf("test.crimsonworks.com") != -1) {
            this.siteKey = "6LeAZh8TAAAAANvdJt1idUx0bSgRmOY2MGMXzZoG";
        }
        else if (rurl.indexOf("cws-web.herokuapp.com") != -1) {
            this.siteKey = "6LdDXX8UAAAAAAms5crMGgDVA7OVWZNlp1Fs4bVV";
        }
        else {
            this.siteKey = "6LdDXX8UAAAAAAms5crMGgDVA7OVWZNlp1Fs4bVV";
        }

        this.vm = {
            "action": "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8",
            "oid": "00D90000000vowU",
            "retURL": rurl + "/thank-you"
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
            this.canSubmit = false;
            return;
        }
        this.captchaError = false;
        this.canSubmit = true;
    }

}
