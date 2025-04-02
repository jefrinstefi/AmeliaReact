import React, { useEffect } from "react";
import * as d3 from "d3";
const conversation = [
     {
             "speaker": "Amelia",
             "message": "Hi, I'm Amelia, your Celebrity Center Visionworks assistant. I can provide order statuses, schedule appointments, and more.. This conversation will be recorded for quality and training purposes.",
             "timestamp": 1740581933.427,
             "sentiment": "",
             "understood": true
           },
           {
             "speaker": "Amelia",
             "message": "<prosody rate='90%' pitch='-2st'>One moment please.</prosody>",
             "timestamp": 1740581934.155,
             "sentiment": "",
             "understood": true
           },
           {
             "speaker": "Amelia",
             "message": "<prosody rate='90%' pitch='-2st'>Am I speaking with Bruce?</prosody>",
             "timestamp": 1740581934.716,
             "sentiment": "",
             "understood": true
           },
           {
             "speaker": "User",
             "message": "yes",
             "timestamp": 1740581952.126,
             "sentiment": "NEUTRAL",
             "understood": true
           },
           {
             "speaker": "Amelia",
             "message": "Thank you, I now have all the information I need to assist you.",
             "timestamp": 1740581952.854,
             "sentiment": "",
             "understood": true
           },
           {
             "speaker": "Amelia",
             "message": "<prosody rate='90%' pitch='-2st'>How can I help you today?</prosody>",
             "timestamp": 1740581953.024,
             "sentiment": "",
             "understood": true
           },
           {
             "speaker": "User",
             "message": "what time do you open",
             "timestamp": 1740581963.321,
             "sentiment": "NEUTRAL",
             "understood": true
           },
           {
             "speaker": "Amelia",
             "message": "The store is open from 10:00 AM - 06:00 PM today.",
             "timestamp": 1740581964.509,
             "sentiment": "",
             "understood": true
           },
           {
             "speaker": "Amelia",
             "message": "Would you like to know any other day's hours?",
             "timestamp": 1740581964.538,
             "sentiment": "",
             "understood": true
           },
           {
             "speaker": "User",
             "message": "what time are you in Southlands",
             "timestamp": 1740581976.376,
             "sentiment": "NEUTRAL",
             "understood": true
           },
           {
             "speaker": "Amelia",
             "message": "I was expecting answers such as a valid day, no, yes, or location. What is your choice?",
             "timestamp": 1740581977.131,
             "sentiment": "",
             "understood": true
           },
           {
             "speaker": "User",
             "message": "are you in Southlands",
             "timestamp": 1740581989.054,
             "sentiment": "NEUTRAL",
             "understood": true
           },
           {
             "speaker": "Amelia",
             "message": "It looks like you need more assistance. Let me transfer you to someone who can help.",
             "timestamp": 1740581990.461,
             "sentiment": "",
             "understood": true
           },
           {
             "speaker": "Amelia",
             "message": "Please give me a moment while I contact someone else to assist you.",
             "timestamp": 1740581990.599,
             "sentiment": "",
             "understood": true
           },
           {
             "speaker": "Amelia",
             "message": "This conversation has been closed.",
             "timestamp": 1740582000.195,
             "sentiment": "",
             "understood": true
           }
]
const ConversationFlowchart = ({  }) => {
  useEffect(() => {
    const width = 2000;
    const height = 800;

    d3.select("#flowchart").selectAll("*").remove();

    const svg = d3.select("#flowchart")
      .attr("width", width)
      .attr("height", height);

    const links = conversation.map((_, i) => (i > 0 ? { source: i - 1, target: i } : null)).filter(Boolean);
    const nodes = conversation.map((entry, i) => ({
      id: i,
      label: `${entry.speaker}: ${entry.message.substring(0, 25)}...`,
      color: entry.speaker === "Amelia" ? "#87CEFA" : "#98FB98"
    }));

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide(50));

    const link = svg.selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", "#999")
      .attr("stroke-width", 2);

    const node = svg.selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("r", 30)
      .attr("fill", d => d.color)
      .attr("stroke", "#555")
      .attr("stroke-width", 2)
      .call(d3.drag()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }));

    const text = svg.selectAll("text")
      .data(nodes)
      .enter().append("text")
      .attr("dy", 5)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "#333")
      .text(d => d.label);

    simulation.on("tick", () => {
      link.attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node.attr("cx", d => d.x)
        .attr("cy", d => d.y);

      text.attr("x", d => d.x)
        .attr("y", d => d.y - 35);
    });
  }, [conversation]);

  return <svg id="flowchart" style={{ border: "1px solid #ccc" }}></svg>;
};

export default ConversationFlowchart;