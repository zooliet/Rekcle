import React from 'react';
import ReactDOM from 'react-dom';
import './style.css'

// ReactDOM.render(
//   <div className="ml_demo d-flex flex-column justify-content-center align-items-center mt-5 h-50">
//     <h1 className="display-3 text-center"><strong>Coming soon</strong></h1>
//   </div>,
//   document.getElementById('ml_app')
// );

import 'babel-polyfill'
import * as d3 from 'd3';
import * as legend from 'd3-svg-legend';

const protoChart = {
  width: 480, // window.innerWidth,
  height: 320, // window.innerHeight,
  margin: {
    left: 10, right: 10, top: 10, bottom: 10,
  },
};

function chartFactory(div, opts, proto = protoChart) {
  const chart = Object.assign({}, proto, opts);
  // console.log(chart)

  chart.svg = d3.select(div)
    .append('svg')
    .attr('width', chart.width)
    .attr('height', chart.height);
    // .attr('width', chart.width - chart.margin.right)
    // .attr('height', chart.height - chart.margin.bottom);


  chart.container = chart.svg.append('g')
    .attr('id', 'container')
    .attr('transform', `translate(${chart.margin.left}, ${chart.margin.top})`);

  return chart;

}

function addRoot(data, itemKey, parentKey, joinValue) {
  data.forEach((d) => { d[parentKey] = d[parentKey] || joinValue; });
  data.push({
    [parentKey]: '',
    [itemKey]: joinValue,
  });

  return data;
}

function linkHorizontal(d) {
  return "M" + d.source.x + "," + d.source.y
      + "C" + d.source.x +  "," + (d.source.y + d.target.y) / 2
      + " " + d.target.x + "," + (d.source.y + d.target.y) / 2
      + " " + d.target.x + "," + d.target.y;
}

function linkVertical(d) {
  return "M" + d.source.x + "," + d.source.y
      + "C" + (d.source.x + d.target.x) / 2 + "," + d.source.y
      + " " + (d.source.x + d.target.x) / 2 + "," + d.target.y
      + " " + d.target.x + "," + d.target.y;
}

const uniques = (data, name) => data.reduce(
  (uniqueValues, d) => {
    uniqueValues.push((uniqueValues.indexOf(name(d)) < 0 ? name(d) : undefined));
    return uniqueValues;
  }, [])
  .filter(i => i); // Filter by identity

function nameId(data, name) {
  const uniqueNames = uniques(data, name);
  return d3.scaleOrdinal()
    .domain(uniqueNames)
    .range(d3.range(uniqueNames.length));
}

function binPerName(data, name) {
  const nameIds = nameId(data, name);
  const histogram = d3.histogram()
    .bins(nameIds.range())
    .value(d => nameIds(name(d)));

  return histogram(data);
}

const colorScale = d3.scaleOrdinal().range(d3.schemeCategory10);

function fixateColors(data, key) {
  colorScale.domain(uniques(data, d => d[key]));
}

function tickAngle(d) {
  const midAngle = (d.endAngle - d.startAngle) / 2;
  return ((midAngle + d.startAngle) / Math.PI) * (180 - 90);
}

function arcLabels(text, radius) {
  return (selection) => {
    selection.append('text')
      .text(text)
      .attr('text-anchor', d => (tickAngle(d) > 100 ? 'end' : 'start'))
      .attr('transform', (d) => {
        const degrees = tickAngle(d);
        let turn = `rotate(${degrees}) translate(${radius(d) + 10}, 0)`;
        if (degrees > 100) {
          turn += 'rotate(180)';
        }
        return turn;
      });
  };
}

function tooltip(text, chart) {
  return (selection) => {
    function mouseover(d) {
      const path = d3.select(this);
      path.classed('highlighted', true);

      const mouse = d3.mouse(chart.node());
      const tool = chart.append('g')
        .attr('id', 'tooltip')
        .attr('transform', `translate(${mouse[0] + 5},${mouse[1] + 10})`);

      const textNode = tool.append('text')
        .text(text(d))
        .attr('fill', 'black')
        .node();

      tool.append('rect')
        .attr('height', textNode.getBBox().height)
        .attr('width', textNode.getBBox().width)
        .style('fill', 'rgba(255, 255, 255, 0.6)')
        .attr('transform', 'translate(0, -16)');

      tool.select('text')
        .remove();

      tool.append('text').text(text(d));
    }

    function mousemove() {
      const mouse = d3.mouse(chart.node());
      d3.select('#tooltip')
        .attr('transform', `translate(${mouse[0] + 15},${mouse[1] + 20})`);
    }

    function mouseout() {
      const path = d3.select(this);
      path.classed('highlighted', false);
      d3.select('#tooltip').remove();
    }

    selection.on('mouseover.tooltip', mouseover)
      .on('mousemove.tooltip', mousemove)
      .on('mouseout.tooltip', mouseout);
  };
}

