import React, { useEffect, useState } from "react";
import backendServer from "../../webConfig";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, List, ListItem, ListItemText } from "@mui/material";
import AdminNavBar from "./AdminNavbar";

export default function Analytics() {
  const [topReviewdCompanies, setTopReviewdCompanies] = useState([]);
  const [topCompaniesAvRating, setTopCompaniesAvgRating] = useState([]);
  const [topSeekersAccpReviews, setTopSeekersAccpReviews] = useState([]);
  const [topCeoRating, setTopCeoRating] = useState([]);
  const [reviewsDay, setReviewsDay] = useState([]);

  const cardStyle = {
    display: "block",
    width: "500px",
    height: "300px",
    margin: "50px",
  };

  

  useEffect(() => {
    axios
      .get(`${backendServer}/admin/getTopFiveMostReviewedCompanies`)
      .then((res) => {
        setTopReviewdCompanies(res.data);
      });

    axios
      .get(`${backendServer}/admin/getTopFiveCompaniesAvgRating`)
      .then((res) => {
        setTopCompaniesAvgRating(res.data);
      });
    axios
      .get(`${backendServer}/admin/getTopFiveSeekersAccpReviews`)
      .then((res) => {
        setTopSeekersAccpReviews(res.data);
      });
    axios.get(`${backendServer}/admin/getTopTenCEORating`).then((res) => {
      setTopCeoRating(res.data);
    });
    axios.get(`${backendServer}/admin/getNumberOfReviewsPerDay`).then((res) => {
      setReviewsDay(res.data);
    });
  }, []);

  return (
    <div>
      <AdminNavBar />
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Card style={cardStyle}>
          <br />
          <h4 style={{ textAlign: "center" }}>
            Top 5 Mostly Reviewed Companies
          </h4>
          <CardContent>
            
            <List>

              {topReviewdCompanies.map((company) => {
               
                return (
                  <ListItem>
                    <ListItemText
                      primary={company.comp_name}
                      secondary={`${company.count_of_total_reviews} reviews posted`}
                    />
                  </ListItem>
                );
              })}
            </List>
          </CardContent>
        </Card>
        <Card style={cardStyle}>
          <br />
          <h4 style={{ textAlign: "center" }}>
            Top 5 Companies by Average Rating
          </h4>
          <CardContent>
            <List>
              {topCompaniesAvRating.map((company) => {
                return (
                  <ListItem>
                    <ListItemText
                      primary={company.comp_name}
                      secondary={company.avg_company_ratings.toFixed(1)}
                    />
                  </ListItem>
                );
              })}
            </List>
          </CardContent>
        </Card>
        <Card style={cardStyle}>
          <br />
          <h4 style={{ textAlign: "center" }}>Top 10 CEO based on rating</h4>
          <CardContent>
            <List>
              {topCeoRating.map((company) => {
                return (
                  <ListItem>
                    <ListItemText
                      primary={company.comp_ceo}
                      secondary={company.avg_ceo_ratings?.toFixed(1)}
                    />
                  </ListItem>
                );
              })}
            </List>
          </CardContent>
        </Card>
        <Card style={cardStyle}>
          <br />
          <h4 style={{ textAlign: "center" }}>Number of Reviews per Day </h4>
          <CardContent>
            <List>
              {reviewsDay.map((review) => {
                return (
                  <ListItem>
                    <ListItemText
                      primary={`Date: ${review.review_date}`}
                      secondary={review.count_of_total_reviews}
                    />
                  </ListItem>
                );
              })}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
