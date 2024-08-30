import React, { useEffect, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Dashboard = () => {
  const [data, setData] = useState([]); // State to hold data from JSON
  const [columns, setColumns] = useState([]); // State to hold column definitions

  useEffect(() => {
    // Dynamically import the JSON data file
    import("../data/csvjson.json").then((jsonData) => {
      setData(jsonData); // Set the imported data to the state

      // Dynamically generate column definitions based on the JSON keys
      const generatedColumns = Object.keys(jsonData[0]).map((key) => ({
        accessorKey: key,
        header: key,
        size: 150,
      }));
      setColumns(generatedColumns);
    });
  }, []);

  const tableInstance = useMaterialReactTable({
    columns,
    data,
  });

  const theme = createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: "1px solid rgba(224, 224, 224, 1)",
            backgroundColor: "#fff", // Custom background color for table cells
          },
          head: {
            backgroundColor: "#fff", // Custom header background color
            color: "#000", // Header text color
            fontWeight: "bold",
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:nth-of-type(odd)": {
              backgroundColor: "#fff", // Alternate row color
              color: "#000", // Alternate row text color
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: 2 }}>
        {data.length > 0 ? ( // Check if data is loaded before rendering the table
          <MaterialReactTable
            table={tableInstance}
            enableColumnFilters={true}
            enableGlobalFilter={true}
            enableShowHide={false}
            enableRowSelection
            globalFilterFn="includesString"
            enableColumnFilterModes={false}
            enableColumnOrdering
            enableColumnPinning={true}
            sx={{
              "& .MuiTableRow-root": {
                "&:hover": {
                  backgroundColor: "#054992", // Row hover effect
                },
              },
              "& .MuiTableCell-root": {
                color: "#424242", // Custom cell text color
              },
            }}
          />
        ) : (
          <div>Loading data...</div>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
