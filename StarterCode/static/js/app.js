function init() {
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function (data) {
    console.log(data);
      // Create array to hold all names (all ID names)
      var names = data.samples.map(x=>x.id)
      // Append an option in the dropdown
      names.forEach(function(name) {
          d3.select('#selDataset')
              .append('option')
              .text(name)
          });
       
  var sample_values = data.samples.map(x=> x.sample_values);
  var otu_ids = data.samples.map(x=> x.otu_ids);
  var otu_label = data.samples.map(x=> x.otu_labels);
  
  var sorted_test = sample_values.sort(function(a, b){return b-a});
  var top_ten = sorted_test.map(x => x.slice(0,10));
  var sorted_ids = otu_ids.sort(function(a, b){return b-a});
  var top_ids = sorted_ids.map(x =>x.slice(0,10));
  var sorted_labels = otu_label.sort(function(a, b){return b-a});
  var top_labels = sorted_labels.map(x =>x.slice(0,10));

  var firstID = data.metadata[0]
  var sampleMetadata1 = d3.select("#sample-metadata").selectAll('h1')
  
  var sampleMetadata = sampleMetadata1.data(d3.entries(firstID))
  sampleMetadata.enter()
                .append('h1')
                .merge(sampleMetadata)
                .text(d => `${d.key} : ${d.value}`)
                .style('font-size','50%')

  sampleMetadata.exit().remove()

  var trace1 = {
      x : top_ten[0],
      y : top_ids[0].map(x => "OTU" + x),
      text : top_labels[0],
      type : 'bar',
      orientation : 'h',
      transforms: [{
          type: 'sort',
          target: 'y',
          order: 'descending',
        }],
      marker: {
        color: 'rgb(27, 161, 187)',
        opacity: 0.6,
        line: {
          color: 'rgb(8,48,107)',
          width: 1.5
        }
      }
  };
  
  var layout1 = {
      title : '<b>Top 10 OTU</b>',
  };

  var data = [trace1];
  var config = {responsive:true}
  Plotly.newPlot('bar', data, layout1,config);

  var trace2 = {
      x : otu_ids[0],
      y : sample_values[0],
      text : otu_label[0],
      mode : 'markers',
      marker : {
          color : otu_ids[0],
          size : sample_values[0]
      }
  };

  var layout2 = {
      title: '<b>Bubble Chart</b>',
      automargin: true,
      autosize: true,
      showlegend: false,
          margin: {
              l: 150,
              r: 50,
              b: 50,
              t: 50,
              pad: 4      
  }};

  var data2 = [trace2];
  var config = {responsive:true}
  Plotly.newPlot('bubble',data2,layout2,config);
  });
};

  function optionChanged(id) {
    updatePlotly(id);
  };
  
  init();