import React from "react";
import styles from "./Tester.styles";
import { Box, Typography } from '@mui/material';

const TesterComponent = ({ t }) => {
  return (
    <Box sx={styles.wrapper}>
      <Typography variant="body">{t("Tester Component")}</Typography>
    </Box>
  );
};

export default TesterComponent;
