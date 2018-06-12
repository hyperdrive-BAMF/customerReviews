import React from 'react';
import * as d3 from 'd3';

import './../styles/ChartVisualization.scss';
//  _________ .__                   __ ____   ____.__                    .__  .__                __  .__               
//  \_   ___ \|  |__ _____ ________/  |\   \ /   /|__| ________ _______  |  | |__|____________ _/  |_|__| ____   ____  
//  /    \  \/|  |  \\__  \\_  __ \   __\   Y   / |  |/  ___/  |  \__  \ |  | |  \___   /\__  \\   __\  |/  _ \ /    \ 
//  \     \___|   Y  \/ __ \|  | \/|  |  \     /  |  |\___ \|  |  // __ \|  |_|  |/    /  / __ \|  | |  (  <_> )   |  \
//   \______  /___|  (____  /__|   |__|   \___/   |__/____  >____/(____  /____/__/_____ \(____  /__| |__|\____/|___|  /
//          \/     \/     \/                              \/           \/              \/     \/                    \/ 


class ChartVisualization extends React.Component {

  componentDidMount() {
    const fullWidth = this.props.fullWidth;
    const fullHeight = this.props.fullHeight;

    const margins = { top: 15, right: 10, bottom: 30, left: 50 };
    const width = fullWidth - margins.right - margins.left;
    const height = fullHeight - margins.top - margins.bottom;

    const allDates = this.props.dataset.map(datum => datum.date);

    const svg = d3.select(this.svgElement)
      .attr('width', fullWidth)
      .attr('height', fullHeight)
      .append('g')
        .attr('transform', `translate(${margins.left}, ${margins.top})`);

    // x scale
    const xScale = d3.scaleBand()
      .domain(allDates)
      .range([0, width])
      .paddingInner(0.2); // Add a bit of padding between each bar

    // y scale
    const maxPositiveReviews = d3.max(this.props.dataset, datum => datum.positive);
    const positiveScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, maxPositiveReviews])
      .nice(); // round the domain values

    const yAxis = d3.axisLeft(positiveScale).ticks(5);

    const yAxisElement = svg.append('g')
      .classed('y axis', true)
      .attr('transform', 'translate(-5, 0)')
      .call(yAxis);

    const positiveBarsContainer = svg.append('g')
      .classed('positive-bars-container', true);

    const positiveBars = positiveBarsContainer.selectAll('rect.bar')
      .data(this.props.dataset)
      .enter().append('rect')
      .classed('bar', true)
      .attr('title', datum => new Date(datum.date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }))
      .attr('x', datum => xScale(datum.date))
      .attr('width', xScale.bandwidth())
      .attr('y', datum => positiveScale(datum.positive))
      .attr('height', datum => (height - positiveScale(datum.positive)))
      .on("mouseover", function(datum, i) {
        var rect = d3.select(this);
        rect.classed('selected', true);

        var rectX = Math.floor(rect.attr('x'));
        var rectY = Math.floor(rect.attr('y'));

        svg.append('text')
          .classed('date-summary', true)
          .attr('id', `tooltip-${rectX}-${rectY}-${i}`)
          .text(`${datum.positive.toLocaleString()} positive reviews on ${datum.date}`)
          .attr('x', function() {
            return (width / 2) - (this.getBoundingClientRect().width / 2) - 10;
          })
          .attr('y', height + 23 );
      })
      .on("mouseout", function(datum, i) {
        var rect = d3.select(this);
        rect.classed('selected', false);

        var rectX = Math.floor(rect.attr('x'));
        var rectY = Math.floor(rect.attr('y'));

        svg.select(`#tooltip-${rectX}-${rectY}-${i}`).remove();
      });
  }

  shouldComponentUpdate() {
    // Prevent future-rerenders of this Component
    return false;
  }

  render() {
    return (
      <div className="chart-visualization">
        <svg ref={ (elem) => { this.svgElement = elem; } } />
      </div>
    );
  }

}

export default ChartVisualization;
