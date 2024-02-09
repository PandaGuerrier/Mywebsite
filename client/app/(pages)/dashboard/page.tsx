'use client'
import React, { useEffect } from 'react'
import AnnounceComponent from '@/app/components/AnnounceComponent'
import Spline from '@splinetool/react-spline'
import BlurBallComponent from '@/app/components/BlurBall'
import { Button, Card, CardBody, Link, Image } from '@nextui-org/react'
import { Glow, GlowCapture } from '@codaworks/react-glow'
import { CardFooter } from '@nextui-org/card'
import { getProjects } from '@/functions/getProjects/getProjects'
import { Project } from '@/types/Project'

export default function Dashboard() {
  const links = [
    {
      name: 'Home',
      description: 'Go to the home page',
      link: '/dashboard'
    },
    {
      name: 'Projects',
      description: 'Manage projects',
      link: '/dashboard/projects'
    },
    {
      name: 'Users',
      description: 'Manage users',
      link: '/dashboard/users'
    },
    {
      name: 'Settings',
      description: 'Manage the website settings',
      link: '/dashboard/settings'
    },
  ]

  return (
      <div className={"w-full flex justify-center"}>


      <div className={"w-[1200px] h-full "}>
        <GlowCapture>
          <div className="grid grid-cols-3 gap-7 text-center">
            {links.map((item, index) => (
                <Glow color={"purple"}>
                  <Card className="w-[400px] glow:bg-glow/10 border border-gray-500 glow:border-glow pt-5">
                    <div>
                      <h3 className="text-lg font-bold">{item.name}</h3>
                      <p className="text-sm">{item.description}</p>
                    </div>

                    {
                        item.link && (
                            <CardFooter className="text-small w-full">
                              <Link href={item.link} className={"w-full"}>
                                <Button fullWidth color="primary" variant="flat" radius="full">
                                  Go to {item.name}
                                </Button>
                              </Link>
                            </CardFooter>
                        )
                    }
                  </Card>
                </Glow>


            ))}
          </div>
        </GlowCapture>
      </div>
      </div>
  )
}
