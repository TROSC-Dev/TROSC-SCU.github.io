import React from "react";
import { Phone, Mail } from "lucide-react";
import ContactUsForm from "../components/ContactUsForm";

const ContactUsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F4F4F4] pt-20 font-[Poppins]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-16">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          <div className="lg:w-5/12 flex flex-col">


            <h1 className="font-bold text-[55px] leading-[1.4] text-black mt-8 mb-6">
              Get in Touch
            </h1>

            <h2 className="font-semibold text-[25px] leading-[1.5] text-black mb-4">
              Contact Us
            </h2>

            <p className="font-normal text-[22px] leading-[1.5] text-black mb-10 max-w-[414px]">
              Got a question or an idea? We're more than a team — we're a family
              that listens and supports. Reach out anytime, and let's turn your
              message into the start of something great.
            </p>

            <div className="flex flex-col gap-4">

              <a
                href="tel:01023456789"
                className="flex items-center gap-3 group w-fit"
                aria-label="Call us"
              >
                <span className="flex items-center justify-center w-7 h-7 text-black group-hover:text-primary transition-colors duration-200">
                  <Phone size={22} strokeWidth={2} />
                </span>
                <span className="font-semibold text-base text-black group-hover:text-primary transition-colors duration-200">
                  01023456789
                </span>
              </a>

              <a
                href="mailto:trosc@gmail.com"
                className="flex items-center gap-3 group w-fit"
                aria-label="Email us"
              >
                <span className="flex items-center justify-center w-7 h-7 text-black group-hover:text-primary transition-colors duration-200">
                  <Mail size={22} strokeWidth={2} />
                </span>
                <span className="font-semibold text-[18px] text-black group-hover:text-primary transition-colors duration-200">
                  trosc@gmail.com
                </span>
              </a>
            </div>
          </div>

          <div className="lg:w-7/12">
            <ContactUsForm />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
