"use client"

import { CustomInput } from '@/app/components/Input'
import { Button, Paper, Stack, Text, Title } from '@mantine/core'
import Link from 'next/link'
import React from 'react'

type LoginProps ={

}

const Login = () => {

  return (
    <>
     <div className='flex flex-col items-center pt-10'>
      <Paper shadow='md' radius="md" withBorder className="px-6 py-8">
        <div>
          <Title order={2} ta="center" className='mb-8'>Bienvenue sur e-science</Title>
        </div>
        
        <form className='w-96'>
          <Stack justify='center' align='center'>
            <CustomInput label="Email" placeholder="e-science@science.com" type="text"/>
            <CustomInput label="Mot de passe" placeholder="Mot de passe" type='password' />
            <div className='flex flex-col'>
                <Button type='submit' color='teal' variant='filled'>Se connecter</Button>
                <div className='flex items-center'>
                  <Text size='sm'> Pas encore de compte ?</Text>
                 <Link href="/registration/signup">
                    <Button color='teal' variant='transparent'>S'inscrire</Button>
                 </Link>
                </div>
              </div>
            </Stack>
        </form>
      </Paper>
     </div>
    </>
  )
}

export default Login