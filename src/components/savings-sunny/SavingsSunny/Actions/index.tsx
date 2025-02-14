import {
  Card,
  CardContent,
  Paper,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from '@mui/material'
import sharedCss from '@/components/tx/security/shared/styles.module.css'
import React, { useState } from 'react'
import useGetCoPilotOperations from '@/hooks/super-chain/useGetCoPilotOperations'
import LoadingModal from '@/components/common/LoadingModal'
import FailedTxnModal from '@/components/common/ErrorModal'
import SuccessTxnModal from '@/components/common/SuccessTxnModal'
import { useMutation } from '@tanstack/react-query'
import { assertWalletChain } from '@/services/tx/tx-sender/sdk'
import { createWeb3 } from '@/hooks/wallets/web3'
import { createEthersAdapter } from '@/hooks/coreSDK/safeCoreSDK'
import Safe from '@safe-global/protocol-kit'
import useWallet from '@/hooks/wallets/useWallet'
import useSafeInfo from '@/hooks/useSafeInfo'
import useSuperChainAccount from '@/hooks/super-chain/useSuperChainAccount'
import { zeroAddress } from 'viem'
import useGetAutomatedOpsHistory from '@/hooks/super-chain/useGetAutomatedOpsHistory'

export default function Actions() {
  const { data: coPilotOperation, isLoading: isLoadingCoPilotOperation } = useGetCoPilotOperations()
  const { data: automatedOpsHistory, isLoading: isLoadingAutomatedOpsHistory } = useGetAutomatedOpsHistory()

  const [isPending, setIsPending] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { publicClient } = useSuperChainAccount()
  const [hash, setHash] = useState<string>(zeroAddress)
  const wallet = useWallet()
  const { safe } = useSafeInfo()

  const { mutate: executeCoPilotOperation } = useMutation({
    mutationFn: async () => {
      const _wallet = await assertWalletChain(wallet!, safe.chainId)
      const provider = createWeb3(_wallet.provider)

      const ethAdapter = await createEthersAdapter(provider)
      const protocolKit = await Safe.create({
        ethAdapter,
        safeAddress: safe.address.value,
      })
      console.debug(coPilotOperation.tx.data, coPilotOperation.tx.to)
      const tx = await protocolKit.createTransaction({
        transactions: [
          {
            data: coPilotOperation.tx.data,
            to: coPilotOperation.tx.to,
            value: coPilotOperation.tx.value,
            operation: 1,
          },
        ],
      })
      const txHash = await protocolKit.executeTransaction(tx)
      setHash(txHash.hash)
      await publicClient.waitForTransactionReceipt({ hash: txHash.hash as `0x${string}` })
    },
    onMutate: () => setIsPending(true),
    onError: () => {
      setIsPending(false)
      setIsError(true)
    },
    onSuccess: () => {
      setIsPending(false)
      setIsSuccess(true)
    },
  })

  const transactions = [
    { time: '2025-02-13 16:45', action: 'Deposit', hash: '0x713D...DC057', apr: '3.00%', usdValue: '$1,000' },
    { time: '2025-02-12 11:30', action: 'Deposit', hash: '0x713D...DC057', apr: '2.85%', usdValue: '$2,500' },
    { time: '2025-02-11 10:00', action: 'Deposit', hash: '0x713D...DC057', apr: '3.10%', usdValue: '$3,200' },
  ]

  const calculateTimeAgo = (dateString: string) => {
    const transactionDate = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - transactionDate.getTime()) / 1000)

    const days = Math.floor(diffInSeconds / (3600 * 24))
    const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600)
    const minutes = Math.floor((diffInSeconds % 3600) / 60)

    if (days > 0) return `hace ${days} día${days > 1 ? 's' : ''}`
    if (hours > 0) return `hace ${hours} hora${hours > 1 ? 's' : ''}`
    return `hace ${minutes} minuto${minutes > 1 ? 's' : ''}`
  }

  console.debug({ automatedOpsHistory })

  return (
    <>
      <LoadingModal open={isPending} hash={hash} title="Executing co-pilot operation" />
      <FailedTxnModal open={isError} onClose={() => setIsError(false)} handleRetry={() => executeCoPilotOperation()} />
      <SuccessTxnModal
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        hash={hash}
        title="Co-pilot operation executed"
      />
      <Grid item container xs={12} spacing={2}>
        <Grid item xs={12}>
          <Paper className={sharedCss.wrapper} variant="outlined">
            <Card
              style={{
                width: '100%',
              }}
            >
              <CardContent>
                <Box width="100%">
                  <Typography fontWeight={600} fontSize={16} variant="h6">
                    Co-pilot Operations
                  </Typography>
                  {isLoadingCoPilotOperation ? (
                    <Box display="flex" flexDirection="column" alignItems="center" py={3}>
                      <CircularProgress size={40} />
                      <Typography variant="body2" color="text.secondary" mt={2}>
                        Loading co-pilot operation...
                      </Typography>
                    </Box>
                  ) : (
                    <TextField
                      multiline
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      label="Operation description"
                      focused
                      value={coPilotOperation?.suggestion}
                    />
                  )}

                  <Button
                    fullWidth
                    disabled={isLoadingCoPilotOperation}
                    variant="contained"
                    color="primary"
                    onClick={() => executeCoPilotOperation()}
                  >
                    Execute
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={sharedCss.wrapper} variant="outlined">
            <Card
              style={{
                width: '100%',
              }}
            >
              <CardContent>
                <Box>
                  <Typography fontWeight={600} fontSize={16} variant="h6" marginTop={2}>
                    Automated Operations
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Time</TableCell>
                          <TableCell>USD Value</TableCell>
                          <TableCell>Action</TableCell>
                          <TableCell>APR</TableCell>
                          <TableCell>Hash</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {transactions.map((transaction, index) => (
                          <TableRow key={index}>
                            <TableCell>{calculateTimeAgo(transaction.time)}</TableCell>
                            <TableCell>
                              <strong>{transaction.usdValue}</strong>
                            </TableCell>
                            <TableCell>
                              <strong>{transaction.action}</strong>
                            </TableCell>
                            <TableCell>{transaction.apr}</TableCell>
                            <TableCell>
                              <strong>{transaction.hash}</strong>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
