// add metadata
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Home",
  description: "This is my homepage",
  openGraph: {
    title: "Home",
    description: "This is my homepage",
    images: {
      url: "/pitch.jpg",
    },
  },
};

const page = () => {
  return (
    <>
      <h1>Home</h1>
      <p>
        We are home. We are home. We are home. We are home. We are home. We are
        home. We are home. We are home. We are home. We are home. We are home.
        We are home. We are home. We are home. We are home. We are home.{" "}
      </p>
    </>
  );
};
export default page;
