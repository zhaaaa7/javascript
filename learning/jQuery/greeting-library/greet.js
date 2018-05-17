(function(global,$){
    var Greeter=function(firstName, lastName, language){
        return new Greeter.init(firstName, lastName, language);
    }

    var supportedLangs=['en','es'];
    var greetings={
        en:'Hello',
        es: 'Hola'
    };

    var formalGreetings={
        en:'Greetings',
        es: 'Saludos'
    }

    var logMessage={
        en: 'Logged in',
        es: 'Inicio sesion'
    }

    Greeter.prototype={
        fullName: function(){
            return this.firstName +' '+this.lastName;
        },

        validate: function(){
            if(supportedLangs.indexOf(this.language) === -1){
                throw "Invalid language";
            }
        },

        greeting: function(){
            return greetings[this.language] + ' '+ this.firstName;
        },

        formalgreeting: function(){
            return formalGreetings[this.language] + ' '+ this.firstName;
        },

        greet: function (formal){
            var msg;
            if(formal) {
                msg=this.formalgreeting();
            }else{
                msg=this.greeting();
            }

            if(console){
                console.log(msg);
            }

            return this;
        },

        log: function(){
            if(console){
                console.log(logMessage[this.language]+ ': '+this.firstName);
            }

            return this;
        },

        setLang: function(language){
            this.language=language;
            this.validate();
            return this;
        },

        HTMLGreeting: function(selector, formal){
            if(!$){
                throw "jQuery not loaded";
            }

            if(!selector){
                throw "Missing selector;"
            }

            var msg;
            if(formal){
                msg=this.formalgreeting();
            }else {
                mag=this.greeting();
            }

            $(selector).html(msg);

            return this;
        }
    };

    Greeter.init=function(firstName, lastName, language){
        var self=this;
        self.firstName=firstName || '';
        self.lastName=lastName || '';
        self.language=language || 'en';
    };

    Greeter.init.prototype=Greeter.prototype;

    global.Greeter=global.G$=Greeter;

})(window,jQuery);