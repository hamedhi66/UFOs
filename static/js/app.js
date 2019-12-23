// import the data from data.js
const tableData = data;
// Reference the HTML table using d3
var tbody = d3.select("tbody");

function buildTable(data) {
    tbody.html("");
 // Next, loop through each object in the data
 // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
        let row = tbody.append("tr");
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);

        });

    });

}

// function handleClick() {
//     let date = d3.select("#datetime").property("value");
//     let filteredData = tableData;
//     if (date) {
//         filteredData = filteredData.filter(row => row.datetime === date);
//     };
//     // Rebuild the table using the filtered data
//     // @NOTE: If no date was entered, then filteredData will
//     // just be the original tableData.
//     buildTable(filteredData);
// }

// d3.select("#filter-btn").on("click", handleClick);


// Keep track of all filters
var filters = {};

// This function will replace your handleClick function
function updateFilters() {

  // Save the element, value, and id of the filter that was changed
    let challenge =d3.select( this)
    let filteredDataNew = challenge.property("value")
    let filteredDataNew2 = challenge.attr("id")

  // If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object
    if (filteredDataNew) {
        filters[filteredDataNew2]=filteredDataNew
    }
    else {
        delete filters[filteredDataNew2]
    }
  // Call function to apply all filters and rebuild the table
  filterTable();
}

function filterTable() {

  // Set the filteredData to the tableData
    let filteredData=tableData;
  // Loop through all of the filters and keep any data that
  // matches the filter values
    Object.entries(filters).forEach(([key,value]) =>
    {
        filteredData = filteredData.filter(row => row[key] === value)
    });
  // Finally, rebuild the table using the filtered Data
    buildTable(filteredData);
}

// Attach an event to listen for changes to each filter
// Hint: You'll need to select the event and what it is listening for within each set of parenthesis
d3.selectAll("input").on("change",updateFilters);

// Build the table when the page loads

buildTable(tableData);