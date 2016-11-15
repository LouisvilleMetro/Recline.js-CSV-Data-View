jQuery(function($) {
  //window.dataExplorer = null;
  window.explorerDiv = $('.csv-view');

  var dataset = new recline.Model.Dataset({
    url: 'data/nigp.csv',
    backend: 'csv',
    delimiter: ','
    // quotechar: '"',
    // encoding: 'utf8'
  });
  // remember this is async so if you want to do something you need to call it in done method e.g.
  // dataset.fetch.done(function(dataset) { console.log(dataset.recordCount)});
  dataset.fetch();

  createExplorer(dataset);
});

// make Explorer creation / initialization in a function so we can call it
// again and again
var createExplorer = function(dataset, state) {
  // remove existing data explorer view
  var reload = false;
  if (window.dataExplorer) {
    window.dataExplorer.remove();
    reload = true;
  }
  window.dataExplorer = null;
  var $el = $('<div />');
  $el.appendTo(window.explorerDiv);

  var views = [
    {
      id: 'grid',
      label: 'Grid',
      view: new recline.View.SlickGrid({
        model: dataset,
        state: {
          gridOptions: {
            editable: false,
            width: 50,
            enabledAddRow: false,
            enableCellNavigation: true
          }
        }
      })
    // Other views live here. Grid(simple), Grid (Slickgrid), Map, Choropleth Map, Graph, Timeline, Multiview
    // This is instantiated as a Multiview, but only using Grid. This is in case we want to extend in the future.
    // },
    // {
    //   id: 'graph',
    //   label: 'Graph',
    //   view: new recline.View.Graph({
    //     model: dataset
    //
    //   })
    // },
    // {
    //   id: 'map',
    //   label: 'Map',
    //   view: new recline.View.Map({
    //     model: dataset
    //   })
      }
    ];

  window.dataExplorer = new recline.View.MultiView({
    model: dataset,
    el: $el,
    state: state,
    views: views
  });
}
