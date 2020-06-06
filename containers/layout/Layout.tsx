import React, { ReactNode } from "react";
import Head from "next/head";
import Navbar from "./navbar/Navbar";
interface Props {
  children?: ReactNode;
  title?: string;
  description?: string;
}
const Layout: React.FC<Props> = ({ children, title, description }) => (
  <>
    <Head>
      <title>
        {title ?? "Find out the hottest trending topics"} | Trending Topics
      </title>
      <meta
        name="description"
        content={
          description ??
          "Need some new ideas? Find out new topics for conversations, content creation,  or anything you need topics for"
        }
      ></meta>
      <link
        href="https://fonts.googleapis.com/css2?family=Mukta:wght@500&display=swap"
        rel="stylesheet"
      ></link>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
    </Head>
    <Navbar />
    <div className="container">{children}</div>
  </>
);

export default Layout;
