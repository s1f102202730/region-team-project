"use client";

import { signIn, signOut } from "next-auth/react";
import { useSession } from 'next-auth/react'
import Image from "next/image"
import { useRouter } from "next/navigation";

export const LoginLogoutButton = ({ classStr }: { classStr?: string }) => {

  const { data: session } = useSession()
  return (
    <div className="flex">
      {session &&
        <div className="flex mr-7">
          {session?.user?.image && (
            <Image src={session?.user?.image} width="32" height="24" alt={session?.user?.name || ""} className="rounded-full mr-2" />
          )}
          <p className={classStr ? classStr : '' + ' text-white leading-loose'}>
            &nbsp;{session?.user?.name ?? 'guest'}&nbsp;様
          </p >
        </div>
      }
      {
        session ?
          (
            <button className="text-black bg-white rounded px-3 py-1" onClick={() => signOut()}>ログアウト</button>
          )
          : (
            <button className="text-black bg-white rounded px-3 !py-1" onClick={() => signIn()}>ログイン</button>
          )
      }
    </div>
  )
};