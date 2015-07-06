(function(){

/// Location Model ///

var LocationModel = Backbone.Model.extend({
  idAttribute: 'objectId'
});

/// Locations Collection ///

var LocationsCollection = Backbone.Collection.extend({
  model: LocationModel,
  url: 'https://api.parse.com/1/classes/locations',
  parse: function(response){
    return response.results;
  }
});

// Results View //

var ResultsView = Backbone.View.extend({
template: _.template($('[data-template-name=results-template]').text()),
el: '.land',
events: {
  'click .land': 'renderLocations',
  'click': 'renderSC'
},
  renderSC: function(e) {
    e.preventDefault();
    $('.results').html(this.template);
  },

  renderLocations: function(e) {
    e.preventDefault();
    $('.results').html(this.template);
    var self = this;
    _.each(this.location, function(item){
      var itemListView = new LocationListView({model: item});
      itemListView.render();
    });
  }
});

// Location View //

var LocationView = Backbone.View.extend({
  template: _.template($('[data-template-name=results-template]').text()),
  el: '.results',
  render: function(){
      this.$el.append(this.model);
    },
});

// App Router //

var AppRouter = Backbone.Router.extend({
  routes: {
    "": "index"
  },

  initialize: function(){
    this.locations = new LocationsCollection();
    this.resultsView = new ResultsView({collection: this.locations});
  },

  index: function(){
    var self = this;
    this.locations.fetch();
    console.log(this.locations);
  }
});

// Config //

$.ajaxSetup({
  headers: {
  "X-Parse-Application-Id": "U8R8zyZWWF5LWuYcSTBj63vsfSTsW8UsjolIRotD",
  "X-Parse-REST-API-Key": "FbmtlDOLizSrRVKiVPBx2b0wWTqFqiGyap3SngLk"
  }
});


// Glue Code //
$(document).ready(function(){
  window.router = new AppRouter();
  Backbone.history.start();
});

}());
