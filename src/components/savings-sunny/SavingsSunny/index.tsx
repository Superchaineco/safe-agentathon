import { Container, Grid, Paper, Typography } from '@mui/material'
import css from './styles.module.css'
import React from 'react'
import { TxLayoutHeader } from '@/components/tx-flow/common/TxLayout'
import TxCard from '@/components/tx-flow/common/TxCard'

export default function ActivateSavingSunny
  () {
  return (
    <Container className={css.container}>
      <Grid container gap={3} justifyContent="center">
        {/* Main content */}
        <Grid item xs={12} md={7}>
          <div className={css.titleWrapper}>
            <Typography data-testid="modal-title" variant="h3" component="div" fontWeight="700" className={css.title}>
              Activate Sunny Agent
            </Typography>
          </div>

          <Paper data-testid="modal-header" className={css.header}>
            <TxLayoutHeader icon={undefined} subtitle="" hideNonce={true} />
          </Paper>
          <div className={css.step}>
            <TxCard>
              <Grid container justifyContent="center" alignItems="center" spacing={2} columns={20} direction="row">
                <Grid xs={8} item>
                </Grid>
              </Grid>


              {/* <CardActions style={{ margin: 0 }}> */}
              {/*   <Button onClick={handleSubmit} disabled={!isChanged} variant="contained" color="secondary"> */}
              {/*     <Typography color="white">Save</Typography> */}
              {/*     <SvgIcon sx={{ marginLeft: 1 }} inheritViewBox component={Save} /> */}
              {/*   </Button> */}
              {/* </CardActions> */}
            </TxCard>
          </div>
        </Grid>

      </Grid>
    </Container>
  )
}

