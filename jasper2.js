(function() {

  var LocationModel = Backbone.Model.extend({
    defaults: function() {
      return {
        manager: "",
        city: "",
        address: "",
        phone: "",
        state: "",
      };
    }
  });


  var LocationView = Backbone.View.extend({
    tagName: 'div',
    template: _.template($('[data-template-name="item-detail-template"]').html()),
    render: function() {
      this.$el.html(template(this.model.toJSON()));
    }
  });


  var LocationsCollection = Backbone.Collection.extend({
    model: LocationModel,
    url: 'https://api.parse.com/1/classes/locations',
  });



  var LocationsView = Backbone.View.extend({
    el: $('.results'),
    tagName: "div",

    initialize: function() {
      this.listenTo(Locations, 'reset', this.loadLocations);
      Locations.fetch();
    },

    loadLocation: function(location) {
      var view = new LocationView({model: location});
      this.$el.append(view.render().el);
    }
  });


  // Config //
  $.ajaxSetup({
    headers: {
      "X-Parse-Application-Id": "U8R8zyZWWF5LWuYcSTBj63vsfSTsW8UsjolIRotD",
      "X-Parse-REST-API-Key": "FbmtlDOLizSrRVKiVPBx2b0wWTqFqiGyap3SngLk"
    }
  });


  //Glue Code //
  $(document).ready(function() {
    window.Collection = new LocationsCollection();
    Backbone.history.start();
  });

}());
