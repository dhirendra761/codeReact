/*
 * Visualization source
 */
define([
            'jquery',
            'underscore',
            'api/SplunkVisualizationBase',
            'api/SplunkVisualizationUtils',
			'd3',
			'd3-graphviz'
            // Add required assets to this list
        ],
        function(
            $,
            _,
            SplunkVisualizationBase,
			SplunkVisualizationUtils,
			d3,
			graphviz
        ) {

// d3.zoom.filter(function () {
    // return d3.event.ctrlKey;
// });		


	var dotGraph='';
	var idCount=0;
	var currentPosition=0;
	var rootGraph;
	var mapNodes=new Map();
	var mapSubgraphs=new Map();
	var mapRanks=new Map();
	var separator;
	var indentChar='\t';
	var indent='';
	var newRank;

	// object model
	
	function comparePosition(elmt1,elmt2)
	{
		return elmt1.position - elmt2.position;
	}
	
	function getParents(parentIds)
	{
		parents=[];
		
		arrayParentsIds=[];
		if (parentIds)
		{
			arrayParentsIds=parentIds.split(/[,;]/);
			arrayParentsIds.forEach(function(parentId, index, array1)
			{
				parent=mapSubgraphs.get(parentId);
				if (!parent)
				{
					throw new SplunkVisualizationBase.VisualizationError(
						'The parents column should correspond to a list of existing subgraph Ids'
					);
				}
				else
				{
					parents.push(parent);
				}
			});
		}
		
		if (parents.length == 0)
		{
			// that's ok, we'll attach it to the main graph
			parents.push(rootGraph.graph);
		}
		
		return parents;
	}
	
	class root {
		constructor() {}
	}
	
	class graph {
		constructor(id,subtype) {
			this.id=id ? id : "splunkGraphviz";
			this.subtype=subtype ? subtype : "digraph";
			separator = this.subtype=="digraph" ? '->' : '--';
			this.members=[];
		}
		
		addMember(element) {
			this.members.push(element);
		}
		
		sortMembers() {
			this.members.sort(comparePosition);
			this.members.forEach(function(member, index, members)
			{
				member.sortMembers();
			});
		}
		
		toDot()
		{
			var dotGraph='' + this.subtype + ' ' + this.id + ' {\n';
			
			indent+=indentChar;
			
			if (newRank==true)
			{
				dotGraph += indent + 'newrank=true;\n';
			}
			
			this.members.forEach(function(member, index, members)
			{
				dotGraph+=member.toDot();
			});
			indent=indent.substr(indent.length-1);
			
			var mapRanksSorted=new Map(
				  Array
					.from(mapRanks)
					.sort((a, b) => {return a[0] - b[0];})
			);
			
			mapRanksSorted.forEach(function(nodes, index, map)
			{
				var rank;
				if (index=="min" || index=="max")
					rank=index;
				else
					rank="same";

				dotGraph+=indent + '{rank=' + rank + ';';

				nodes.forEach(function(node)
				{
					dotGraph+=node.id + ';';
				});

				dotGraph+='}\n';
			});
			
			
			dotGraph+='}';
			
			return dotGraph;
		}
	}


	class subgraph {
		constructor(id,type) {
			this.members=[];
			this.isCluster=(type=="cluster");
			this.isVisible=(this.isCluster || !id.startsWith('__'));
			this.id=id;
			
		}
		
		complete(parents,attrlist,position,expanded) {
			var subgraph=this;
			parents.forEach(function(parent, index)
			{
				parent.addMember(subgraph);
			});
			this.attrlist=attrlist ? attrlist.replace(/,/g,";") : attrlist;
			this.expanded=expanded ? expanded : true;

			if (position)
			{
				this.position=position;
				currentPosition=position;
			}
			else
				this.position=++currentPosition;
		}

		addMember(element) {
			this.members.push(element);
		}
		
		sortMembers() {
			this.members.sort(comparePosition);
		}
		
		toDot() {
			var dotSubgraph=indent;
			if (this.isVisible)
			{
				dotSubgraph+='subgraph ';
				if (this.isCluster)
				{
					dotSubgraph+='\"cluster' + this.id + '\" ';
				}
				else
				{
					dotSubgraph+='\"' + this.id + '\" ';
				}
			}
			dotSubgraph += '{\n';
			
			indent+=indentChar;
			
			if (this.attrlist)
			{
				dotSubgraph += indent + this.attrlist + ';\n';
			}
			
			this.members.forEach(function(member, index, members)
			{
				dotSubgraph+=member.toDot();
			});
			indent=indent.substr(0,indent.length-1);
						
			dotSubgraph += indent + '}\n';
			
			return dotSubgraph;
		}
	}

	class node {
		constructor(id) {
			this.id=id;
			this.inEdges=[];
			this.outEdges=[];
		}
		
		complete(attrlist,parents,rank,position,isImplicit=false) {
			var node=this;
			this.attrlist=attrlist ? attrlist.replace(/;/g,",") : null;
			parents.forEach(function(parent, index)
			{
				parent.addMember(node);
			});
			this.isImplicit=isImplicit;

			if (position)
			{
				this.position=position;
				currentPosition=position;
			}
			else
				this.position=++currentPosition;
				
			if (rank)
			{
				newRank=true;
				var rankGroup=mapRanks.get(rank);
				if (!rankGroup)
				{
					rankGroup=[];
					mapRanks.set(rank,rankGroup);
				}
				rankGroup.push(this);
			}
		}

		addInEdge(edge) {
			this.inEdges.push(edge);
		}

		addOutEdge(edge) {
			this.outEdges.push(edge);
		}

		sortMembers() {}
		
		toDot() {
			
			if (this.isImplicit)
				return '';
			
			var dotNode=indent + '\"' + this.id + '\"';
			if (this.attrlist)
				dotNode +='[' + this.attrlist + ']';
			dotNode += ';\n';
			
			return dotNode;
		}


	}
	
	
	class attr {
		constructor(subtype,attrlist,parents,position) {
			var attr=this;
			this.id=idCount++;
			this.attrlist=attrlist ? attrlist.replace(/;;/g,",") : attrlist;
			if (subtype)
				this.attrlist=attrlist ? attrlist.replace(/;/g,",") : attrlist;
			this.subtype=subtype ? subtype : "";
			parents.forEach(function(parent, index)
			{
				parent.addMember(attr);
			});

			if (position)
			{
				this.position=position;
				currentPosition=position;
			}
			else
				this.position=++currentPosition;
		}

		sortMembers() {}

		toDot() {
			if (this.attrlist)
			{
				var dotAttr=indent;
				
				if (this.subtype == "graph" || this.subtype == "node" || this.subtype == "edge")
				{
					dotAttr += this.subtype + ' [';
				}
			
				dotAttr += this.attrlist;

				if (this.subtype == "graph" || this.subtype == "node" || this.subtype == "edge")
				{
					dotAttr += ']';
				}
				
				dotAttr += ';\n';
				
				return dotAttr;
			}
			
			return '';
		}
	}
	
	class edge {
		constructor(origin,destination,attrlist,parents,position) {
			var edge=this;
			this.origin=origin;
			origin.addOutEdge(this);
			this.destination=destination;
			destination.addInEdge(this);
			this.attrlist=attrlist ? attrlist.replace(/;/g,",") : null;
			parents.forEach(function(parent, index)
			{
				parent.addMember(edge);
			});

			if (position)
			{
				this.position=position;
				currentPosition=position;
			}
			else
				this.position=++currentPosition;
		}

		sortMembers() {}

		toDot() {

			var dotEdge=indent +  '\"' + this.origin.id + '\" ' + separator + ' \"' + this.destination.id + '\"';
			if (this.attrlist)
				dotEdge +='[' + this.attrlist + ']';
			dotEdge += ';\n';
			
			return dotEdge;
		}
	}

    // Extend from SplunkVisualizationBase
    return SplunkVisualizationBase.extend({

        initialize: function() {
            SplunkVisualizationBase.prototype.initialize.apply(this, arguments);
            this.$el = $(this.el);

            // Initialization logic goes here
			
			columns = ["type","subtype","id","attrlist","parents","rank","position","origin","destination"];
			mapColumns= new Map();
		},

        // Optionally implement to format data returned from search. 
        // The returned object will be passed to updateView as 'data'
        formatData: function(data) {
			// Check for an empty data object
			if(!data || !data.rows || data.rows.length < 1){
				return false;
			}			
			
            return data;
        },

		// parsing
		parseData: function(data)
		{
			indent='';
			newRank=false;

			mapColumns.clear();

			// map.clear() doesn't make the old entries unaccessibles, so it can create weird bugs in a dashboards with several panels
			columns.forEach(function(value,index,array1){
				mapColumns[value]=null;
			});
			
			data.fields.forEach(function(value, index, array1)
			{
					columnName=value.name.toLowerCase();
					if (!columns.includes(columnName))
					{
						console.log('Column ' + value.name + ' ignored. Valid column names are : ' + columns.toString());
					}
					else
					{
						mapColumns[columnName]=index;
					}
					
			});

			// first, we parse the data to create the graph, subgraphs and nodes only with their ids so that we'll be able to link to them later

			data.rows.forEach(function(value, index, array1)
			{		
				currentRow=value;
				type=currentRow[mapColumns["type"]];
				
				if (type=="graph")
				{
					if (rootGraph && rootGraph.graph)
					{
						throw new SplunkVisualizationBase.VisualizationError(
							'The result set can\'t contain several elements with type="graph"'
						);
					}
					else
					{
						subtype=currentRow[mapColumns["subtype"]];
						
						if (!subtype || (subtype != "graph" && subtype != "digraph"))
						{
							throw new SplunkVisualizationBase.VisualizationError(
								'The element with type="graph" should have a valid subtype : "graph" or "digraph"'
							);
						}

						rootGraph=new root();
						rootGraph.graph=new graph(currentRow[mapColumns["id"]],subtype);
					}
				}
				else if (type=="subgraph" || type=="cluster")
				{
					subgraphId=currentRow[mapColumns["id"]];
					if (!subgraphId)
					{						
						throw new SplunkVisualizationBase.VisualizationError(
							'Elements with type="subgraph" or type="cluster" must have an id'
						);
					}
					else if (mapSubgraphs.get(subgraphId))
					{						
						throw new SplunkVisualizationBase.VisualizationError(
							'The result set can\'t contain several elements with type="subgraph" or type="cluster" and id="' + subgraphId + '"'
						);
					}
					else
					{
						mapSubgraphs.set(subgraphId,new subgraph(subgraphId,type));
					}
				}
				else if (type=="node")
				{
					nodeId=currentRow[mapColumns["id"]];
					if (!nodeId)
					{						
						throw new SplunkVisualizationBase.VisualizationError(
							'Elements with type="node" must have an id'
						);
					}
					else if (mapNodes.get(nodeId))
					{						
						throw new SplunkVisualizationBase.VisualizationError(
							'The result set can\'t contain several elements with type="node" and id="' + nodeId + '"'
						);
					}
					else
					{
						mapNodes.set(nodeId,new node(nodeId));
					}
				}

			});

			if (!rootGraph)
				rootGraph=new root();

			if (!rootGraph.graph)
				rootGraph.graph=new graph();
			
			// then, we complete the elements and create the rest and attach them at the same time
			data.rows.forEach(function(value, index, array1)
			{
				// now we complete the model with all the elements
				currentRow=value;
				
				type=currentRow[mapColumns["type"]];
				
				if (type=="graph")
				{
					// nothing to do
				}
				else if (type=="subgraph" || type=="cluster")
				{
					subgraphId=currentRow[mapColumns["id"]];
					
					if (!subgraphId)
					{
						// should really not happen..
						throw new SplunkVisualizationBase.VisualizationError(
							'ERROR - Internal - Elements with type="subgraph" must have an id !!'
						);
					}
					else if (!mapSubgraphs.get(subgraphId))
					{
						// should really not happen...
						throw new SplunkVisualizationBase.VisualizationError(
							'ERROR - Internal - The graph should already contain a subgraph with id="' + subgraphId + '" !!'
						);
					}
					
					subgraphParents=getParents(currentRow[mapColumns["parents"]]);
					mapSubgraphs.get(subgraphId).complete(subgraphParents,currentRow[mapColumns["attrlist"]],currentRow[mapColumns["position"]]);
				}
				else if (type=="node")
				{
					nodeId=currentRow[mapColumns["id"]];
					if (!nodeId)
					{
						// should really not happen..
						throw new SplunkVisualizationBase.VisualizationError(
							'ERROR - Internal - Elements with type="node" must have an id !!'
						);
					}
					else if (!mapNodes.get(nodeId))
					{
						// should really not happen...
						throw new SplunkVisualizationBase.VisualizationError(
							'ERROR - Internal - The graph should already contain a node with id="' + nodeId + '" !!'
						);
					}

					nodeParents=getParents(currentRow[mapColumns["parents"]]);
					mapNodes.get(nodeId).complete(currentRow[mapColumns["attrlist"]],nodeParents,currentRow[mapColumns["rank"]],currentRow[mapColumns["position"]]);
				}
				else if (type=="attr")
				{
					attrParents=getParents(currentRow[mapColumns["parents"]]);
					subtype=currentRow[mapColumns["subtype"]];
					
					if (subtype && subtype!="graph" && subtype!="node" && subtype!="edge")
					{
						throw new SplunkVisualizationBase.VisualizationError(
							'The element with type="attr" should have a valid subtype : "graph", "node", "edge" or nothing'
						);
					}
					else
					{
						new attr(currentRow[mapColumns["subtype"]],currentRow[mapColumns["attrlist"]],attrParents,currentRow[mapColumns["position"]]);
					}

				}
				else if (type=="edge")
				{
					edgeParents=getParents(currentRow[mapColumns["parents"]]);
					
					edgeOriginId=currentRow[mapColumns["origin"]];
					edgeDestinationId=currentRow[mapColumns["destination"]];
					if (!edgeOriginId || !edgeDestinationId)
					{
						throw new SplunkVisualizationBase.VisualizationError(
							'Elements with type="edge" must have an origin and a destination'
						);
					}
					
					edgeOrigin=mapNodes.get(edgeOriginId);
					if (!edgeOrigin)
					{
						edgeOrigin=new node(edgeOriginId);
						edgeOrigin.complete(null,edgeParents,null,currentRow[mapColumns["position"]],true);
						mapNodes.set(edgeOriginId,edgeOrigin);
					}

					edgeDestination=mapNodes.get(edgeDestinationId);					
					if (!edgeDestination)
					{
						edgeDestination=new node(edgeDestinationId);
						edgeDestination.complete(null,edgeParents,null,currentRow[mapColumns["position"]],true);
						mapNodes.set(edgeDestinationId,edgeDestination);
					}
					
					new edge(edgeOrigin,edgeDestination,currentRow[mapColumns["attrlist"]],edgeParents,currentRow[mapColumns["position"]]);

				}
				else
				{
						throw new SplunkVisualizationBase.VisualizationError(
							'The result set can\'t contain an element with type="' + type + '". The valid types are graph, subgraph, cluster, node, edge and attr'
						);
				}
			});

		},

        // Implement updateView to render a visualization.
        //  'data' will be the data object returned from formatData or from the search
        //  'config' will be the configuration property object
        updateView: function(data, config) {

			// Guard for empty data
            if(!data || !data.rows || data.rows.length < 1){
                return;
            }
		
			svg = d3.select(this.el);
			svg.selectAll("*").remove();
			
			wait = config[this.getPropertyNamespaceInfo().propertyNamespace + 'wait'] || "true";
			if (wait == "true" && data.meta.done != true)
			{
				svg.append("text").text("\tWaiting for complete result set ...");
				return;
			}

			currentPosition=0;
			mapNodes.clear();
			mapSubgraphs.clear();
			mapRanks.clear();
			if (rootGraph && rootGraph.graph)
			{
				delete rootGraph.graph;
			}
		
			// check config
			xScrollbar = config[this.getPropertyNamespaceInfo().propertyNamespace + 'xScrollbar'] || "false";
			yScrollbar = config[this.getPropertyNamespaceInfo().propertyNamespace + 'yScrollbar'] || "false";
			zoomable = config[this.getPropertyNamespaceInfo().propertyNamespace + 'zoom'] || "false";
			graphvizEngine = config[this.getPropertyNamespaceInfo().propertyNamespace + 'engine'] || "dot";
			width = config[this.getPropertyNamespaceInfo().propertyNamespace + 'width'] || "";
			height = config[this.getPropertyNamespaceInfo().propertyNamespace + 'height'] || "";
			scale = config[this.getPropertyNamespaceInfo().propertyNamespace + 'scale'] || 1;
			fit = config[this.getPropertyNamespaceInfo().propertyNamespace + 'fit'] || "false";
			totalMemory	= config[this.getPropertyNamespaceInfo().propertyNamespace + 'totalMemory'] || 8388608; // 8 MB
			displayGraph = config[this.getPropertyNamespaceInfo().propertyNamespace + 'displayGraph'] || "false"; // 8 MB

			this.parseData(data);

			rootGraph.graph.sortMembers();
			graphDot=rootGraph.graph.toDot();
			if (displayGraph == "true")
				console.log(graphDot);
			
			
            // Clear the div
            this.$el.empty();
	
			if (xScrollbar == "true")
			{
				d3.select(this.el).style("overflow-x", "scroll");
			}
			else
			{
				d3.select(this.el).style("overflow-x", "hidden");
			}
			
			if (yScrollbar == "true")
			{
				d3.select(this.el).style("overflow-y", "scroll");
			}
			else
			{
				d3.select(this.el).style("overflow-y", "hidden");				
			}
  
			// Draw the graph
			graphvizGraph = d3.select(this.el)
			  .graphviz().engine(graphvizEngine);
			
			if (width != "")
				graphvizGraph.width(width);
			else
				graphvizGraph.width();

			if (height != "")
				graphvizGraph.height(height);
			else
				graphvizGraph.height();
				
			graphvizGraph.scale(scale).fit(fit=="true")/*.logEvents(true)*/.zoom(zoomable=="true").totalMemory(totalMemory)
				.renderDot(graphDot);
				
        },

        // Search data params
        getInitialDataParams: function() {
            return ({
                outputMode: SplunkVisualizationBase.ROW_MAJOR_OUTPUT_MODE,
                count: 10000
            });
        },

        // Override to respond to re-sizing events
        reflow: function() {},

		
    });
	
});
