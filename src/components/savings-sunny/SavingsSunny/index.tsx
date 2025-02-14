import { Box, Button, Container, Grid, Paper, Tab, Tabs, Typography } from '@mui/material'
import css from './styles.module.css'
import React, { useState } from 'react'
import { TxLayoutHeader } from '@/components/tx-flow/common/TxLayout'
import TxCard from '@/components/tx-flow/common/TxCard'
import Stats from './Stats'
import Actions from './Actions'
import RecentActions from './RecentActions'
import useIsSunnyAgentSettled from '@/hooks/super-chain/useIsSunnyAgentSettled'

export default function SavingsSunny() {
  const [activeTab, setActiveTab] = useState(0)
  const { data: isSunnyAgentSettled } = useIsSunnyAgentSettled()
  const [toggle, setToggle] = useState(isSunnyAgentSettled ? 'on' : 'off')

  return (
    <Container className={css.container}>
      <Grid container gap={1} justifyContent="center">
        <Grid item xs={12} md={10}>
          <Box display="flex" gap={2} className={css.titleWrapper}>
            <Typography data-testid="modal-title" variant="h3" component="div" fontWeight="700" className={css.title}>
              Sunny Agent
            </Typography>
            <Box color="#0000001f" display="flex" gap={1}>
              <Button
                onClick={() => setToggle('on')}
                size="small"
                variant="outlined"
                color={toggle === 'on' ? 'success' : 'inherit'}
              >
                ON
              </Button>
              <Button
                onClick={() => setToggle('off')}
                size="small"
                variant="outlined"
                color={toggle === 'off' ? 'error' : 'inherit'}
              >
                OFF
              </Button>
            </Box>
          </Box>

          <Paper data-testid="modal-header" className={css.header}>
            <TxLayoutHeader
              icon={undefined}
              subtitle={
                <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
                  <Tab label="Stats" />
                  <Tab label="Actions" />
                  {/* <Tab label="Settings" /> */}
                </Tabs>
              }
              hideNonce={true}
            />
          </Paper>
          <div className={css.step}>
            <TxCard>
              <Grid container justifyContent="center" alignItems="center" spacing={2} direction="row">
                {activeTab === 0 && <Stats />}
                {activeTab === 1 && <Actions />}
              </Grid>
            </TxCard>
          </div>
        </Grid>
        <Grid item xs={12} md={10}>
          <Paper data-testid="modal-header" className={css.header}>
            <TxLayoutHeader
              icon={undefined}
              subtitle={
                <Typography variant="h3" fontWeight="600">
                  Recent Actions
                </Typography>
              }
              hideNonce={true}
            />
          </Paper>
          <div className={css.step}>
            <TxCard>
              <RecentActions />
            </TxCard>
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}
