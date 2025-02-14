import { useQuery } from '@tanstack/react-query'
import useSafeInfo from '../useSafeInfo'
import { SUNNY_AGENT_BACKEND } from '@/features/superChain/constants'
import axios from 'axios'

function useGetCoPilotOperations() {
  const { safeAddress } = useSafeInfo()
  return useQuery({
    queryKey: ['getCoPilotOperations', safeAddress],
    queryFn: async () => {
      const response = await axios.post(`${SUNNY_AGENT_BACKEND}/co-pilot`, {
        address: safeAddress,
      })
      return response.data
    },
    enabled: !!safeAddress,
  })
}

export default useGetCoPilotOperations
