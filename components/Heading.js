import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Heading() {
  const router = useRouter()

  const { data: session, status } = useSession()

  const loading = status === 'loading'

  if (loading) {
    return null
  }

  return (
    <header className='h-14 flex pt-5 px-5 pb-2'>
      <div className='text-xl'>
        {router.asPath === '/' ? (
          <p>Digital Downloads</p>
        ) : (
          <Link href={`/`}>
            <a className='underline'>Home</a>
          </Link>
        )}
      </div>

      <div className='grow ml-10 -mt-1'></div>

      {session &&
        (router.asPath === '/dashboard' ? (
          <a className='flex'>
            <p className='mr-3 font-bold'>Dashboard</p>
          </a>
        ) : (
          <Link href={`/dashboard`}>
            <a className='flex'>
              <p className='mr-3 underline'>Dashboard</p>
            </a>
          </Link>
        ))}
      <a
        className='flex-l border px-4 font-bold rounded-full'
        href={session ? '/api/auth/signout' : '/api/auth/signin'}
      >
        {session ? 'logout' : 'login'}
      </a>
    </header>
  )
}
