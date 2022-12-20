import logo from "../assets/e-summit-logo.png";
import socialMedia from "../assets/social-media.png";
import Image from "next/image";

const Footer: React.FC = () => {
	return (
		<footer className="flex w-full h-fit p-12 sm:p-20 justify-between">
			<div className="flex flex-col w-full text-sm gap-5">
				<Image className="-m-7" draggable={false} alt="" src={logo} />
				<div className="flex flex-col md:flex-row w-full gap-5">
					<div className="flex flex-col gap-5">
						<p className="text-white/50">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
						</p>
						<div className="flex justify-start">
							<p>FOLLOW US</p>
							<Image className="-ml-12 h-4 object-contain" draggable={false} alt="" src={socialMedia} />
						</div>
					</div>
					<div className="shrink-0 flex flex-col gap-5 whitespace-nowrap">
						<p className="text-white/50">Learn More About E-SUMMIT&#39;23</p>
						<div className="flex flex-wrap gap-2">
							<a>BLOG</a>
							<a>ABOUT</a>
							<a>PRIVACY</a>
							<a>TERMS</a>
							<a>CONTACT US</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer;