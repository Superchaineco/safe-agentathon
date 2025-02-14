import {
  CircularProgress,
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  CardContent,
  Card,
} from '@mui/material'
import { FiberManualRecord } from '@mui/icons-material'
import React, { useState, useContext } from 'react'
import css from './styles.module.css'
import { TxLayoutHeader } from '@/components/tx-flow/common/TxLayout'
import TxCard from '@/components/tx-flow/common/TxCard'
import useSuperChainAccount from '@/hooks/super-chain/useSuperChainAccount'
import { createEthersAdapter } from '@/hooks/coreSDK/safeCoreSDK'
import { assertWalletChain } from '@/services/tx/tx-sender/sdk'
import useWallet from '@/hooks/wallets/useWallet'
import useSafeInfo from '@/hooks/useSafeInfo'
import Safe from '@safe-global/protocol-kit'
import { createWeb3 } from '@/hooks/wallets/web3'
import { useQueryClient } from '@tanstack/react-query'
import { TxModalContext } from '@/components/tx-flow'
import SavingsSunny from '../SavingsSunny'
import axios from 'axios'
import { SUNNY_AGENT_BACKEND } from '@/features/superChain/constants'
export default function ActivateSavingSunny() {
  const [isLoading, setIsLoading] = useState(false)
  const { getWritableSafeContract, publicClient } = useSuperChainAccount()
  const queryClient = useQueryClient()
  const wallet = useWallet()
  const { safe, safeAddress } = useSafeInfo()
  const { setTxFlow } = useContext(TxModalContext)
  const handleGrantPermission = async () => {
    if (isLoading) return
    setIsLoading(true)
    try {
      const _wallet = await assertWalletChain(wallet!, safe.chainId)
      const provider = createWeb3(_wallet.provider)

      const ethAdapter = await createEthersAdapter(provider)
      // const tx = await safeContract?.write.enableModule(['0xde8f89B6d11fc6894C98A37458c0149787F051AE'])
      const protocolKit = await Safe.create({
        ethAdapter,
        safeAddress: safe.address.value,
      })
      const tx = await protocolKit.createEnableModuleTx('0xde8f89B6d11fc6894C98A37458c0149787F051AE')
      if (!tx) {
        setIsLoading(false)
        return
      }
      const txHash = await protocolKit.executeTransaction(tx)
      await axios.post(`${SUNNY_AGENT_BACKEND}/register`, {
        address: safeAddress,
      })
      await publicClient.waitForTransactionReceipt({ hash: txHash.hash as `0x${string}` })
      queryClient.invalidateQueries({ queryKey: ['isSunnyAgentSettled', safeAddress] })
      setIsLoading(false)
      setTxFlow(<SavingsSunny />, () => {}, false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  return (
    <Container className={css.container}>
      <Grid container gap={3} justifyContent="center">
        <Grid item xs={10} md={10}>
          <div className={css.titleWrapper}>
            <Typography data-testid="modal-title" variant="h3" component="div" fontWeight="700" className={css.title}>
              Sunny Agent
            </Typography>
          </div>

          <Paper data-testid="modal-header" className={css.header}>
            <TxLayoutHeader icon={undefined} subtitle="Summon Your Sunny Agent" hideNonce={true} />
            <div className={css.step}>
              <TxCard>
                <Grid container alignItems="flex-start" spacing={2} direction="row">
                  <Grid item xs={12}>
                    <Typography paragraph>
                      Savings Sunny is your personal AI assistant that helps manage your assets by optimizing yield
                      opportunities within your Super Account.
                    </Typography>

                    <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                      Why activate?
                    </Typography>

                    <List disablePadding>
                      <ListItem sx={{ pl: 0 }}>
                        <ListItemIcon style={{ fontSize: '12px', color: 'black' }}>
                          <FiberManualRecord fontSize="inherit" />
                        </ListItemIcon>
                        <ListItemText primary="Automatically stake idle assets to earn yield" />
                      </ListItem>

                      <ListItem sx={{ pl: 0 }}>
                        <ListItemIcon style={{ fontSize: '12px', color: 'black' }}>
                          <FiberManualRecord fontSize="inherit" />
                        </ListItemIcon>
                        <ListItemText primary="Get recommendations for the best savings strategies" />
                      </ListItem>

                      <ListItem sx={{ pl: 0 }}>
                        <ListItemIcon style={{ fontSize: '12px', color: 'black' }}>
                          <FiberManualRecord fontSize="inherit" />
                        </ListItemIcon>
                        <ListItemText primary="Enjoy a hands-free experience with automated asset management" />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </TxCard>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={10} md={10}>
          <Card sx={{ my: 2, border: 0 }}>
            <CardContent className={css.cardContent}>
              <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection="row" gap={2}>
                <Typography>
                  To enable Savings Sunny, grant the required permissions to manage your assets securely within your
                  Super Account.
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ whiteSpace: 'nowrap', padding: '12px 20px' }}
                  onClick={handleGrantPermission}
                >
                  {isLoading ? (
                    <Box display="flex" gap={1} paddingX={1} alignItems="center">
                      Granting permission
                      <CircularProgress color="inherit" size={16} />
                    </Box>
                  ) : (
                    'Grant Permission'
                  )}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
