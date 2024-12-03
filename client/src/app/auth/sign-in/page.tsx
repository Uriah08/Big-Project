"use client"

import React from 'react'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { loginSchema } from '@/schemas/schema'
import Link from 'next/link'

import { useLoginUserMutation } from '@/store/api'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store'

const LoginPage = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loginUser, { isLoading }] = useLoginUserMutation()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit (values: z.infer<typeof loginSchema>) {
    try {
      const response = await loginUser(values)
      if (response.data.success) {
        dispatch(setUser({
          user: response.data.user, token: response.data.token
        }))
      }
      form.reset()
    } catch (error) {
      console.error(error)
    }
  }

  const token = localStorage.getItem("token");
  console.log(token);
  return (
    <>
      <Form {...form}>
      <form className='w-full space-y-3' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="bg-dark" type="email" placeholder='zentry@email.com' {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input className="bg-dark" type="password" placeholder='*********' {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} className='bg-dark hover:bg-[#292929] text-light w-full' type="submit">{isLoading ? 'Loading...' : 'Sign In'}</Button>
        <Link className='hover:underline text-end text-xs' href={'/auth/sign-up'}>
        <p className='mt-2'>Don&apos;t have an account?</p>
        </Link>
      </form>
    </Form>
    </>
  )
}

export default LoginPage