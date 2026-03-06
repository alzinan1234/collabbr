import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div className='pt-38 bg-white'>
        <div className='flex flex-col items-center justify-center min-h-screen gap-4'>
            <p className='text-black'>go to the dashboard to view your orders</p>
            <Link href="/influencer/dashboard">
                <button className='px-6 py-3 bg-[#6265F1] text-white font-bold rounded-lg hover:bg-[#5047E6] transition-colors'>
                    Go to Dashboard
                </button>
            </Link>
        </div>
    </div>
  )
}

export default page
