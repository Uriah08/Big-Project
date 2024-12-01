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

import { registerSchema } from '@/schemas/schema'
import Link from 'next/link'

const page = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof registerSchema>) {
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
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="bg-dark" type="email" placeholder='sample@email.com' {...field}/>
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
        <Link className='hover:underline text-end text-xs' href={'/auth/sign-in'}>
        <p className='mt-2'>Already have an account?</p>
        </Link>
      </form>
    </Form>
    </>
  )
}

export default page