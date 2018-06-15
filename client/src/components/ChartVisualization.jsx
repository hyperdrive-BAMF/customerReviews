import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

import './../styles/ChartVisualization.scss';
//  _________ .__                   __ ____   ____.__                    .__  .__                __  .__
//  \_   ___ \|  |__ _____ ________/  |\   \ /   /|__| ________ _______  |  | |__|____________ _/  |_|__| ____   ____
//  /    \  \/|  |  \\__  \\_  __ \   __\   Y   / |  |/  ___/  |  \__  \ |  | |  \___   /\__  \\   __\  |/  _ \ /    \
//  \     \___|   Y  \/ __ \|  | \/|  |  \     /  |  |\___ \|  |  // __ \|  |_|  |/    /  / __ \|  | |  (  <_> )   |  \
//   \______  /___|  (____  /__|   |__|   \___/   |__/____  >____/(____  /____/__/_____ \(____  /__| |__|\____/|___|  /
//          \/     \/     \/                              \/           \/              \/     \/                    \/

class ChartVisualization extends React.Component {
  componentDidMount() {
    const { fullWidth, fullHeight, dataset } = this.props;

    const margins = {
      top: 15,
      right: 15,
      bottom: 30,
      left: 40
    };
    const width = fullWidth - margins.right - margins.left;
    const height = fullHeight - margins.top - margins.bottom;

    const allDates = dataset.map(datum => datum.date);

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

    svg.append('g')
      .classed('y axis', true)
      .attr('transform', 'translate(-5, 0)')
      .call(yAxis);

    const positiveBarsContainer = svg.append('g')
      .classed('positive-bars-container', true);

    positiveBarsContainer.selectAll('rect.bar')
      .data(this.props.dataset)
      .enter().append('rect')
      .classed('bar', true)
      .attr('title', datum => (
        new Date(datum.date).toLocaleDateString(
          'en-US',
          { year: 'numeric', month: 'long', day: 'numeric' }
        )
      ))
      .attr('x', datum => xScale(datum.date))
      .attr('width', xScale.bandwidth())
      .attr('y', datum => positiveScale(datum.positive))
      .attr('height', datum => (height - positiveScale(datum.positive)))
      .on('mouseover', function mouseOverHandler(datum, i) {
        const rect = d3.select(this);
        rect.classed('selected', true);

        const rectX = Math.floor(rect.attr('x'));
        const rectY = Math.floor(rect.attr('y'));

        const formattedDate = new Date(datum.date).toLocaleDateString(
          'en-US',
          { year: 'numeric', month: 'long', day: 'numeric' }
        )

        svg.append('text')
          .classed('date-summary', true)
          .attr('id', `tooltip-${rectX}-${rectY}-${i}`)
          .text(`${datum.positive.toLocaleString()} positive reviews on ${formattedDate}`)
          .attr('x', function centerLabel() {
            return (width / 2) - (this.getBoundingClientRect().width / 2) - 10;
          })
          .attr('y', height + 23);
      })
      .on('mouseout', function mouseOutHandler(datum, i) {
        const rect = d3.select(this);
        rect.classed('selected', false);

        const rectX = Math.floor(rect.attr('x'));
        const rectY = Math.floor(rect.attr('y'));

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
ChartVisualization.propTypes = {
  fullWidth: PropTypes.number.isRequired,
  fullHeight: PropTypes.number.isRequired,
  dataset: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    positive: PropTypes.number.isRequired,
    negative: PropTypes.number.isRequired
  })).isRequired
};

export default ChartVisualization;
