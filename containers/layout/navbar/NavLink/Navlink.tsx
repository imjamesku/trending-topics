import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {
    href: string;
    children: any;
    activeClassName: string;
}

const NavLink =  ({ href, children, activeClassName}: Props) => {
  const router = useRouter()
  let className = children.props.className || ''
  if (router.pathname === href) {
    className = `${className} ${activeClassName}`
  }

  return <Link href={href}>{React.cloneElement(children, { className })}</Link>
}

NavLink.defaultProps = {
    activeClassName: 'selected'
} as Partial<Props>

export default NavLink