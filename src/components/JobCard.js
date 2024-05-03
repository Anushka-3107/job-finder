import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import Container from "@mui/material/Container";
import BoltIcon from "@mui/icons-material/Bolt";
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const JobCard = () => {
  const [jobs, setJobs] = useState();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // api rendering
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      limit: 10,
      offset: 0,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then((response) => response.json(console.log(response)))
      .then((result) => {
        if (Array.isArray(result.jdList)) {
          setJobs(result.jdList);
          console.log(result.jdList);
        } else {
          console.error("API response does not contain jdList array:", result);
        }
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, []);

  const toggleExpanded = (index) => {
    setExpanded(index === expanded ? null : index);
  };

  // this function capitalizes the first character
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <Container
        className="flex justify-center items-center"
        style={{ maxWidth: "100%", margin: "0 auto" }}
      >
    
        <Grid container spacing={5} className=" m-16 p-16">
          {jobs &&
            jobs.map((job, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    maxWidth: 345,
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                  style={{ borderRadius: "14px" }}
                >
                  <CardContent>
                    <Typography variant="h5" component="div">
                     {job.companyName}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {capitalizeFirstLetter(job.jobRole)}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {capitalizeFirstLetter(job.location)}
                   </Typography>

                   <Typography variant="subtitle2" color="text.secondary">
                      Estimated Salary : {job.salaryCurrencyCode}{" "}
                      {job.minJdSalary} - {job.maxJdSalary} LPA 
                    </Typography>
                    
                    <Typography variant="body2" paragraph>
                      <div className="pt-4">
                        About Company:
                        <Typography variant="body1" color="text.secondary">
                          <div className="mt-3 font-bold">
                            About Us
                            <Typography>
                              {expanded === index
                                ? job.jobDetailsFromCompany
                                : `${job.jobDetailsFromCompany.slice(0, 250)}${
                                    job.jobDetailsFromCompany.length > 250
                                      ? "..."
                                      : ""
                                  }`}
                            </Typography>
                          </div>
                        </Typography>
                      </div>
                    </Typography>

                    <div className=" flex justify-center items-center">
                      <Button
                        onClick={()=>toggleExpanded(index)}
                        className="flex items-center justify-center"
                      >
                        {expanded === index ? "View Less" : "View Job"}
                      </Button>
                    </div>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ marginTop: "10px" }}
                    >
                      {job.minExp ? (
                        <>
                          <Typography style={{ color: "gray" }}>
                            Minimum Experience
                          </Typography>
                          <div className="flex flex-col text-gray-700">
                            {job.minExp} years
                          </div>
                        </>
                      ) : (
                        " "
                      )}
                    </Typography>

                    <Button
                      variant="contained"
                      style={{
                        display: "block",
                        width: "100%",
                        margin: "0 auto",
                        marginTop: "10px",
                        backgroundColor: "#57DBA0",
                        color: "black",
                      }}
                    >
                      <Typography>
                        <BoltIcon style={{ color: "yellow" }} /> Easy Apply
                      </Typography>
                    </Button>

                    <Button
                      variant="contained"
                      style={{
                        display: "block",
                        width: "100%",
                        margin: "0 auto",
                        marginTop: "10px",
                        backgroundColor: "#4B57DB",
                        color: "white",
                      }}
                    >
                      <Typography>
                       Ask For Referral
                      </Typography>
                    </Button>

                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
};

export default JobCard;
