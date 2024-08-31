import React from "react";
import Plot from "react-plotly.js";
import { getData } from "../data/fetchData";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const PlotlyGraph = () => {
  const electricVehicleData = getData();

  // Bar Chart Data Preparation
  const countyCounts = electricVehicleData.reduce((acc, item) => {
    acc[item.County] = (acc[item.County] || 0) + 1;
    return acc;
  }, {});
  const counties = Object.keys(countyCounts);
  const counts = Object.values(countyCounts);

  // Pie Chart Data Preparation
  const vehicleTypeCounts = electricVehicleData.reduce((acc, item) => {
    acc[item["Electric Vehicle Type"]] =
      (acc[item["Electric Vehicle Type"]] || 0) + 1;
    return acc;
  }, {});
  const vehicleTypes = Object.keys(vehicleTypeCounts);
  const pieCounts = Object.values(vehicleTypeCounts);

  // Line Chart Data Preparation
  const rangesByYear = electricVehicleData.reduce((acc, item) => {
    if (!acc[item["Model Year"]]) {
      acc[item["Model Year"]] = { totalRange: 0, count: 0 };
    }
    acc[item["Model Year"]].totalRange += item["Electric Range"];
    acc[item["Model Year"]].count += 1;
    return acc;
  }, {});
  const years = Object.keys(rangesByYear).sort();
  const avgRanges = years.map(
    (year) => rangesByYear[year].totalRange / rangesByYear[year].count
  );

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* Line Chart Card */}
          <Card className="border">
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Average Electric Range by Model Year
              </Typography>
              <hr />
              <Plot
                responsive={true}
                displaylogo={false}
                displayModeBar={true}
                modeBarButtonsToRemove={["select2d", "lasso2d"]}
                data={[
                  {
                    x: years,
                    y: avgRanges,
                    type: "scatter",
                    mode: "lines+markers",
                    marker: { color: "green" },
                  },
                ]}
                layout={{
                  //   title: "Average Electric Range by Model Year",
                  xaxis: { title: "Model Year" },
                  yaxis: { title: "Average Electric Range (miles)" },
                  autosize: true,
                }}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          {/* Bar Chart Card */}
          <Card className="border">
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Electric Vehicle Count by County
              </Typography>
              <hr />
              <Plot
                responsive={true}
                displaylogo={false}
                displayModeBar={true}
                modeBarButtonsToRemove={["select2d", "lasso2d"]}
                data={[
                  {
                    x: counties,
                    y: counts,
                    type: "bar",
                    marker: { color: "orange" },
                  },
                ]}
                layout={{
                  //   title: "Electric Vehicle Count by County",
                  xaxis: { title: "County" },
                  yaxis: { title: "Number of Vehicles" },
                  autosize: true,
                }}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          {/* Pie Chart Card */}
          <Card className="border">
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Distribution of Electric Vehicle Types
              </Typography>
              <hr />
              <Plot
                responsive={true}
                displaylogo={false}
                displayModeBar={true}
                modeBarButtonsToRemove={["select2d", "lasso2d"]}
                data={[
                  {
                    values: pieCounts,
                    labels: vehicleTypes,
                    type: "pie",
                    textinfo: "label+percent",
                    insidetextorientation: "radial",
                  },
                ]}
                layout={{
                  //   title: "Distribution of Electric Vehicle Types",
                  autosize: true,
                }}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default PlotlyGraph;
