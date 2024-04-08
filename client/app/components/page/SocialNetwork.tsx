import React from 'react'
import { Image, Link } from '@nextui-org/react'

export default function SocialNetwork() {
  const socialNetworks = [
    {
      name: "Github",
      link: "https://github.com/pandaGuerrier/",
      icon: "github"
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/jules-lofficial-b29099227/",
      icon: "linkedin"
    },
    {
      name: "Twitter",
      link: "https://twitter.com/GuerrierPanda",
      icon: "twitter"
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com/jules_lofficial/",
      icon: "instagram"
    },
    {
      name: "Discord",
      link: "https://discord.com/users/670642326661496866",
      icon: "discord"
    }
  ]

  return (
      <div className={"flex space-x-4"}>
        {
          socialNetworks.map((network, index) => {
            return (
                <Link key={index} href={network.link} target={"_blank"}>
                  <Image src={`/icons/${network.icon}.svg`} width={20} height={20} alt={network.name}/>
                </Link>
            )
          })
        }
      </div>

  )
}