import { Box, Typography } from "@mui/material"

export default function Footer() {
    return (
        <Box component="footer" display="flex" alignItems="center" width={1} height={25} sx={{
        bgcolor: "primary.main",
        justifyContent: "center",
        position: "fixed",
        bottom: 0,
        left: 0,
        "&:hover": {
            bgcolor: "primary.dark"
        },
        transition: "0.15s ease-in-out"}}>
            <Typography variant="caption" sx={{color: "white", fontWeight: "bold"}}>
                Tamás László
            </Typography>
        </Box>
    )
}