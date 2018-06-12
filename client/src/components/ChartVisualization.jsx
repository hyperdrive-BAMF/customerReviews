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
    const margins = { top: 15, right: 10, bottom: 50, left: 50 };
    const width = this.props.fullWidth - margins.right - margins.left;
    const height = this.props.fullHeight - margins.top - margins.bottom;

    const allDates = this.props.dataset.map(datum => datum.date);

    const svg = d3.select(this.svgElement)
      .attr('width', this.props.fullWidth)
      .attr('height', this.props.fullHeight)
      .append('g')
        .attr('transform', `translate(${margins.left}, ${margins.top})`);

    // x scale
    const dateScale = d3.scaleBand()
      .domain(allDates)
      .range([0, width])
      .paddingInner(0.2); // Add a bit of padding between each bar

    // y scale
    const maxPositiveReviews = d3.max(this.props.dataset, datum => datum.positive);
    const positiveReviewScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, maxPositiveReviews])
      .nice(); // round the domain values

    const xAxis = d3.axisBottom(dateScale);
    const yAxis = d3.axisLeft(positiveReviewScale);

    // Now draw everything
    const xAxisElement = svg.append('g')
      .classed('x axis', true)
      .attr('transform', `translate(-8, ${height + 4})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr('transform', 'rotate(270)')
      .attr('dy', '.35em');
      // .attr('transform', 'translate(0, 30)');

    const yAxisElement = svg.append('g')
      .classed('y axis', true)
      .attr('transform', 'translate(-5, 0)')
      .call(yAxis);

    // TODO: Add label to the yAxis

    const barsContainer = svg.append('g')
      .classed('bars-container', true);

    const bars = barsContainer.selectAll('rect.bar')
      .data(this.props.dataset)
      .enter().append('rect')
      .classed('bar', true)
      .attr('x', datum => dateScale(datum.date))
      .attr('width', dateScale.bandwidth())
      .attr('y', datum => positiveReviewScale(datum.positive))
      .attr('height', datum => (height - positiveReviewScale(datum.positive)));
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




// const ChartVisualization = (props) => {

//   const margins = { top: 5, right: 5, bottom: 50, left: 50 };
//   const width = props.fullWidth - margins.right - margins.left;
//   const height = props.fullHeight - margins.top - margins.bottom;

//   return (
//     <div className="chart-visualization">
//       <svg
//         height={props.fullHeight}
//         width={props.fullWidth}
//       >

//       </svg>
//     </div>
//   );
// };

export default ChartVisualization;
