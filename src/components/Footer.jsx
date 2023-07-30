import React from 'react'
import { useSelector } from 'react-redux'
import { AiFillFacebook, AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { BsTelegram } from "react-icons/bs"
import Container from './Container';

const Footer = () => {


  const social_links = [
    {
        icon: <AiFillGithub className='w-[1.4rem] h-[1.4rem] lg:w-[1.6rem] lg:h-[1.6rem]'/>,
        link : "https://github.com/Mohammadkardi1"
    }, 
    {
        icon: <AiFillLinkedin className='w-[1.4rem] h-[1.4rem] lg:w-[1.6rem] lg:h-[1.6rem]'/>,
        link : "https://www.linkedin.com/in/mohammad-kardi/"
    }, 
    {
        icon: <AiFillFacebook className='w-[1.4rem] h-[1.4rem] lg:w-[1.6rem] lg:h-[1.6rem]'/>,
        link : "https://www.facebook.com/profile.php?id=100006621041867"
    }, 
    {
        icon: <BsTelegram className='w-[1.4rem] h-[1.4rem] lg:w-[1.6rem] lg:h-[1.6rem]'/>,
        link : "https://t.me/Mohammad71223"
    }, 
]
  


  return (
    <div className='mt-auto'>
      <Container>
        <div className='text-[1rem] lg:text-[1.2rem] flex flex-col items-center gap-y-4 lg:flex-row lg:justify-between mt-16 py-6 border-t border-gray-600'>
            <p className=' text-center font-medium plain-text'>
                Copyright &copy; 2023 developed by Mohammad Kardi. All rights reserved.
            </p>
            <ul className='p-0 m-0 flex gap-3 sm:gap-3'>
                {social_links.map((item, index) => (
                      <li key={index}>
                        {/* text-xl lg:text-2xl */}
                          <a 
                              className='hover:opacity-70  text-[color:var(--primary-color-two)]'
                              href={item.link} 
                              target='_blank'>
                              {item.icon}
                          </a>
                      </li>
                  ))
                }
            </ul>
        </div>
      </Container>
    </div>
  )
}

export default Footer