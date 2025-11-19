import { useInfiniteQuery } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'
import { EQueryKeys } from '~/enums/query'
import type { IRepository } from '~/interfaces/repository'

export function useGetRepositories() {
	return useInfiniteQuery<IRepository[], AxiosError<unknown>>({
		queryKey: [EQueryKeys.REPOSITORIES],
		queryFn: async ({ pageParam = 1 }) => {
			const { data } = await axios.get<IRepository[]>(
				`https://api.github.com/users/leonardowlopes/repos?page=${pageParam}&per_page=20&sort=updated`,
			)

			return data
		},
		getNextPageParam: (lastPage, allPages) => {
			if (lastPage.length === 0) return undefined
			return allPages.length + 1
		},
		initialPageParam: 1,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	})
}
