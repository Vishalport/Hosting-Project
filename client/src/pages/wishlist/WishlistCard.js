import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

export default function WishlistCard({ item }) {
  return (
    <Card sx={{ maxWidth: '100%', marginBottom: '20px'}} className="transform transition duration-200 hover:scale-105">
    <Link to={`/properties/${item.id}`}>

      <CardActionArea>
        <CardMedia
          component="img"
          // height="500" 
          image={item.image}
          alt={item.name}
          // className="rounded-2xl object-cover aspect-square"
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name} 
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography> */}
        </CardContent>
      </CardActionArea>
      </Link>
    </Card>
  );
}
