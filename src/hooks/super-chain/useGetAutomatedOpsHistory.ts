import { useQuery } from '@tanstack/react-query'
import useSafeInfo from '../useSafeInfo'
import { SUNNY_AGENT_BACKEND } from '@/features/superChain/constants'
import axios from 'axios'

function useGetAutomatedOpsHistory() {
  const { safeAddress } = useSafeInfo()
  return useQuery({
    queryKey: ['automatedOpsHistory', safeAddress],
    queryFn: async () => {
      const response = await axios.get(`${SUNNY_AGENT_BACKEND}/transactions`, {
        params: {
          address: safeAddress,
        },
      })
      return response.data
    },
    enabled: !!safeAddress,
    refetchInterval: 10000,
  })
}

export default useGetAutomatedOpsHistory
