$(document).ready(function(){
  if ($('div.home').length) {

    const type = (d, _, columns) => {
      d.date = d3.timeParse("%Y%m%d")(d.date);
      for (let i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
      return d;
    }

    const protoChart = {
      width: 480,
      height: 320,
      margin: { top: 10, bottom: 10, left: 10, right: 10 },
    };

    const chartFactory = (opts, proto = protoChart) => {
      const chart = Object.assign({}, proto, opts);

      chart.svg = d3.select('svg')
        .attr('width', chart.width)
        .attr('height', chart.height);
        // .attr('width', chart.width - chart.margin.right)
        // .attr('height', chart.height - chart.margin.bottom);

      chart.container = chart.svg.append('g')
        .attr('id', 'container')
        .attr('transform', `translate(${chart.margin.left}, ${chart.margin.top})`);

      return chart;
    }

    const chart = chartFactory({
      width: parseInt($('div.home').width() * 0.9),
      height: parseInt(Math.min($('main').height() * 0.4, $('div.home').width() * 0.6)),
    })

    chart.loadData = (uri) => {
      d3.tsv(uri, type, (error, data) => {
        chart.data = data; // Object.assign({}, data)
        chart.cities = data.columns.slice(1).map((id) => {
          return {
            id: id,
            values: data.map((d) => {
              return {date: d.date, temperature: d[id]}
            })
          }
        });
        chart.render(chart.data)
      });
    }

    chart.loadData('/data/data.tsv')

    chart.render = (data) => {
      const parseTime = d3.timeParse("%Y%m%d");
      const x = d3.scaleTime().range([0, chart.width - chart.margin.left - chart.margin.right]);
      const y = d3.scaleLinear().range([chart.height - chart.margin.top - chart.margin.bottom, 0]);
      const z = d3.scaleOrdinal(d3.schemeCategory10);

      const line = d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.temperature); });

      x.domain(d3.extent(data, function(d) { return d.date; }));

      y.domain([
        d3.min(chart.cities, function(c) { return d3.min(c.values, function(d) { return d.temperature; }); }),
        d3.max(chart.cities, function(c) { return d3.max(c.values, function(d) { return d.temperature; }); })
      ]);

      z.domain(chart.cities.map(function(c) { return c.id; }));

      // chart.container.append("g")
      //   .attr("class", "axis axis--x")
      //   .attr('transform', `translate(0, ${chart.height - chart.margin.top - chart.margin.bottom})`)
      //   .call(d3.axisBottom(x));

      // chart.container.append("g")
      //   .attr("class", "axis axis--y")
      //   .call(d3.axisLeft(y))
      //   .append("text")
      //     .attr("transform", "rotate(-90)")
      //     .attr("y", 6)
      //     .attr("dy", "0.71em")
      //     .attr("fill", "#000")
      //     .text("Temperature, ºF");

      const city = chart.container.selectAll(".city")
        .data(chart.cities)
        .enter()
        .append("g")
          .attr("class", "city");

      city.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(d.values); })
        .style("stroke", function(d) { return z(d.id); });
    }

    chart.rescale = (width, height) => {
      chart.width = width;
      chart.height = height;

      chart.svg
        .attr('width', chart.width)
        .attr('height', chart.height);
    }

    $(window).resize(() => {
      chart.container.selectAll('g').remove()
      w = parseInt($('div.home').width() * 1.0);
      h = parseInt($('main').height() * 0.4);
      h = parseInt(Math.min(h, w * 0.6));
      // console.log("Resized to #{w}x#{h}")
      chart.rescale(w, h)
      if(chart.data !== undefined)
        chart.render(chart.data)

      if ($('div.goto').position().top + $('div.goto').height() > $('nav.footer').position().top - 72) {
        if($('nav.footer').hasClass('invisible') === false)
          $('nav.footer').addClass('invisible')
      }
      else {
        if ($('nav.footer').hasClass('invisible') === true)
          $('nav.footer').removeClass('invisible')
      }
    })

    $(window).resize()
  }
});
