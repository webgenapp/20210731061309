import client from '../api'
import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import PaycheckForm from './PaycheckForm'
import { Paycheck } from '../types'
import { useQuery, useMutation, useQueryClient } from 'react-query'

function UpdatePaycheck() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const history = useHistory()

  const { data, isLoading } = useQuery<Paycheck>(['paychecks', id], () =>
    client.get(`/api/v1/paychecks/${id}`).then((response) => response.data)
  )

  const updatePaycheck = useMutation<Paycheck, any, Paycheck>(
    (values: Paycheck) =>
      client
        .put(`/api/v1/paychecks/${id}`, values)
        .then((response) => response.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('paychecks')
      },
    }
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const paycheck = data as Paycheck
  return (
    <PaycheckForm
      paycheck={paycheck}
      onSubmit={(values, { setSubmitting }) => {
        updatePaycheck.mutate(values)
        setSubmitting?.(false)
        history.push('/paychecks')
      }}
    />
  )
}

export default UpdatePaycheck
