import { PropsWithChildren } from "react"
import DesktopNavbar from "./DesktopNavbar"
import MobileNavbar from "./MobileNavbar"

type Props = PropsWithChildren
const NavbarConrtainer = (props: Props) => {
  return (
    <div className="relative">
        <DesktopNavbar>{props.children}</DesktopNavbar>
        <MobileNavbar>{props.children}</MobileNavbar>
    </div>
    
  )
}

export default NavbarConrtainer
