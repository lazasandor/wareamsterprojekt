import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import StoragesService from "../services/StoragesService";
import LinearProgress from "@mui/joy/LinearProgress";

const StorageCards = () => {
  const [storages, setStorages] = useState([]);
  const [sums, setSums] = useState([]);

  useEffect(() => {
    const loadStoragesAndSums = async () => {
      try {
        const storageResponse = await StoragesService.getAll();
        const sumResponse = await StoragesService.getSums();
        setStorages(storageResponse.data || []);
        setSums(sumResponse.data || []);
      } catch (error) {
        console.error("Error loading storages and sums:", error);
      }
    };
    loadStoragesAndSums();
  }, []);

  const styles = {
    card: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {storages.map((storage, index) => (
          <Card
            key={index}
            sx={{ maxWidth: 270, height: "auto", margin: 4 }}
            variant="outlined"
          >
            <CardMedia
              sx={{ height: "280" }}
              component={"img"}
              image={`/${index + 1}.jpg`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {storage.city}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {storage.zipcode} {storage.county} {storage.address}
                <br />
                <strong
                  style={{
                    color:
                      sums[index] / storage.capacity >= 0.85
                        ? "red"
                        : sums[index] / storage.capacity >= 0.75
                        ? "orange"
                        : "green",
                  }}
                >
                  Capacity {sums[index]} / {storage.capacity} |{" "}
                  {Math.round((sums[index] / storage.capacity) * 100)}%
                </strong>
              </Typography>
              <LinearProgress
                sx={{ marginTop: 1, background: "grey" }}
                determinate
                value={(sums[index] / storage.capacity) * 100}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StorageCards;
