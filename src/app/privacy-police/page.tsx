import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="container mx-auto max-w-[1080px] py-20 text-[#EBE3D8]">
      <h1 className="text-[34px] font-semibold font-quicksand mb-5 text-center">
        Privacy Policy for Coco Timer
      </h1>
      <p className="text-[14px] mb-3">
        <b>Effective Date:</b> 27 september 2024
      </p>
      <p className="text-[24px] font-semibold font-quicksand mb-5">
        1. Introduction
      </p>
      <p className="text-[18px] mb-5">
        Welcome to Coco Timer. We value your privacy and are committed to
        protecting your personal information. This Privacy Policy explains how
        we collect, use, disclose, and safeguard your information when you use
        our application and services.
      </p>
      <p className="text-[24px] font-semibold font-quicksand mb-5">
        2. Information We Collect
      </p>
      <p className="text-[18px] mb-5">
        We may collect the following types of information when you use Coco
        Timer:
      </p>
      <ul className="text-[18px] list-disc mb-5 ml-8">
        <li>
          <b>Personal Information:</b> We do not require any personal
          information to use our timer. However, if you choose to provide
          feedback or contact us, we may collect your name and email address.
        </li>
        <li>
          <b>Usage Data:</b> We may collect information about how you use the
          application, including your device type, IP address, operating system,
          browser type, and usage patterns.
        </li>
      </ul>
      <p className="text-[24px] font-semibold font-quicksand mb-5">
        3. How We Use Your Information
      </p>
      <p className="text-[18px] mb-5">
        We may use the information we collect for various purposes, including:
      </p>
      <ul className="text-[18px] list-disc mb-5 ml-8">
        <li>To provide and maintain our services.</li>
        <li>To improve and personalize your experience with Coco Timer.</li>
        <li>
          To communicate with you, including responding to your inquiries.
        </li>
        <li>
          To monitor the usage of the application and detect technical issues.
        </li>
      </ul>
      <p className="text-[24px] font-semibold font-quicksand mb-5">
        4. Sharing Your Information
      </p>
      <p className="text-[18px] mb-5">
        We do not sell, trade, or otherwise transfer your personal information
        to outside parties. We may share your information in the following
        situations:
      </p>
      <ul className="text-[18px] list-disc mb-5 ml-8">
        <li>
          <b>With Service Providers:</b> We may share your information with
          third-party service providers to help us operate our application and
          services.
        </li>
        <li>
          <b>For Legal Reasons:</b> We may disclose your information if required
          to do so by law or in response to valid requests by public
          authorities.
        </li>
      </ul>
      <p className="text-[24px] font-semibold font-quicksand mb-5">
        5. Security of Your Information
      </p>
      <p className="text-[18px] mb-5">
        We take the security of your information seriously and implement
        reasonable measures to protect it. However, please remember that no
        method of transmission over the Internet or method of electronic storage
        is 100% secure, and we cannot guarantee its absolute security.
      </p>
      <p className="text-[24px] font-semibold font-quicksand mb-5">
        6. Links to Other Websites
      </p>
      <p className="text-[18px] mb-5">
        Coco Timer may contain links to other websites that are not operated by
        us. If you click on a third-party link, you will be directed to that
        third party&apos;s site. We strongly advise you to review the Privacy
        Policy and terms of service of any third-party site you visit.
      </p>
      <p className="text-[24px] font-semibold font-quicksand mb-5">
        7. Children’s Privacy
      </p>
      <p className="text-[18px] mb-5">
        Coco Timer is not intended for use by children under the age of 13. We
        do not knowingly collect personal information from children under 13. If
        you are a parent or guardian and you are aware that your child has
        provided us with personal information, please contact us.
      </p>
      <p className="text-[24px] font-semibold font-quicksand mb-5">
        8. Changes to This Privacy Policy
      </p>
      <p className="text-[18px] mb-5">
        We may update our Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page. You are
        advised to review this Privacy Policy periodically for any changes.
      </p>
      <p className="text-[24px] font-semibold font-quicksand mb-5">
        9. Contact Us
      </p>
      <p className="text-[18px] mb-5">
        If you have any questions about this Privacy Policy, please contact us:
      </p>
      <ul className="text-[18px] list-disc mb-5 ml-8">
        <li>
          Email: <b>fndigitalcode@gmail.com</b>
        </li>
        <li>
          Website:{" "}
          <Link href={"/"} className="hover:text-blue-600">
            cocotimer.com
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default page;
