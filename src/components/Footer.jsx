import React from 'react'
import { useSelector } from 'react-redux'
import { AiFillFacebook, AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { BsTelegram } from "react-icons/bs"
import Container from './Container';

const Footer = () => {


  const social_links = [
    {
        icon: <AiFillGithub/>,
        link : "https://github.com/Mohammadkardi1"
    }, 
    {
        icon: <AiFillLinkedin/>,
        link : "https://www.linkedin.com/in/mohammad-kardi/"
    }, 
    {
        icon: <AiFillFacebook/>,
        link : "https://www.facebook.com/profile.php?id=100006621041867"
    }, 
    {
        icon: <BsTelegram/>,
        link : "https://t.me/Mohammad71223"
    }, 
]
  


  return (
    <div className='mt-auto'>
      <Container>
        <div className='flex justify-between mt-16  py-6  border-t border-gray-600'>
            <p className='text-base font-medium'>
                Copyright &copy; 2023 developed by Mohammad Kardi. All rights reserved.
            </p>
            <ul className='p-0 m-0 flex gap-1 sm:gap-3'>
                {social_links.map((item, index) => (
                      <li key={index} >
                          <a 
                              className='hover:opacity-70 text-xl lg:text-2xl text-[color:var(--primary-color-two)]'
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