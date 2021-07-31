import React from 'react'
import { useParams } from 'react-router-dom'
import client from '../api'
import { useQuery } from 'react-query'
import { Paycheck } from '../types'

function DetailPaycheck() {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading } = useQuery<Paycheck>(['paychecks', id], () =>
    client.get(`/api/v1/paychecks/${id}`).then((response) => response.data)
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const paycheck = data as Paycheck

  return (
    <div>
      <label>{paycheck.name}</label>
      <br />

      <label>{paycheck.capacity}</label>
      <br />
    </div>
  )
}

export default DetailPaycheck
