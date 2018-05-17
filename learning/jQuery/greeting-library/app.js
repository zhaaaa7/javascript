var q = $("ul.people li");
console.log(q);


// add jQuery extention
(function($){
  $.fn.extend({
      logjq: function(){
          console.log('log',this);
      }
  });
})(jQuery);

q.logjq();


// use own library
var g= G$('Jone','Doe');
console.log(g);
g.greet().setLang('es').greet(true);


$("#login").click(function(){
    var loginGreet=G$('Jone','Doe');
    $("#loginDiv").hide();

    loginGreet.setLang($("#lang").val()).HTMLGreeting("#greeting",true).log();
});