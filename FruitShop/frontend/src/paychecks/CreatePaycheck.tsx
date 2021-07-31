import client from '../api'
import { FormikHelpers } from 'formik'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Paycheck, PaycheckError } from '../types'
import PaycheckForm from './PaycheckForm'
import { useHistory } from 'react-router-dom'

function CreatePaycheck() {
  const queryClient = useQueryClient()
  const history = useHistory()
  const createPaycheck = useMutation<Paycheck, PaycheckError, Paycheck>(
    (values) => {
      return client.post('/api/v1/paychecks', values)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('paychecks')
      },
    }
  )

  const handleSubmit = (
    values: Paycheck,
    { setSubmitting }: FormikHelpers<Paycheck>
  ) => {
    createPaycheck.mutate(values)
    setSubmitting?.(false)
    history.push('/paychecks')
  }

  return <PaycheckForm onSubmit={handleSubmit} />
}

export default CreatePaycheck
