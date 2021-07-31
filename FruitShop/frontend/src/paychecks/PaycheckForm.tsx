import React from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import { Paycheck } from '../types'

type CreateProps = {
  paycheck?: Paycheck
  onSubmit: (values: Paycheck, helpers: FormikHelpers<Paycheck>) => void
}

function PaycheckForm({ paycheck, onSubmit }: CreateProps) {
  const initialValues: Paycheck = {
    name: paycheck ? paycheck.name : '',
    capacity: paycheck ? paycheck.capacity : '',
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={() => {
        return {}
      }}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type='text' name='name' placeholder='Name' />

          <Field type='text' name='capacity' placeholder='Capacity' />

          <button type='submit' disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default PaycheckForm
