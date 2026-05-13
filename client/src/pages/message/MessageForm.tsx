import useMessage from '@/common/hooks/useMessage'
import { useRef, useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'

const MessageForm = () => {
  const { sendMessage } = useMessage()
  const [message, setMessage] = useState<string>('')
  // console.log(message);
  const formRef = useRef(null)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!message) return
    await sendMessage(message)
    setMessage('')
    if (formRef.current) {
      ;(formRef.current as any).reset()
    }
  }
  return (
    <form className='flex items-center gap-2 px-3 py-3' onSubmit={handleSubmit} ref={formRef}>
      <input
        type='text'
        className='flex-1 px-4 py-2 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-slate-400 transition'
        placeholder='Nhắn tin...'
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type='submit'
        className='w-9 h-9 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all text-white shrink-0'
      >
        <FaPaperPlane size={13} />
      </button>
    </form>
  )
}

export default MessageForm
