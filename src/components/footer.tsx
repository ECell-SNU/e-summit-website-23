import logo from "../assets/e-summit-logo.png";
import socialMedia from "../assets/social-media.png";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="flex h-fit w-full justify-between p-12 sm:p-24">
      <div className="flex w-full flex-col gap-5 text-sm">
        <Image className="-m-7" draggable={false} alt="" src={logo} />
        <div className="flex w-full flex-col justify-between gap-5 md:flex-row">
          <div className="flex flex-col gap-5">
            <div className="flex justify-start">
              <p>FOLLOW US</p>
              <Image
                className="-ml-12 h-4 object-contain"
                draggable={false}
                alt=""
                src={socialMedia}
              />
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-5 whitespace-nowrap">
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
  );
};

export default Footer;
