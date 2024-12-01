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

const page = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values)
  }
  
  return (
    <>
      <Form {...form}>
      <form className='w-full space-y-3' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input className="bg-dark" type="text" placeholder='Zentry' {...field}/>
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
        <Button className='bg-dark hover:bg-[#292929] text-light w-full' type="submit">Sign Up</Button>
        <Link className='hover:underline text-end text-xs' href={'/auth/sign-up'}>
        <p className='mt-2'>Don't have an account?</p>
        </Link>
      </form>
    </Form>
    </>
  )
}

export default page