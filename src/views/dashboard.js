import React, { useEffect, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_TablePagination,
} from "material-react-table";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import { WrapText } from "@mui/icons-material";
const pagination_style = {
  flexGrow: 1,
  display: "flex",
  justifyContent: "center",
  marginLeft: "18%",
};

const box_bottom_styles = {
  display: "flex",
  alignItems: "center", // Corrected to "alignItems"
  marginLeft: "10px",
  minWidth: "10px !important",
  width: "100%",
  justifyContent: "space-between",
};
const DataTable = () => {
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
        filterVariant: "select", // Makes the filter a dropdown
      }));
      setColumns(generatedColumns);
    });
  }, []);

  const tableInstance = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    columnFilterDisplayMode: "subheader",
    positionToolbarAlertBanner: "center",
    enableDensityToggle: false,
    enableStickyHeader: true,
    enablePaginationSticky: true, // Custom prop to make pagination sticky
    muiTableContainerProps: { sx: { maxHeight: "500px" } },
    enableColumnActions: false,
    enableRowVirtualization: true, // Enable virtualization
    rowVirtualizerOptions: { overscan: 50 },

    state: {
      showGlobalFilter: true,
    },
    initialState: {
      showColumnFilters: false,
      density: "compact",
    },
    sx: {
      "& .MuiTableRow-root": {
        "&:hover": {
          backgroundColor: "#054992", // Row hover effect
        },
      },
      "& .MuiTableCell-root": {
        color: "#424242", // Custom cell text color
      },
      "& .MuiTablePagination-root": {
        position: "sticky", // Make pagination sticky
        bottom: 0, // Stick pagination to the bottom
        backgroundColor: "#fff", // Background color to prevent overlap
        zIndex: 1, // Ensure it stays above the scrollable content
      },
    },

    muiPaginationProps: {
      rowsPerPageOptions: [10, 20, 50, 100, 200, 500],
      showFirstButton: false,
      showLastButton: false,
      sx: {
        position: "sticky", // Make pagination sticky
        bottom: 0, // Stick pagination to the bottom
        backgroundColor: "#fff", // Background color to prevent overlap
        zIndex: 1, // Ensure it stays above the scrollable content
      },
    },
  });

  const theme = createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: "1px solid rgba(224, 224, 224, 1)",
            backgroundColor: "#fff", // Custom background color for table cells
            whiteSpace: "nowrap", // Prevent header text from wrapping
            overflow: "hidden", // Hide overflow text
            textOverflow: "ellipsis",
          },
          head: {
            backgroundColor: "#054992", // Custom header background color
            color: "#fff", // Header text color
            fontWeight: "bold",
            position: "sticky", // Make the header sticky
            top: 0,
            zIndex: 1, // Ensure it stays above the scrollable content
            whiteSpace: "nowrap", // Prevent header text from wrapping
            overflow: "hidden", // Hide overflow text
            textOverflow: "ellipsis", // Show ellipsis for overflowed text
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:nth-of-type(odd)": {
              backgroundColor: "#054992", // Alternate row color
              color: "#000", // Alternate row text color
            },
          },
        },
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <MaterialReactTable
          table={tableInstance}
          memoMode="cells"
          enableFacetedValues
          sx={{
            "& .MuiTableRow-root": {
              "&:hover": {
                backgroundColor: "#054992", // Row hover effect
              },
            },
            "& .MuiTableCell-root": {
              color: "#424242", // Custom cell text color
            },
            "& .MuiTablePagination-root": {
              position: "sticky", // Make pagination sticky
              bottom: 0, // Stick pagination to the bottom
              backgroundColor: "#fff", // Background color to prevent overlap
              zIndex: 1, // Ensure it stays above the scrollable content
            },
          }}
          enablePagination={true}
          renderBottomToolbar={({ table }) => {
            return (
              <Box sx={box_bottom_styles}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                ></Box>
                <Box sx={pagination_style}>
                  <MRT_TablePagination table={table} />
                </Box>
              </Box>
            );
          }}
          enableColumnResizing
          columnResizeMode="onEnd"
          muiTableProps={{
            sx: {
              tableLayout: "fixed",
              overflow: "auto", // Enables scrolling for the table body
              maxHeight: "calc(100vh - 300px)", // Adjust this value based on your layout
              width: "100%", // Ensures table takes full width
            },
          }}
          enableFullScreenToggle={false}
          enableGlobalFilter={true}
          enableShowHide={false}
          globalFilterFn="myCustomFilterFn"
          enableColumnFilterModes={false}
          enableColumnOrdering
          enableColumnPinning={true}
          muiSearchTextFieldProps={{
            placeholder: "Search Column Options",
            sx: { minWidth: "14rem" },
            variant: "outlined",
          }}
          positionGlobalFilter="right"
          positionToolbarDropZone="none"
          positionToolbarAlertBanner="center"
          toolbarButtonAlignment="left"
          renderTopToolbarCustomActions={({ table }) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "10px",
                  minWidth: "114px",
                }}
              >
                Load More Data
              </Box>
            );
          }}
          muiTableHeadCellProps={{
            sx: {
              background: "#00539E",
              color: "#FFFFFF",
              fontSize: "0.65rem",
              padding: "2px 8px",
            },
          }}
          muiTableBodyCellProps={{
            sx: {
              borderRight: "2px solid #80808066",
              opacity: 0.1,
              padding: "2px 8px",
              fontSize: "0.65rem",
              cursor: "pointer",
              whiteSpace: "normal",
              wordWrap: "break-word",
            },
          }}
          muiTableBodyProps={{
            sx: {
              "& tr:nth-of-type(even)": {
                backgroundColor: "#F7F7F7",
              },
            },
          }}
          muiTopToolbarProps={{
            sx: {
              minHeight: "32px !important",
              maxHeight: "35px !important",
            },
          }}
          muiTableContainerProps={{
            sx: {
              minHeight: "75vh",
              "@media (min-height: 1024px)": {
                minHeight: "82vh",
              },
            },
          }}
        />
      </ThemeProvider>
    </>
  );
};

export default DataTable;