function allUniqueNames(data, sourceKey = 'source', targetKey = 'target') {
  const sources = uniques(data, d => d[sourceKey]);
  const targets = uniques(data, d => d[targetKey]);
  return uniques(sources.concat(targets), d => d);
}

function connectionMatrix(data, sourceKey = 'source', targetKey = 'target', valueKey = 'value') {
  const nameIds = nameId(allUniqueNames(data, 'Source', 'Target'), d => d);
  const uniqueIds = nameIds.domain();
  const matrix = d3.range(uniqueIds.length).map(() => d3.range(uniqueIds.length).map(() => 1));
  data.forEach((d) => {
    matrix[nameIds(d[sourceKey])][nameIds(d[targetKey])] += Number(d[valueKey]);
  });

  return matrix;
}

function makeTree(data, filterByDonor, name1, name2) {
  const tree = { name: 'Donations', children: [] };
  const uniqueNames = uniques(data, d => d.DonorName);

  tree.children = uniqueNames.map((name) => {
    const donatedTo = data.filter(d => filterByDonor(d, name));
    const donationsValue = donatedTo.reduce((last, curr) => {
      const value = Number(curr.Value.replace(/[^\d.]*/g, ''));
      return value ? last + value : last;
    }, 0);

    return {
      name,
      donated: donationsValue,
      children: donatedTo.map(d => ({
        name: name2(d),
        count: 0,
        children: [],
      })),
    };
  });

  return tree;
}

const heightOrValueComparator = (a, b) => b.height - a.height || b.value - a.value;

const valueComparator = (a, b) => b.value - a.value;

const descendantsDarker = (d, color, invert = false, dk = 5) =>
  d3.color(color(d.ancestors()[d.ancestors().length - 2].id.split(' ').pop()))[invert ? 'brighter' : 'darker'](d.depth / dk);

const getMajorHouses = data => addRoot(data, 'itemLabel', 'fatherLabel', 'Westeros')
    .map((d, i, a) => {
      if (d.fatherLabel === 'Westeros') {
        const childrenLen = a.filter(e => e.fatherLabel === d.itemLabel).length;
        return childrenLen > 0 ? d : undefined;
      } else {
        return d;
      }
    })
    .filter(i => i);

const getHouseName = (d) => {
  const ancestors = d.ancestors();
  let house;
  if (ancestors.length > 1) {
    ancestors.pop();
    house = ancestors.pop().id.split(' ').pop();
  } else {
    house = 'Westeros';
  }

  return house;
};

const houseNames = root => root.ancestors().shift().children.map(getHouseName);

const getHouseColor = d => colorScale(getHouseName(d));

