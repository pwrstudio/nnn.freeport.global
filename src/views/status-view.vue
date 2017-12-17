<template>
  <div class='status'>
    <pre>{{main.container}}</pre>
    <div @click='buildTree'
         class='button'>Build content tree</div>
    <div id='dia'></div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
// import * as d3 from 'd3'
import work from '@/components/work'
export default {
  name: 'statusView',
  components: {
    work
  },
  data() {
    return {
      treeData: [
        {
          name: 'Top Level',
          parent: 'null',
          children: [
            {
              name: 'Level 2: A',
              parent: 'Top Level',
              children: [
                {
                  name: 'Son of A',
                  parent: 'Level 2: A'
                },
                {
                  name: 'Daughter of A',
                  parent: 'Level 2: A'
                }
              ]
            },
            {
              name: 'Level 2: B',
              parent: 'Top Level'
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapState(['main'])
  },
  mounted() {},
  updated: function() {
    this.$nextTick(function() {
      // Code that will run only after the
      // entire view has been re-rendered
    })
  },
  methods: {
    buildTree() {
      // const margin = {top: 20, right: 90, bottom: 30, left: 90}
      // const width = 960 - margin.left - margin.right
      // const height = 500 - margin.top - margin.bottom
      // var svg = d3
      //   .select('#dia')
      //   .append('svg')
      //   .attr('width', width + margin.right + margin.left)
      //   .attr('height', height + margin.top + margin.bottom)
      //   .append('g')
      //   .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      // let i = 0
      // let duration = 750
      // let root = {}
      // // declares a tree layout and assigns the size
      // var treemap = d3.tree().size([height, width])
      // console.dir(this.treeData[0])
      // root = d3.hierarchy(this.treeData[0], d => d.children)
      // console.dir(root)
      // root.x0 = height / 2
      // root.y0 = 0
      // update(root)
      // function update(source) {
      //   // Assigns the x and y position for the nodes
      //   var treeData = treemap(root)
      //   // Compute the new tree layout.
      //   var nodes = treeData.descendants(),
      //     links = treeData.descendants().slice(1)
      //   console.dir(nodes)
      //   // Normalize for fixed-depth.
      //   nodes.forEach(function(d) {
      //     d.y = d.depth * 180
      //   })
      //   // Update the nodes...
      //   var node = svg.selectAll('g.node').data(nodes, function(d) {
      //     return d.id || (d.id = ++i)
      //   })
      //   // Enter any new modes at the parent's previous position.
      //   var nodeEnter = node
      //     .enter()
      //     .append('g')
      //     .attr('class', 'node')
      //     .attr('transform', function(d) {
      //       return 'translate(' + source.y0 + ',' + source.x0 + ')'
      //     })
      //   // Add Circle for the nodes
      //   nodeEnter
      //     .append('circle')
      //     .attr('class', 'node')
      //     .attr('r', 1e-6)
      //     .style('fill', function(d) {
      //       return d._children ? 'lightsteelblue' : '#fff'
      //     })
      //   // Add labels for the nodes
      //   nodeEnter
      //     .append('text')
      //     .attr('dy', '.35em')
      //     .attr('x', function(d) {
      //       return d.children || d._children ? -13 : 13
      //     })
      //     .attr('text-anchor', function(d) {
      //       return d.children || d._children ? 'end' : 'start'
      //     })
      //     .text(function(d) {
      //       return d.data.name
      //     })
      //   // UPDATE
      //   var nodeUpdate = nodeEnter.merge(node)
      //   // Transition to the proper position for the node
      //   nodeUpdate
      //     .transition()
      //     .duration(duration)
      //     .attr('transform', function(d) {
      //       return 'translate(' + d.y + ',' + d.x + ')'
      //     })
      //   // Update the node attributes and style
      //   nodeUpdate
      //     .select('circle.node')
      //     .attr('r', 10)
      //     .style('fill', function(d) {
      //       return d._children ? 'lightsteelblue' : '#fff'
      //     })
      //     .attr('cursor', 'pointer')
      //   // Remove any exiting nodes
      //   var nodeExit = node
      //     .exit()
      //     .transition()
      //     .duration(duration)
      //     .attr('transform', function(d) {
      //       return 'translate(' + source.y + ',' + source.x + ')'
      //     })
      //     .remove()
      //   // On exit reduce the node circles size to 0
      //   nodeExit.select('circle').attr('r', 1e-6)
      //   // On exit reduce the opacity of text labels
      //   nodeExit.select('text').style('fill-opacity', 1e-6)
      //   // Update the links...
      //   var link = svg.selectAll('path.link').data(links, function(d) {
      //     return d.id
      //   })
      //   // Enter any new links at the parent's previous position.
      //   var linkEnter = link
      //     .enter()
      //     .insert('path', 'g')
      //     .attr('class', 'link')
      //     .attr('d', function(d) {
      //       var o = {x: source.x0, y: source.y0}
      //       return diagonal(o, o)
      //     })
      //   // UPDATE
      //   var linkUpdate = linkEnter.merge(link)
      //   // Transition back to the parent element position
      //   linkUpdate
      //     .transition()
      //     .duration(duration)
      //     .attr('d', function(d) {
      //       return diagonal(d, d.parent)
      //     })
      //   // Remove any exiting links
      //   var linkExit = link
      //     .exit()
      //     .transition()
      //     .duration(duration)
      //     .attr('d', function(d) {
      //       var o = {x: source.x, y: source.y}
      //       return diagonal(o, o)
      //     })
      //     .remove()
      //   // Store the old positions for transition.
      //   nodes.forEach(function(d) {
      //     d.x0 = d.x
      //     d.y0 = d.y
      //   })
      //   // Creates a curved (diagonal) path from parent to the child nodes
      //   function diagonal(s, d) {
      //     path = `M ${s.y} ${s.x}
      //       C ${(s.y + d.y) / 2} ${s.x},
      //         ${(s.y + d.y) / 2} ${d.x},
      //         ${d.y} ${d.x}`
      //     return path
      //   }
      // }
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.status {
  display: flex;
  flex-wrap: wrap;
}

pre {
  background: white;
  width: 50%;
}
.button {
  width: auto;
  height: 100px;
  line-height: 100px;
  background: blue;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: red;
  }
}

.node {
  cursor: pointer;
}

.node circle {
  fill: #fff;
  stroke: steelblue;
  stroke-width: 3px;
}

.node text {
  font: 12px sans-serif;
}

.link {
  fill: none;
  stroke: red;
  stroke-width: 2px;
}

#dia {
  background: lightblue;
}
</style>
