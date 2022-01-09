// get both selectors
const firstSelect = document.getElementById("first-select")
const secondSelect = document.getElementById("second-select")

// based on: https://developers.google.com/web/updates/2015/03/introduction-to-fetch
fetch('/properties')
    .then(
        function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            // Examine the text in the response
            response.json().then(function (data) {
                // filter out id and name
                data = data.filter((property) => {
                    if (property !== "id" && property !== "name") {
                        // populate first select
                        let opt = document.createElement('option');
                        opt.value = property;
                        opt.innerHTML = property;
                        firstSelect.appendChild(opt);

                        // populate second select
                        let opt2 = document.createElement('option');
                        opt2.value = property;
                        opt2.innerHTML = property;
                        secondSelect.appendChild(opt2)

                        return property
                    }
                })
                // update both vis
                updateFirst(data[0])
                updateSecond(data[0])
            });
        }
    )
    .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });

// update first vis whenever first select changes
firstSelect.onchange = (e) => {
    let property = e.target.value
    updateFirst(property)
}

// update second vis whenever second select changes
secondSelect.onchange = (e) => {
    let property = e.target.value
    updateSecond(property)
}

// based on: https://www.d3-graph-gallery.com/graph/barplot_button_data_csv.html

// set the dimensions and margins of the first graph
const margin = { top: 30, right: 30, bottom: 70, left: 60 },
    width = 500 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

// append the first svg object to the body of the page
const svg = d3.select("#first-vis")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Initialize the first X axis
const x = d3.scaleBand()
    .range([0, width])
    .padding(0.2);
const xAxis = svg.append("g")
    .attr("transform", `translate(0,${height})`);

// Initialize the first Y axis
const y = d3.scaleLinear()
    .range([height, 0]);
const yAxis = svg.append("g")
    .attr("class", "myYaxis");

// update function for the first vis
function updateFirst(selectedVar) {

    // Parse the Data
    d3.csv("./data/world_data.csv").then(function (data) {

        // sort the data alphabetically based on names (decending like in the example vid)
        // based on: https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
        data.sort(function (a, b) {
            if (a.name > b.name) { return -1; }
            if (a.name < b.name) { return 1; }
            return 0;
        })

        // X axis
        x.domain(data.map(d => d.name));
        xAxis.transition().duration(1000).call(d3.axisBottom(x));

        // based on: https://bl.ocks.org/d3noob/f440abbc6c813af035f30be2aa723e6d
        xAxis.selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");

        // Add Y axis
        y.domain([d3.min(data, d => +d[selectedVar]), d3.max(data, d => +d[selectedVar])]);
        yAxis.transition().duration(1000).call(d3.axisLeft(y));

        // variable u: map data to existing bars
        const u = svg.selectAll("rect")
            .data(data)

        // update bars
        u.join("rect")
            .transition()
            .duration(1000)
            .attr("x", d => x(d.name))
            .attr("y", d => y(+d[selectedVar]))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(+d[selectedVar]))
            .attr("fill", "#69b3a2")
            .attr("cursor", "pointer")
            // add name for active state function
            .attr("name", d => d.name)

        // toggle css class for named elements based on hover state
        svg.selectAll("rect")
            .on("mouseover", (event, d) => {
                document.getElementsByName(d.name).forEach(element => {
                    element.classList.add("active")
                })
            })
            .on("mouseout", (event, d) => {
                document.getElementsByName(d.name).forEach(element => {
                    element.classList.remove("active")
                })
            })
    })
}

// based on: https://www.d3-graph-gallery.com/graph/barplot_button_data_csv.html

// set the dimensions and margins of the second graph
const margin2 = { top: 30, right: 30, bottom: 70, left: 60 },
    width2 = 500 - margin2.left - margin2.right,
    height2 = 200 - margin2.top - margin2.bottom;

const svg2 = d3.select("#second-vis")
    .append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
    .append("g")
    .attr("transform", `translate(${margin2.left},${margin2.top})`)

// Initialize the second X axis
const x2 = d3.scaleBand()
    .range([0, width2])
    .padding(0.2);
const xAxis2 = svg2.append("g")
    .attr("transform", `translate(0,${height2})`);

// Initialize the second Y axis
const y2 = d3.scaleLinear()
    .range([height2, 0]);
const yAxis2 = svg2.append("g")
    .attr("class", "myYaxis");

// update function for the second vis
function updateSecond(selectedVar) {

    // Parse the Data
    d3.csv("./data/world_data.csv").then(function (data) {

        // sort the data alphabetically based on names (decending like in the example vid)
        // based on: https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
        data.sort(function (a, b) {
            if (a.name > b.name) { return -1; }
            if (a.name < b.name) { return 1; }
            return 0;
        })

        // X axis
        x2.domain(data.map(d => d.name));
        xAxis2.transition().duration(1000).call(d3.axisBottom(x2));

        // based on: https://bl.ocks.org/d3noob/f440abbc6c813af035f30be2aa723e6d
        xAxis2.selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");

        // Add Y axis
        y2.domain([d3.min(data, d => +d[selectedVar]), d3.max(data, d => +d[selectedVar])]);
        yAxis2.transition().duration(1000).call(d3.axisLeft(y2));

        // variable u: map data to existing bars
        const u = svg2.selectAll("rect")
            .data(data)

        // update bars
        u.join("rect")
            .transition()
            .duration(1000)
            .attr("x", d => x2(d.name))
            .attr("y", d => y2(+d[selectedVar]))
            .attr("width", x2.bandwidth())
            .attr("height", d => height2 - y2(+d[selectedVar]))
            .attr("fill", "#69b3a2")
            .attr("cursor", "pointer")
            // add name for active state function
            .attr("name", d => d.name)

        // toggle css class for named elements based on hover state
        svg2.selectAll("rect")
            .on("mouseover", (event, d) => {
                document.getElementsByName(d.name).forEach(element => {
                    element.classList.add("active")
                })
            })
            .on("mouseout", (event, d) => {
                document.getElementsByName(d.name).forEach(element => {
                    element.classList.remove("active")
                })
            })
    })
}