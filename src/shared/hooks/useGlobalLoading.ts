import { useIsFetching, useIsMutating, useIsRestoring } from '@tanstack/react-query'

export default function useGlobalLoading() {
  const isFetching   = useIsFetching({ fetchStatus: 'fetching'  }) > 0
  const isMutating   = useIsMutating({status: 'pending'}) > 0
  const isRestoring  = useIsRestoring()
const number = useIsFetching({ fetchStatus: 'fetching'  });
  console.log(number)
  return isFetching || isMutating || isRestoring
}
