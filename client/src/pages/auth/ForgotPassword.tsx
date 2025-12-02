// Forgot Password Frontend (3 Steps + 3 API)
// STEP 1: Nhập email → POST /forgot-password
// STEP 2: Nhập OTP → POST /verify-otp → nhận resetToken
// STEP 3: Nhập mật khẩu mới → POST /reset-password/:token

import { z } from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { toast } from 'sonner'
import { apiForgotPassword, apiVerifyOtp, apiResetPassword } from '@/services/auth'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { useNavigate } from 'react-router-dom'
// SCHEMA STEP 1
const emailSchema = z.object({
  email: z.string().email('Email không hợp lệ')
})

// SCHEMA STEP 2
const otpSchema = z.object({
  otp: z.string().min(4, 'OTP phải có 4 ký tự')
})

// SCHEMA STEP 3
const resetSchema = z
  .object({
    password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
    confirmPassword: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword']
  })

export default function ForgotPassword() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [resetToken, setResetToken] = useState<null | string>(null)
  const navigate = useNavigate()
  // FORM STEP 1
  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' }
  })

  // FORM STEP 2
  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' }
  })

  // FORM STEP 3
  const resetForm = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: '', confirmPassword: '' }
  })

  // STEP 1 — gửi email
  const submitEmail = async (dataForm: any) => {
    try {
      const { data } = await apiForgotPassword(dataForm.email)
      console.log('Response:', data)
      setEmail(dataForm.email)
      toast.success(data.message)
      setStep(2)
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Email không tồn tại hoặc lỗi server')
    }
  }

  // STEP 2 — verify OTP
  const submitOtp = async (data: any) => {
    try {
      const res = await apiVerifyOtp({ email, otp: data.otp })
      setResetToken(res.data.resetToken)
      toast.success(res.data.message)
      setStep(3)
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'OTP sai hoặc đã hết hạn')
    }
  }

  const submitReset = async (data: any) => {
    try {
      const res = await apiResetPassword(resetToken as string, data.password)
      toast.success(res.data.message)
      navigate('/auth/signin')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Reset mật khẩu thất bại')
    }
  }

  return (
    <div className='w-[400px] mx-auto mt-10 p-5 border rounded-xl bg-white/10 border-opacity-5'>
      <h2 className='text-2xl font-bold text-center mb-5'>Quên mật khẩu</h2>

      {step === 1 && (
        <Form {...emailForm}>
          <form onSubmit={emailForm.handleSubmit(submitEmail)} className='space-y-4'>
            <FormField
              control={emailForm.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full bg-gradient-to-r from-purple-600 to-fuchsia-600'>
              Gửi OTP
            </Button>
          </form>
        </Form>
      )}

      {step === 2 && (
        <Form {...otpForm}>
          <form onSubmit={otpForm.handleSubmit(submitOtp)} className='space-y-4'>
            <FormField
              control={otpForm.control}
              name='otp'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OTP</FormLabel>
                  <FormControl>
                    <div className='w-full'>
                      <InputOTP maxLength={6} {...field} className='w-full'>
                        <InputOTPGroup className='flex w-full justify-between'>
                          <InputOTPSlot index={0} className='flex-1 mx-1' />
                          <InputOTPSlot index={1} className='flex-1 mx-1' />
                          <InputOTPSlot index={2} className='flex-1 mx-1' />
                          <InputOTPSlot index={3} className='flex-1 mx-1' />
                          <InputOTPSlot index={4} className='flex-1 mx-1' />
                          <InputOTPSlot index={5} className='flex-1 mx-1' />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full bg-gradient-to-r from-purple-600 to-fuchsia-600'>
              Xác minh OTP
            </Button>
          </form>
        </Form>
      )}

      {step === 3 && (
        <Form {...resetForm}>
          <form onSubmit={resetForm.handleSubmit(submitReset)} className='space-y-4'>
            <FormField
              control={resetForm.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu mới</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='Nhập mật khẩu mới' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={resetForm.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xác nhận mật khẩu</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='Xác nhận mật khẩu' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full bg-gradient-to-r from-purple-600 to-fuchsia-600'>
              Đặt mật khẩu
            </Button>
          </form>
        </Form>
      )}
    </div>
  )
}