const layoutDemo = ((enabled) => {
  if(enabled) {
    const westerosChart = chartFactory('div.demo_graph', {
      width: parseInt($('div.demo_graph').width() * 0.9),
      height: parseInt($('main').height() * 0.6),
      // height: parseInt(Math.min($('main').height() * 0.4, $('div.demo_graph').width() * 0.6)),
      margin: { left: 50, right: 50, top: 50, bottom: 50 },
      padding: { left: 10, right: 10, top: 10, bottom: 10 },
    });

    westerosChart.loadData = async function loadData(uri) {
      if (uri.match(/\.csv$/)) {
        this.data = d3.csvParse(await (await fetch(uri)).text());
      } else if (uri.match(/\.json$/)) {
        this.data = await (await fetch(uri)).json();
      }

      return this.data;
    };

    westerosChart.init = function initChart(chartType, dataUri, ...args) {
      this.loadData(dataUri).then(data => this[chartType].call(this, data, ...args));
      this.innerHeight = this.height - this.margin.top - this.margin.bottom - this.padding.top - this.padding.bottom;
      this.innerWidth = this.width - this.margin.left - this.margin.right - this.padding.left - this.padding.right;
    };

    westerosChart.tree = function Tree(_data) {
      const data = getMajorHouses(_data);

      const chart = this.container;

      const stratify = d3.stratify()
        .parentId(d => d.fatherLabel)
        .id(d => d.itemLabel);

      const root = stratify(data);

      const layout = d3.tree()
        .size([
          this.innerWidth,
          this.innerHeight,
        ]);

      fixateColors(houseNames(root), 'id');

      const line = d3.line().curve(d3.curveBasis);

      // Links
      const links = layout(root)
        .descendants()
        .slice(1);

      chart.selectAll('.link')
        .data(links)
          .enter()
          .append('path')
          .attr('fill', 'none')
          .attr('stroke', 'lightblue')
          .attr('d', d => line([
            [d.x, d.y],
            [d.x, (d.y + d.parent.y) / 2],
            [d.parent.x, (d.y + d.parent.y) / 2],
            // [(d.x + d.parent.x) / 2, d.y],
            // [(d.x + d.parent.y) / 2, d.parent.y],
            [d.parent.x, d.parent.y]],
          ));

      // Nodes
      const nodes = chart.selectAll('.node')
        .data(root.descendants())
        .enter()
          .append('circle')
          .attr('r', 4.5)
          .attr('fill', getHouseColor)
          .attr('class', 'node')
          .attr('cx', d => d.x)
          .attr('cy', d => d.y);

      const legendGenerator = legend.legendColor()
        .scale(colorScale);

      this.container
        .append('g')
        .attr('id', 'legend')
        .attr('transform', `translate(0, ${this.innerHeight / 2})`)
        .call(legendGenerator);

      nodes.call(tooltip(d => d.data.itemLabel, this.container));
    };

    westerosChart.cluster = function Cluster(_data) {
      const data = getMajorHouses(_data);

      const stratify = d3.stratify()
        .parentId(d => d.fatherLabel)
        .id(d => d.itemLabel);

      const root = stratify(data);

      fixateColors(houseNames(root), 'id');

      const layout = d3.cluster()
        .size([
          this.innerHeight,
          this.innerWidth,
          // this.innerWidth - 150,
        ]);

      const links = layout(root)
        .descendants()
        .slice(1);

      const line = d3.line().curve(d3.curveBasis);

      this.container.selectAll('.link')
        .data(links)
        .enter()
        .append('path')
        .attr('fill', 'none')
        .attr('stroke', 'lightblue')
        .attr('d', d => line([
          [d.y, d.x],
          // [d.y, (d.x + d.parent.x) / 2],
          // [d.parent.y, (d.x + d.parent.x) / 2],
          [(d.y + d.parent.y) / 2, d.x],
          [(d.y + d.parent.y) / 2, d.parent.x],
          [d.parent.y, d.parent.x]],
        ));

      const nodes = this.container.selectAll('.node')
        .data(root.descendants())
        .enter()
        .append('circle')
        .classed('node', true)
          .attr('r', 5)
          .attr('fill', getHouseColor)
          .attr('cx', d => d.y)
          .attr('cy', d => d.x);

      // const l = legend
      //   .legendColor()
      //   .scale(color);

      // this.container
      //   .append('g')
      //   .attr('id', 'legend')
      //   .attr('transform', `translate(${this.innerWidth - 100}, 0)`)
      //   .call(l);

      // nodes.call(tooltip(d => d.data.itemLabel, this.container));
    };

    westerosChart.treemap = function Treemap(_data) {
      const data = getMajorHouses(_data);
      const stratify = d3.stratify()
        .parentId(d => d.fatherLabel)
        .id(d => d.itemLabel);

      const root = stratify(data)
        .sum(d => d.screentime)
        .sort(heightOrValueComparator);

      const cellPadding = 10;
      const houseColors = colorScale.copy().domain(houseNames(root));

      const layout = d3.treemap()
        .size([
          this.innerWidth - 100,
          this.innerHeight,
        ])
        .padding(cellPadding);

      layout(root);

      const nodes = this.container.selectAll('.node')
        .data(root.descendants().slice(1))
        .enter()
        .append('g')
          .attr('class', 'node');

      nodes.append('rect')
        .attr('x', d => d.x0)
        .attr('y', d => d.y0)
        .attr('width', d => d.x1 - d.x0)
        .attr('height', d => d.y1 - d.y0)
        .attr('fill', d => descendantsDarker(d, colorScale, true));

      this.container
        .append('g')
        .attr('id', 'legend')
        .attr('transform', `translate(${this.innerWidth - 100}, ${cellPadding})`)
        .call(legend.legendColor().scale(houseColors));

      nodes.call(tooltip(d => d.data.itemLabel, this.container));
    };

    westerosChart.partition = function Partition(_data) {
      const data = getMajorHouses(_data);

      const stratify = d3.stratify()
        .parentId(d => d.fatherLabel)
        .id(d => d.itemLabel);

      const root = stratify(data)
        .sum(d => d.screentime)
        .sort(heightOrValueComparator);

      const houseColors = colorScale.copy().domain(houseNames(root));

      const layout = d3.partition()
        .size([
          this.innerWidth - 175,
          this.innerHeight,
        ])
        .padding(2)
        .round(true);

      layout(root);

      const nodes = this.container.selectAll('.node')
        .data(root.descendants().slice(1))
        .enter()
        .append('g')
          .attr('class', 'node');

      nodes.append('rect')
        .attr('x', d => d.x0)
        .attr('y', d => d.y0)
        .attr('width', d => d.x1 - d.x0)
        .attr('height', d => d.y1 - d.y0)
        .attr('fill', d => descendantsDarker(d, colorScale));

      this.container
        .append('g')
        .attr('id', 'legend')
        .attr('transform', `translate(${this.innerWidth - 100}, 0)`)
        .call(legend.legendColor().scale(houseColors));

      nodes.call(tooltip(d => d.data.itemLabel, this.container));
    };

    westerosChart.radialPartition = function RadialPartition(_data) {
      const data = getMajorHouses(_data).map((d, i, a) => Object.assign(d, {
        screentime: a.filter(v => v.fatherLabel === d.itemLabel).length ? 0 : d.screentime,
      }));
      const radius = Math.min(this.innerWidth, this.innerHeight) / 2;

      const stratify = d3.stratify()
        .parentId(d => d.fatherLabel)
        .id(d => d.itemLabel);

      const root = stratify(data)
        .sum(d => d.screentime)
        .sort(null);

      const houseColors = colorScale.copy().domain(root.ancestors().shift().children.map(
        d => d.id.split(' ')[d.id.split(' ').length - 1])
      );

      const layout = d3.partition()
        .size([
          this.innerWidth / 2,
          this.innerHeight / 2,
        ])
        .padding(1)
        .round(true);

      const x = d3.scaleLinear()
          .domain([0, radius])
          .range([0, Math.PI * 2]);

      const arc = d3.arc()
        .startAngle(d => x(d.x0))
        .endAngle(d => x(d.x1))
        .innerRadius(d => d.y0)
        .outerRadius(d => d.y1);

      layout(root);

      const nodes = this.container
      .append('g')
      .attr('class', 'nodes')
      .attr('transform', `translate(${this.innerWidth / 2}, ${this.innerHeight / 2})`)
      .selectAll('.node')
        .data(root.descendants().slice(1))
        .enter()
        .append('g')
          .attr('class', 'node');

      nodes.append('path')
        .attr('d', arc)
        .attr('fill', d => d3.color(colorScale(d.ancestors()[d.ancestors().length - 2].id.split(' ').pop()))
          .darker(d.depth / 5));

      this.container
        .append('g')
        .attr('id', 'legend')
        .attr('transform', `translate(${this.innerWidth - 100}, 0)`)
        .call(legend.legendColor().scale(houseColors));

      nodes.call(tooltip(d => d.data.itemLabel, this.container));
    };

    westerosChart.pack = function Pack(_data) {
      const data = getMajorHouses(_data);

      const stratify = d3.stratify()
        .parentId(d => d.fatherLabel)
        .id(d => d.itemLabel);

      const root = stratify(data)
        .sum(d => d.screentime)
        .sort(valueComparator);

      const houseColors = colorScale.copy().domain(houseNames(root));
      fixateColors(data, 'itemLabel');

      const layout = d3.pack()
        .size([
          this.innerWidth - 100,
          this.innerHeight,
        ]);

      layout(root);

      const nodes = this.container.selectAll('.node')
        .data(root.descendants().slice(1))
        .enter()
        .append('circle')
          .attr('class', 'node')
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
          .attr('r', d => d.r)
          .attr('fill', d => descendantsDarker(d, colorScale, true, 5));

      this.container
        .append('g')
        .attr('id', 'legend')
        .attr('transform', `translate(${this.innerWidth - 100}, ${this.innerHeight / 2})`)
        .call(legend.legendColor().scale(houseColors));

      nodes.call(tooltip(d => d.data.itemLabel, this.container));
    };

    westerosChart.init('cluster', '/data/GoT-lineages-screentimes.json');

    window.addEventListener("resize", () => {
      const w = parseInt($('div.demo_graph').width() * 0.9);
      let h = parseInt($('main').height() * 0.6);
      // h = parseInt(Math.max(h, w * 0.6));
      // westerosChart.rescale(w, h)
      westerosChart.width = w
      westerosChart.height = h
      westerosChart.svg
        .attr('width', w)
        .attr('height', h)
      westerosChart.container.selectAll('path, circle').remove()
      westerosChart.init('cluster', '/data/GoT-lineages-screentimes.json');
      // chart.container.selectAll('g').remove()
      // chart.render()
    })
  }
})(true)
