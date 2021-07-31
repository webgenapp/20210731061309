import React from 'react'
import { useQueryClient, useQuery, useMutation } from 'react-query'
import client from '../api'
import { Paycheck } from '../types'
import { useHistory } from 'react-router-dom'

type PaycheckPreviewProps = {
  paycheck: Paycheck
  handleEdit: (paycheck: Paycheck) => void
  handleDelete: (paycheck: Paycheck) => void
  handleDetail: (paycheck: Paycheck) => void
}

function PaycheckPreview({
  paycheck,
  handleEdit,
  handleDelete,
  handleDetail,
}: PaycheckPreviewProps) {
  return (
    <>
      {paycheck.name}
      <br />
      <button type='button' onClick={() => handleDetail(paycheck)}>
        detail
      </button>
      <button type='button' onClick={() => handleEdit(paycheck)}>
        edit
      </button>
      <button type='button' onClick={() => handleDelete(paycheck)}>
        delete
      </button>
    </>
  )
}

function ListPaychecks() {
  const history = useHistory()
  const queryClient = useQueryClient() // eslint-disable-line no-unused-vars
  const paychecksQuery = useQuery<Paycheck[]>('paychecks', () => {
    return client
      .get('/api/v1/paychecks')
      .then((response) => response.data) as Promise<Paycheck[]>
  })

  const deletePaycheck = useMutation<any, any, Partial<Paycheck>>(
    ({ id }) => {
      return client.delete(`/api/v1/paychecks/${id}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('paychecks')
      },
    }
  )

  const handleEdit = ({ id }: Paycheck) => {
    history.push(`/paychecks/update/${id}`)
  }

  const handleDelete = ({ id }: Paycheck) => {
    deletePaycheck.mutate({ id })
  }

  const handleDetail = ({ id }: Paycheck) => {
    history.push(`/paychecks/detail/${id}`)
  }

  return (
    <>
      <p>{paychecksQuery.data?.length} paychecks</p>
      <ul>
        {paychecksQuery.data?.map((paycheck) => (
          <li key={paycheck.id}>
            <PaycheckPreview
              paycheck={paycheck}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleDetail={handleDetail}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

export default ListPaychecks
