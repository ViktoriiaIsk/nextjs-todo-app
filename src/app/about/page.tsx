import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About",
  description: "This is my About page",
  openGraph: {
    title: "About",
    description: "This is my About page",
    images: {
      url: "/pitch.jpg",
    },
  },
};
export const revalidate = 10;
const page = () => {
  return (
    <>
      <h1>about</h1>
      <h2>{new Date().toLocaleString()}</h2>
      <p>
        We are About. We are About. We are About. We are About. We are About. We
        are About. We are About. We are About. We are About. We are About. We
        are About. We are About. We are About. We are About. We are About. We
        are About. We are About. We are About. We are About. We are About. We
        are About. We are About. We are About. We are About. We are About. We
        are About. We are About.
      </p>
    </>
  );
};
export default page;
