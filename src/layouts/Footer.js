import logoGray from "../resources/logoGray.png"
import vk from "../resources/vk-logo.png"
import yt from "../resources/yt-logo.png"
import "./Footer.css"

function SocialLink() {
    const links = [{img: vk, link: "https://vk.com/mountainnsu"}, {
        img: yt, link: "https://www.youtube.com/c/MountainNSUclub"
    }]
    return <div className="socialLinks__wrapper">
        {links.map((link) => {
            return <div key={link.link}>
                <a href={link.link}>
                    <img src={link.img} alt="Error" />
                </a>
            </div>
        })}
    </div>
}

function Footer() {
    return (<div className="footer__wrapper">
        <div className="identity__wrapper">
            <img src={logoGray} style={{width: "100px"}} alt="Error"/>
            <SocialLink />
            <p style={{color: "white", fontWeight: "200", textAlign: "left"}}>©NSU mountain network</p>
        </div>
    </div>)
}

export default Footer