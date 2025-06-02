import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact",
  description: "This is my contact page",
  openGraph: {
    title: "Contact",
    description: "This is my contact page",
    images: {
      url: "/pitch.jpg",
    },
  },
};

const page = () => {
  return (
    <>
      <h1>Contact</h1>
      <p>
        We are contact. We are contact. We are contact. We are contact. We are
        contact. We are contact. We are contact. We are contact. We are contact.
        We are contact. We are contact. We are contact. We are contact. We are
        contact. We are contact. We are contact.{" "}
      </p>
    </>
  );
};
export default page;
