import {
  FaFacebookMessenger,
  FaTwitter,
  FaLinkedinIn,
  FaFacebookF,
  FaArrowUp,
  FaPhoneAlt,
  FaMapMarkerAlt 
} from "react-icons/fa";
import logo from "../../assets/image/logo-removebg-preview.png";
import { IoIosMail } from "react-icons/io";
const socialLinks = [
  {
    name: "LinkedIn",
    link: "/",
    icon: <FaLinkedinIn className="size-6" />,
  },
  {
    name: "X",
    link: "/",
    icon: <FaTwitter className="size-6" />,
  },
  {
    name: "Facebook",
    link: "/",
    icon: <FaFacebookF className="size-6" />,
  },
  {
    name: "mess",
    link: "/",
    icon: <FaFacebookMessenger className="size-6" />,
  },
];

const support = {
  title: "Support",
  items: [
    { label: "Contact", href: "" },
    { label: "FAQs", href: "" },
    { label: "Pricing Plans", href: "" },
    { label: "Sitemap", href: "" },
  ],
};

const quickLinks = {
  title: "Quick Links",
  items: [
    { label: "Jobs", href: "" },
    { label: "Courses", href: "" },
    { label: "Paid Training", href: "" },
    { label: "Blog", href: "" },
  ],
};

const category = {
  title: "Category",
  items: [
    { label: "Graphics", href: "" },
    { label: "Programming", href: "" },
    { label: "eCommerce", href: "" },
    { label: "Freelancing", href: "" },
  ],
};

const contact = {
  address: "43 Cao Thắng, Thanh bình, Hải Châu, Đà Nẵng.",
  phone: "Phone: +84 966 948 914",
  email: "levanthang230902@gmail.com",
};

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#191F33]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-6 py-16 sm:grid-cols-[40fr_30fr_30fr] md:grid-cols-[40fr_30fr_30fr_30fr]">
          <div className="">
            <a href="/" className="mb-8 flex items-center gap-5 text-white">
              <img src={logo} className="h-20 w-auto" alt="Logo" />
            </a>
            <address className="mt-3 text-lg font-normal text-gray-300">
            <div className="flex mt-2 items-center ">
                <FaMapMarkerAlt  IosMail className="text-2xl  text-white " />
                <p className="px-4 m-0"> {contact.address}</p>
              </div>
              <div className="flex mt-3 items-center ">
                <FaPhoneAlt  className="text-2xl  text-white " />
                <p className="px-4 text-center m-0"> {contact.phone}</p>
              </div>
              <div className="flex mt-3 items-center ">
                <IoIosMail className="text-2xl  text-white " />
                <p className="px-4 text-center m-0"> {contact.email}</p>
              </div>
            </address>
          </div>
          <div>
            <h6 className="mb-7 text-xl text-white">{support.title}</h6>
            <ul>
              {support.items.map(({ label, href }) => (
                <li
                  key={label}
                  className="mt-3 text-base font-normal text-[#0cc0df]  transition-all duration-150 ease-in hover:text-white hover:underline hover:decoration-[#00AAFF] hover:underline-offset-8"
                >
                  <a href={href} className="text-[#0cc0df] no-underline ">{label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h6 className="mb-7 text-xl text-white">{quickLinks.title}</h6>
            <ul>
              {quickLinks.items.map(({ label, href }) => (
                <li
                  key={label}
                  className="mt-3 text-base font-normal text-[#0cc0df]  transition-all duration-150 ease-in hover:text-white hover:underline hover:decoration-[#00AAFF] hover:underline-offset-8"
                >
                  <a href={href} className="text-[#0cc0df] no-underline ">{label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h6 className="mb-7 text-xl text-white">{category.title}</h6>
            <ul>
              {category.items.map(({ label, href }) => (
                <li
                  key={label}
                  className="mt-3 text-base font-normal  transition-all duration-150 ease-in hover:text-white hover:underline hover:decoration-[#00AAFF] hover:underline-offset-8"
                >
                  <a href={href} className="text-[#0cc0df] no-underline ">{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="relative bg-[#2E3447]">
        <button
          onClick={scrollToTop}
          className="absolute -top-7 right-8 flex size-14 items-center justify-center rounded-full border-[6px] border-[#191F33] bg-[#0cc0df]  md:right-16"
        >
          <FaArrowUp color="#fff" size={22} />
        </button>
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-3 md:flex-row md:justify-between">
          <p className="text-center text-[#0cc0df]  m-0">
            DevJobs © 2024. Developed by{" "}
            <span className="text-white">Thang Le Van</span>
          </p>
          <ul className="flex items-center gap-6 m-0">
            {socialLinks.map(({ name, icon, link }) => (
              <li key={name}>
                <a
                  href={link}
                  title={name}
                  className="text-[#0cc0df]  hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {icon}
                </a>
                <span className="sr-only">{name} account</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
