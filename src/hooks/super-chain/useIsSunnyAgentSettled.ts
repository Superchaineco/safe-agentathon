import { useQuery } from "@tanstack/react-query"
import useSafeInfo from "../useSafeInfo"
import { useSafeSDK } from "../coreSDK/safeCoreSDK"

function useIsSunnyAgentSettled() {
    const { safeAddress } = useSafeInfo()
    const safeSDK = useSafeSDK()
    return useQuery({
        queryKey: ['isSunnyAgentSettled', safeAddress],
        queryFn: async () => {
            const isEnabled = await safeSDK?.isModuleEnabled("0xde8f89B6d11fc6894C98A37458c0149787F051AE")
            if (!isEnabled) {
                return false
            }
            return true
        },
        enabled: !!safeAddress,
    })
}

export default useIsSunnyAgentSettled