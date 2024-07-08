/* eslint-disable react/prop-types */
import { Typography } from "@mui/material"

export default function Headline({text}){
    return (
        <Typography variant="h3" sx={{color: "primary.main", fontWeight: "bold", p: 2}}>
            {text}
        </Typography>
    )
}