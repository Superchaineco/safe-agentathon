import { Box, Typography, CardContent, Card, Grid, Paper, Chip, SvgIcon } from '@mui/material'
import React from 'react'
import ArrowForward from '@/public/images/common/arrow-forward.svg'

type Action = {
  apy: number
  tokenInIcon: string
  tokenOutIcon: string
  actionType: 'deposit' | 'withdraw'
}

const mocks: Action[] = [
  {
    apy: 10,
    tokenInIcon: 'http://localhost:3000/tokens/0x0000000000000000000000000000000000000000.svg',
    tokenOutIcon: 'http://localhost:3000/tokens/0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85.svg',
    actionType: 'deposit',
  },
  {
    apy: 10,
    tokenInIcon: 'http://localhost:3000/tokens/0x0000000000000000000000000000000000000000.svg',
    tokenOutIcon: 'http://localhost:3000/tokens/0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85.svg',
    actionType: 'withdraw',
  },
  {
    apy: 10,
    tokenInIcon: 'http://localhost:3000/tokens/0x0000000000000000000000000000000000000000.svg',
    tokenOutIcon: 'http://localhost:3000/tokens/0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85.svg',
    actionType: 'deposit',
  },
  {
    apy: 10,
    tokenInIcon: 'http://localhost:3000/tokens/0x0000000000000000000000000000000000000000.svg',
    tokenOutIcon: 'http://localhost:3000/tokens/0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85.svg',
    actionType: 'withdraw',
  },
]

export default function RecentActions() {
  return (
    <Grid item container xs={12} spacing={2}>
      {mocks.map((mock, index) => (
        <Grid key={index} item xs={12} md={3}>
          <Paper style={{ padding: '4px', borderWidth: '1px' }} variant="outlined">
            <Card>
              <CardContent style={{ padding: '12px' }}>
                <Grid container gap={2}>
                  <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography color="GrayText" fontWeight={600} fontSize={16} variant="h6">
                      #{index + 1}
                    </Typography>
                    <Chip label={`${mock.apy}% APY`} color="default" />
                  </Grid>
                  <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                    <Typography textAlign="center" fontWeight={600} fontSize={16}>
                      {mock.actionType.toLocaleUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                    <Box display="flex" alignItems="center" gap={2}>
                      <img src={mock.tokenOutIcon} alt="token in" width={24} height={24} />
                      <SvgIcon component={ArrowForward} fontSize="large" inheritViewBox />
                      <img src={mock.tokenInIcon} alt="token out" width={24} height={24} />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}
