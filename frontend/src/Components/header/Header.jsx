import React from 'react'
import NavigationItems from './Navigation-button'

const Header = () => {
  return (
    <div className="flex w-full gap-12 max-h-40px items-center px-16 py-4 my-0 text-black max-md:pl-5 border-b-2">
       <div className='flex flex-row w-3/4'><NavigationItems/></div> 
      <div className="flex gap-10 justify-center items-center w-1/4 ">
        <div className="flex gap-3 justify-between items-center  my-auto ">
      <div className="self-stretch my-auto">jhonny_sins</div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5ed9f7d13a08b860ce726168da5bed182f0812e9abf876a91dea8cf0addf29b5?placeholderIfAbsent=true&apiKey=5fd980f3be9141b1b823767a6d39fbe1"
        className="object-contain shrink-0 self-stretch my-auto aspect-square rounded-[50px] w-[63px]"
        alt="User profile"
      />
    </div>
      </div>
    </div>
  )
}

export default Header