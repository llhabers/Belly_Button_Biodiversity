var drawChart = function(xdata, ydata, HoverText, metadata) {


  var metadata_panel = d3.select("#sample-metadata");
  metadata_panel.html("");
  Object.entries(metadata).forEach(([key, value]) => {
      metadata_panel.append("p").text(`${key}: ${value}`);
  });

  var trace = {
      x: xdata,
      y: ydata,
      text: HoverText,
      type: 'bar',
      orientation: 'h'
  };

  var data1 = [trace];

  Plotly.newPlot('bar', data1);

  var trace2 = {
      x: xdata,
      y: ydata,
      text: HoverText,
      mode: 'markers',
      marker: {
          size: ydata,
          color: xdata
      }
  };

  var data2 = [trace2];

  Plotly.newPlot('bubble', data2);


};

var populateDropdown = function(names) {

  var selectTags = d3.select("#selDataset");
  var option = selectTags.selectAll('option').data(names);

  option.enter()
      .append('option')
      .attr('value', function(d) {
          return d;
      })
      .text(function(d) {
          return d;
      });

};

var optionChanged = function(newValues) {

  d3.json("static/samples.json").then(function(data) {

  sample_new = data["samples"].filter(function(sample) {

      return sample.id == newValues;

  });
  
  metadata_new = data["metadata"].filter(function(metadata) {

      return metadata.id == newValue;

  });
  
  
  xdata = sample_new[0]["otu_ids"];
  ydata = sample_new[0]["sample_values"];
  HoverText = sample_new[0]["otu_labels"];
  
  console.log(xdata);
  console.log(ydata);
  console.log(HoverText);
  
  drawChart(xdata, ydata, HoverText, metadata_new[0]);
  });
};

d3.json("static/samples.json").then(function(data) {

  //Populate dropdown with names
  populateDropdown(data["names"]);

  //Populate the page with the first value
  xdata = data["samples"][0]["otu_ids"];
  ydata = data["samples"][0]["sample_values"];
  HoverText = data["samples"][0]["otu_labels"];
  metadata = data["metadata"][0];

  //Draw the chart on load
  drawChart(xdata, ydata, HoverText, metadata);


});