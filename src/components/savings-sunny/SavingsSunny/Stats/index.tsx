import { Box, Typography, Card, CardContent, Paper, Grid } from '@mui/material'
import sharedCss from '@/components/tx/security/shared/styles.module.css'
import React from 'react'

export default function Stats() {
  return (
    <Grid item container xs={12} spacing={2}>
      <Grid item xs={12} md={6}>
        <Paper className={sharedCss.wrapper} variant="outlined">
          <Card>
            <CardContent>
              <Box>
                <Typography color="GrayText" fontWeight={600} fontSize={16} variant="h6">
                  Lifetime savings
                </Typography>
              </Box>
              <Typography fontWeight={600} fontSize={44} variant="h6">
                $112,50
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper className={sharedCss.wrapper} variant="outlined">
          <Card>
            <CardContent>
              <Box>
                <Typography color="GrayText" fontWeight={600} fontSize={16} variant="h6">
                  Sunny Transactions
                </Typography>
              </Box>
              <Typography fontWeight={600} fontSize={44} variant="h6">
                45
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  )
}
