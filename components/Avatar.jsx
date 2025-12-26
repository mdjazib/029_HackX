import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Avatar = ({ css, img = "", url = "#" }) => {
    return (
        <Link href={url} className={css.avatar}>
            {
                img ? <Image src={"/avatar.png"} alt='user' width={50} height={50} /> :
                    <div hidden className={css.dummy_svg}>
                        <div className={css.avatar_head_svg}></div>
                        <div className={css.avatar_body_svg}></div>
                    </div>
            }
        </Link>
    )
}

export default Avatar