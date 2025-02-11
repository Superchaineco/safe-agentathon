import { Box, Typography, Card, CardContent, Paper, Grid } from '@mui/material'
import sharedCss from '@/components/tx/security/shared/styles.module.css'
import React from 'react'

export default function Actions() {
  return (
    <Grid item container xs={12} spacing={2}>
      <Grid item xs={12} md={6}>
        <Paper className={sharedCss.wrapper} variant="outlined">
          <Card>
            <CardContent></CardContent>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  )
}
