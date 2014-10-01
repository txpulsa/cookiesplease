var cookiesplease = cookiesplease || {

    cookieName: 'cookiesplease_status',
    statusAccepted: 'accepted',
    statusDeclined: 'declined',
    options: {
        buttonAccept: true,
        buttonDecline: false,
        clearCookiesOnDecline: false,
        storeChoiceOnDecline: true,
        buttonAcceptText: 'Continue',
        buttonDeclineText: 'Decline',
        message: 'This website uses cookies so that we can provide you the best user experience possible.<br>By continuing to browse the site you are agreeing to our use of cookies.',
    },

    init: function(options) {
        if(typeof options != 'undefined') {
            for(var option in options) {
                if(this.options.hasOwnProperty(option)) {
                    this.options[option] = options[option];
                }
            }
        }

        if(!(this.wasAccepted() || this.wasDeclined())) {

            var css = document.createElement('style');
            css.rel = 'stylesheet';
            css.innerHTML = '.cookiesplease { position: fixed; left: 0; right: 0; bottom: 0; color: white; background-color: #222; z-index: 9999; text-align: center; line-height: 20px; transition: bottom .2s; }';
            css.innerHTML += '.cookiesplease p { display: inline-block; vertical-align: middle; text-align: right; margin: 10px; }';
            css.innerHTML += '.cookiesplease a { text-decoration: underline; }';
            css.innerHTML += '.cookiesplease button { display: inline-block; vertical-align: middle; padding: 0 15px; margin: 10px 5px; line-height: 40px; transition: background-color .2s; }';
            css.innerHTML += '.cookiesplease-accept { background-color: #9fb35a }';
            css.innerHTML += '.cookiesplease-decline { background-color: #f17166 }';
            css.innerHTML += '.cookiesplease-accept:hover, .cookiesplease-accept:focus { background-color: #8ca047 }';
            css.innerHTML += '.cookiesplease-decline:hover, .cookiesplease-decline:focus { background-color: #e06156 }';
            document.getElementsByTagName('head')[0].appendChild(css);

            var notice = document.createElement('div');
            notice.id = 'cookiesplease';
            notice.className = 'cookiesplease';
            notice.innerHTML = '<p>' + this.options.message + '</p>';
            if(this.options.buttonAccept) {
                notice.innerHTML += '<button class="cookiesplease-accept" onclick="cookiesplease.accept();">' + this.options.buttonAcceptText + '</button>';
            }
            if(this.options.buttonDecline) {
                notice.innerHTML += '<button class="cookiesplease-decline" onclick="cookiesplease.decline();">' + this.options.buttonDeclineText + '</button>';
            }
            document.body.appendChild(notice);
        }
    },

    accept: function() {
        this.set(this.cookieName, this.statusAccepted, 365);
        document.getElementById('cookiesplease').style.bottom = -1 * document.getElementById('cookiesplease').offsetHeight + 'px';
    },

    decline: function() {
        if(this.options.clearCookiesOnDecline) {
            this.clear();
        }
        if(this.options.storeChoiceOnDecline) {
            this.set(this.cookieName, this.statusDeclined, 365);
        }
        document.getElementById('cookiesplease').style.bottom = -1 * document.getElementById('cookiesplease').offsetHeight + 'px';
    },

    wasAccepted: function() {
        return this.get(this.cookieName) == this.statusAccepted;
    },

    wasDeclined: function() {
        return this.get(this.cookieName) == this.statusDeclined;
    },

    clear: function() {
        var cookies = document.cookie.split(';');
        for(var i = 0, n = cookies.length; i < n; i++) {
            var cookie = cookies[i],
                eqPos = cookie.indexOf('='),
                name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            this.set(name, '', -1);
        }
    },

    set: function(name, value, days) {
        if(days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = '; expires=' + date.toGMTString();
        } else {
            var expires = '';
        }
        document.cookie = name + '=' + value + expires + '; path=/';
    },

    get: function(name) {
        name += "=";
        var cookies = document.cookie.split(';');
        for(var i = 0, n = cookies.length; i < n; i++) {
            var cookie = cookies[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(name) == 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return null;
    }

};

window.cookiesplease = cookiesplease;