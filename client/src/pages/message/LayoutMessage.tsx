// import { useEffect, useState } from 'react'
// import { IoChatbubbleOutline } from 'react-icons/io5'
// import { FaTimes } from 'react-icons/fa'
// import useConversation from '@/zustand/useConversation'
// import MessageForm from '@/pages/message/MessageForm'
// import useGetMessage from '@/common/hooks/useGetMessage'
// import { useAuth } from '@/common/hooks/useAuth'
// import MessageCheck from '@/pages/message/MessageCheck'
// import { getUserAdmin } from '@/services/auth'

// const LayoutMessage = () => {
//   const [check, setCheck] = useState(false)
//   const { userAuth } = useAuth()
//   const { selectedConversation, setSelectedConversation } = useConversation()
//   const { messages, isLoading } = useGetMessage()
//   const { isLoggedIn } = useAuth()

//   useEffect(() => {
//     ;(async () => {
//       try {
//         const { data } = await getUserAdmin()
//         setSelectedConversation(data.data)
//       } catch (error) {
//         console.log(error)
//       }
//     })()
//   }, [])
//   return (
//     // <div className={`fixed bottom-4 right-4 bg-white p-4 shadow-lg rounded-lg z-[100] ${userAuth?.isAdmin ? 'hidden' : ''}`}>
//     //   {check ? (
//     //     <div className='bg-white flex justify-center items-center min-w-[400px]'>
//     //       <div className='w-full mx-auto my-2  bg-white text-white rounded-lg'>
//     //         <div className='flex justify-between items-center bg-slate-300 w-full p-2 rounded-md'>
//     //           <span className='text-lg font-bold text-black '>Admin</span>
//     //           <div className='flex space-x-2'>
//     //             <button className='text-gray-500'>
//     //               <FaTimes onClick={() => setCheck(false)} />
//     //             </button>
//     //           </div>
//     //         </div>
//     //         <div className='mt-4 space-y-4 h-[300px] overflow-y-auto'>
//     //           {!isLoading &&
//     //             messages.length > 0 &&
//     //             messages.map((message: any) => {
//     //               return <MessageCheck message={message} />
//     //             })}
//     //         </div>
//     //         <MessageForm />
//     //       </div>
//     //     </div>
//     //   ) : (
//     //     <IoChatbubbleOutline
//     //       className={`${userAuth?.isAdmin ? 'hidden' : ''}`}
//     //       size={30}
//     //       onClick={() => {
//     //         setCheck(true)
//     //       }}
//     //     />
//     //   )}
//     // </div>
//     <div id='chat-container' className={`fixed bottom-4 z-[100] right-4 ${userAuth?.isAdmin ? 'hidden' : ''}`}>
//       {check ? (
//         <div className='bg-white shadow-md rounded-lg lg:min-w-[370px] min-w-full w-full'>
//           <div className='p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center'>
//             <div className='flex items-center gap-4'>
//               <img src={selectedConversation?.avatar} alt='' className='border rounded-full w-6 h-6' />
//               <p className='text-lg font-semibold'>Admin Shop</p>
//             </div>
//             <button
//               id='close-chat'
//               className='text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400'
//             >
//               <FaTimes onClick={() => setCheck(false)} />
//             </button>
//           </div>
//           {isLoggedIn ? (
//             <>
//               <div id='chatbox' className='p-4 h-80 mt-4 space-y-4 overflow-y-auto'>
//                 {/* Chat messages will be displayed here */}
//                 {!isLoading &&
//                   messages.length > 0 &&
//                   messages.map((message: any) => {
//                     return <MessageCheck message={message} />
//                   })}
//               </div>
//               <MessageForm />
//             </>
//           ) : (
//             <div className='h-80 text-center pt-7'>Mời bạn đăng nhập để nhắn tin với shop </div>
//           )}
//         </div>
//       ) : (
//         <div className='p-3 bg-[#eeeeee] rounded-full'>
//           <IoChatbubbleOutline
//             className={`${userAuth?.isAdmin ? 'hidden' : ''} cursor-pointer text-black  `}
//             size={35}
//             onClick={() => {
//               setCheck(true)
//             }}
//           />
//         </div>
//       )}
//     </div>
//   )
// }

// export default LayoutMessage

import { useEffect, useState } from 'react'
import { IoChatbubbleOutline } from 'react-icons/io5'
import { FaTimes } from 'react-icons/fa'
import useConversation from '@/zustand/useConversation'
import MessageForm from '@/pages/message/MessageForm'
import useGetMessage from '@/common/hooks/useGetMessage'
import { useAuth } from '@/common/hooks/useAuth'
import MessageCheck from '@/pages/message/MessageCheck'
import { getUserAdmin } from '@/services/auth'

const LayoutMessage = () => {
  const [check, setCheck] = useState(false)
  const { userAuth } = useAuth()
  const { selectedConversation, setSelectedConversation } = useConversation()
  const { messages, isLoading } = useGetMessage()
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await getUserAdmin()
        setSelectedConversation(data.data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <div id='chat-container' className={`fixed bottom-5 right-5 z-[100] ${userAuth?.isAdmin ? 'hidden' : ''}`}>
      {check ? (
        <div className='bg-white shadow-xl rounded-2xl w-[360px] overflow-hidden border border-slate-100'>
          {/* Header */}
          <div className='flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-black to-blue-500'>
            <div className='relative'>
              <img
                src={selectedConversation?.avatar}
                alt=''
                className='w-9 h-9 rounded-full object-cover ring-2 ring-white/40'
              />
              <span className='absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-blue-500' />
            </div>
            <div className='flex-1'>
              <p className='text-white font-semibold text-sm'>Admin Shop</p>
              <p className='text-blue-200 text-xs'>Thường trả lời trong vài phút</p>
            </div>
            <button
              id='close-chat'
              onClick={() => setCheck(false)}
              className='text-white/70 hover:text-white hover:bg-white/10 transition-colors p-1.5 rounded-lg'
            >
              <FaTimes size={13} />
            </button>
          </div>

          {/* Body */}
          {isLoggedIn ? (
            <>
              <div
                id='chatbox'
                className='p-4 h-72 overflow-y-auto space-y-3 bg-slate-50'
                style={{ scrollbarWidth: 'thin', scrollbarColor: '#e2e8f0 transparent' }}
              >
                {!isLoading &&
                  messages.length > 0 &&
                  messages.map((message: any) => <MessageCheck key={message._id} message={message} />)}
              </div>
              <div className='border-t border-slate-100'>
                <MessageForm />
              </div>
            </>
          ) : (
            <div className='h-72 flex flex-col items-center justify-center gap-2 text-slate-400 bg-slate-50'>
              <IoChatbubbleOutline size={32} />
              <p className='text-sm'>Mời bạn đăng nhập để nhắn tin với shop</p>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => setCheck(true)}
          className={`${userAuth?.isAdmin ? 'hidden' : ''} w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center`}
        >
          <IoChatbubbleOutline size={26} color='white' />
        </button>
      )}
    </div>
  )
}

export default LayoutMessage
