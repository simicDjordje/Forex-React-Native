import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const apiCore = createApi({
	reducerPath: 'apiCore',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://164.92.129.161/api',
		prepareHeaders: async (headers) => {
			const token = await AsyncStorage.getItem('@userToken')
			
			if(token){
				headers.set('Authorization', `Bearer ${token}`)
			}
			return headers
		}
	}),
	endpoints: (builder) => ({
		getAllData: builder.query({query: () => '/get-all-data2'}),
		getAvailableServers: builder.query({query: () => '/available-servers'}),
		register: builder.mutation({
			query: (data) => {
				return {
					url: '/register',
					method: 'POST',
					body: data,
				}
			}
		}),
		login: builder.mutation({
			query: (data) => ({
				url: `/login-mobile`,
				method: 'POST',
				body: data,
			})
		}),
		connectMT: builder.mutation({
			query: (data) => ({
				url: `/connect-mt`,
				method: 'POST',
				body: data,
			})
		}),
		logout: builder.mutation({
			query: () => ({
				url: `/logout`,
				method: 'POST',
			})
		}),
		discoverStrategies: builder.mutation({
			query: () => ({
				url: `/discover-strategies`,
				method: 'POST',
			})
		}),
		strategyInfo: builder.mutation({
			query: (data) => ({
				url: `/strategy-info`,
				method: 'POST',
				body: data
			})
		}),
		subscribeStrategy: builder.mutation({
			query: (data) => ({
				url: `/subscribe-strategy`,
				method: 'POST',
				body: data
			})
		}),
		alreadySubscribedStrategies: builder.mutation({
			query: () => ({
				url: `/subscribed-strategies`,
				method: 'POST',
			})
		}),
		addedStrategies: builder.mutation({
			query: () => ({
				url: `/added-strategies`,
				method: 'POST',
			})
		}),
		unsubscribeStrategy: builder.mutation({
			query: (data) => ({
				url: `/unsubscribe-strategy`,
				method: 'POST',
				body: data
			})
		}),
		removeStrategy: builder.mutation({
			query: (data) => ({
				url: `/remove-strategy`,
				method: 'POST',
				body: data
			})
		}),
		addStrategy: builder.mutation({
			query: (data) => {
				return {
					url: '/add-strategy',
					method: 'POST',
					body: data,
				}
			}
		}),
	})
})

export const { 
	useGetAllDataQuery,
	useGetAvailableServersQuery,
	useRegisterMutation,
	useLoginMutation,
	useConnectMTMutation,
	useLogoutMutation,
	useDiscoverStrategiesMutation,
	useStrategyInfoMutation,
	useSubscribeStrategyMutation,
	useAlreadySubscribedStrategiesMutation,
	useUnsubscribeStrategyMutation,
	useRemoveStrategyMutation,
	useAddStrategyMutation,
	useAddedStrategiesMutation,
} = apiCore;
