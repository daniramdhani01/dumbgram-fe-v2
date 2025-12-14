import Image from 'next/image'
import Link from 'next/link'

type LogoNavigationProp = {
  className?: string;
}

export default function LogoNavigation({className = ""}:LogoNavigationProp) {
  return (
    <div className={className}>
      <Link href="/">
      <Image
        src="/logo.svg"
        alt="Dumbgram"
        width={119}
        height={39}
        />
      </Link>
    </div>
  )
}
