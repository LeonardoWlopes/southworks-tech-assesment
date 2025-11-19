import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'
import { EQueryKeys } from '~/enums/query'
import type { IOrganization } from '~/interfaces/organization'

export function useGetOrganizations(): UseQueryResult<
	IOrganization[],
	AxiosError<unknown>
> {
	return useQuery({
		queryKey: [EQueryKeys.ORGANIZATIONS],
		queryFn: async () => {
			const { data } = await axios.get<IOrganization[]>(
				'https://api.github.com/users/leonardowlopes/orgs',
			)

			return data
		},
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	})
}
