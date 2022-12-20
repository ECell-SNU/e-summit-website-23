import logo from "../assets/e-summit-logo.png";
import Image from "next/image";

const Footer: React.FC = () => {
	return (
		<footer className="flex w-full h-fit p-24 justify-between">
				<div className="flex flex-col w-1/3 text-sm gap-5">
					<Image className="-m-7" draggable={false} alt="" src={logo} />
					<p className="text-white/50">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
					</p>
					<div className="flex">
						<p>FOLLOW US</p>
							
					</div>
				</div>
				<div className="flex flex-col gap-5 pt-12">
					<p className="text-white/50">Learn More About E-SUMMIT&#39;23</p>
					<div className="flex gap-2">
						<a>BLOG</a>
						<a>ABOUT</a>
						<a>PRIVACY</a>
						<a>TERMS</a>
						<a>CONTACT US</a>
					</div>
				</div>
			</footer>
	)
}

export default Footer;