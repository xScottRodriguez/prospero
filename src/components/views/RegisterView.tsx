import { HttpMethod } from '@/enums'
import { useYupValidationResolver } from '@/hooks/useYupValidationResolver'
import apiService from '@/lib/apiService'
import {
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Image,
  Text,
  Container,
  Link,
  useToast
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { PasswordInput } from '../ui'

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
      'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and one dot'
    ),
  name: yup.string().required(),
  lastName: yup.string().required(),
  userName: yup.string().required()
})
interface RegisterViewProps {
  name: string
  lastName: string
  email: string
  password: string
  userName: string
}
export const RegisterView = () => {
  const toast = useToast()
  const router = useRouter()
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({
    resolver: useYupValidationResolver(validationSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      lastName: '',
      userName: ''
    }
  })

  const onSubmit = async ({
    email,
    lastName,
    name: firstName,
    password,
    userName
  }: RegisterViewProps) => {
    try {
      const promise = apiService.request({
        method: HttpMethod.POST,
        endPoint: '/auth/signup',
        data: {
          email,
          lastName,
          firstName,
          password,
          usernName: userName
        }
      })

      toast.promise(promise, {
        success: {
          title: 'Cuenta creada',
          description: 'Tu cuenta ha sido creada exitosamente'
        },
        loading: {
          title: 'Creando cuenta',
          description: 'Estamos creando tu cuenta, por favor espera',
          colorScheme: 'primary'
        },
        error: {
          title: 'Error',
          description: 'Error al crear la cuenta'
        }
      })
      router.push('/auth/login')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error al crear la cuenta',
        status: 'error',
        isClosable: true
      })
    }
  }
  return (
    <Container flex={1} p={2}>
      <Image
        mt={['0em', '10em']}
        mx="auto"
        height={'5em'}
        src="/assets/authBrand.svg"
        alt="Prospero Logo"
      />
      <Stack textAlign={'center'}>
        <Heading fontSize={['2xl', '4x', '6xl']} textAlign="center">
          Create an Account
        </Heading>
        <Text fontSize={['md', 'lg']} color="gray.600">
          “Ahorrar nunca fue tan fácil, gestiona tus finanzas con estilo en{' '}
          <Text as="span" fontWeight="bold" color="primary.600">
            Prospero
          </Text>
          ”
        </Text>
      </Stack>
      <Box as="form" onSubmit={handleSubmit(onSubmit)} mt={4}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input type="text" {...field} placeholder="John" />
              )}
            />
            {errors.name && <Text color="red">{errors.name.message}</Text>}
          </FormControl>
          <FormControl id="lastName">
            <FormLabel>Apellido</FormLabel>
            <Controller
              control={control}
              name="lastName"
              render={({ field }) => (
                <Input type="text" {...field} placeholder="Doe" />
              )}
            />

            {errors.lastName && (
              <Text color="red">{errors.lastName.message}</Text>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>nombre de usuario</FormLabel>
            <Controller
              control={control}
              name="userName"
              render={({ field }) => (
                <Input type="text" {...field} placeholder="johnDoe" />
              )}
            />
            {errors.lastName && (
              <Text color="red">{errors.lastName.message}</Text>
            )}
          </FormControl>
          <FormControl id="email">
            <FormLabel>E-mail</FormLabel>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input colorScheme="primary.500" type="email" {...field} />
              )}
            />
            {errors.email && <Text color="red">{errors.email.message}</Text>}
          </FormControl>
          <FormControl id="password">
            <FormLabel>Contraseña</FormLabel>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <PasswordInput size={['sm', 'md', 'lg']} {...field} />
              )}
            />
            {errors.password && (
              <Text color="red">{errors.password.message}</Text>
            )}
          </FormControl>
          <Link
            as={NextLink}
            fontSize={['small', 'medium']}
            ml="auto"
            href="/auth/login"
          >
            Ya tienes una cuenta?
          </Link>
          <Stack spacing={6}>
            <Button
              type="submit"
              bg="primary.400"
              color="white"
              _hover={{ bg: 'primary.500' }}
            >
              Crear cuenta
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  )
}
