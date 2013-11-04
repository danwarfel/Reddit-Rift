define([
		'jquery', 
		'backbone',
		'underscore', 
		'models/model',
		'text!templates/main.html'], 
function($, Backbone, _, model, template){
	var View = Backbone.View.extend({
		el: '#main',
		initialize: function(){

		  console.log('initialize');

        },

        events : {
            'click .clickBtn button' : 'searchReddit'
        },

        searchReddit : function () {

            var searchURL = 'http://www.reddit.com/r/subreddits/search.json?jsonp=?';
            var searchQueryText = $('#search').val();

            this.$el.find('.resultItem').remove();

            $.getJSON(searchURL, {
                q: searchQueryText,
                limit: 25
            }).done(function (data) {
                $.each(data.data.children, function (i, item) {
                    $('<a/>').attr('href', item.data.url).text(item.data.title).appendTo('#results').wrap('<div class="resultItem"></div>').fadeIn();
                });
            }).fail(function (data) {
                alert('Something went wrong');
            });

            console.log(searchQueryText);
        },

		render: function(){
			$(this.el).append( this.template );
		}
	});
	
	return new View();
});