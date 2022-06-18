import React from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'

import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import { transferForm } from '../definitions/form';

const Home: NextPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<transferForm>();

  const onSubmit = async (data: transferForm) => {
    const result = await axios.post('/api/transfer', {
      "receiver": data.address,
      "amount": data.amount || 0
    })

    if (result.status === 200) {
      return Swal.fire(
        'Congratulation!',
        'Transfer success!',
        'success'
      )
    }
    return Swal.fire(
      'Error',
      'Please try again',
      'error'
    )
  }

  return (
    <div>
      <Head>
        <title>Create Coin Transfer App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-[100vh] py-16 flex flex-1 flex-col justify-center items-center">
        <div className="w-1/4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <span className="text-4xl font-bold">Transfer</span>
              <span className="text-2xl my-5">Transfer your token here.</span>
              <span>Address</span>
              <input {...register('address', { required: true })} placeholder="Recipient Address" className={`border border-gray-200 rounded h-10 mt-2 px-3 ${errors.address && 'border-red-500'}`} />
              {
                errors.address && errors.address.type === "required" && (
                  <div className="text-red-500">Please enter your recipient address</div>
                )
              }
              <span className="mt-5">Token Amount</span>
              <input {...register('amount', { required: true })} placeholder="Amount" className={`border border-gray-200 rounded h-10 mt-2 px-3 ${errors.amount && 'border-red-500'}`} />
              {
                errors.amount && errors.amount.type === "required" && (
                  <div className="text-red-500">Please enter your amount</div>
                )
              }
              <button className="bg-black text-white w-3/12 rounded py-2 px-3 mt-5">Transfer</button>
            </form>
        </div>
      </main>
    </div>
  )
}

export default Home
