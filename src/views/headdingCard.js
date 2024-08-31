import React from "react";
import { Card, CardContent, Typography, Grid, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

// Define styled components with vibrant dark colors
const StyledCard = styled(Card)(({ theme, bgcolor }) => ({
  margin: theme.spacing(1),
  textAlign: "center",
  backgroundColor: bgcolor,
  color: "#fff", // Ensure text is white for good contrast
  height: "100%", // Ensure cards stretch to fill grid item height
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: "#fff", // Set divider color to white
}));

const BEVStats = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={3}>
        <StyledCard bgcolor="#2E3B55">
          {" "}
          {/* Dark Blue */}
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              BEV Sales Growth
            </Typography>
            <Typography variant="h6" component="div" gutterBottom>
              +50% YoY
            </Typography>
            <StyledDivider sx={{ my: 2 }} /> {/* White Divider */}
            <Typography variant="body2" paragraph>
              BEV sales during Q2 2023 grew over 50% year-over-year.
            </Typography>
          </CardContent>
        </StyledCard>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StyledCard bgcolor="#3F6C6D">
          {" "}
          {/* Teal Green */}
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Market Share
            </Typography>
            <Typography variant="h6" component="div" gutterBottom>
              10%
            </Typography>
            <StyledDivider sx={{ my: 2 }} /> {/* White Divider */}
            <Typography variant="body2" paragraph>
              One in every 10 cars sold during Q2 2023 was a pure battery
              electric vehicle (BEV).
            </Typography>
          </CardContent>
        </StyledCard>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StyledCard bgcolor="#4A4E69">
          {" "}
          {/* Slate Gray */}
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Top BEV Markets
            </Typography>
            <Typography variant="h6" component="div" gutterBottom>
              China, USA, Germany
            </Typography>
            <StyledDivider sx={{ my: 2 }} /> {/* White Divider */}
            <Typography variant="body2" paragraph>
              China remains the leader in global BEV sales followed by USA and
              Germany.
            </Typography>
          </CardContent>
        </StyledCard>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StyledCard bgcolor="#6C5B7B">
          {" "}
          {/* Dark Purple */}
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              USA Sales Growth
            </Typography>
            <Typography variant="h6" component="div" gutterBottom>
              +57% YoY
            </Typography>
            <StyledDivider sx={{ my: 2 }} /> {/* White Divider */}
            <Typography variant="body2" paragraph>
              BEV sales in the USA grew by almost 57% YoY, the highest among the
              top 3 EV markets.
            </Typography>
          </CardContent>
        </StyledCard>
      </Grid>
    </Grid>
  );
};

export default BEVStats;
