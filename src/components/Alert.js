import { AlertTitle, Box, Collapse } from "@mui/material";

const Alert = (props) => {
    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Collapse>
                    <Alert severity="success" onClose={() => props.open}>
                        <AlertTitle>Success</AlertTitle>
                        Your Event Saved — <strong>check it out!</strong>
                    </Alert>
                </Collapse>
            </Box>
        </>
    );
}

export default Alert;