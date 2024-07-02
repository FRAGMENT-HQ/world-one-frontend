
import Smodal from "@/components/smodal";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { getBlogMutation } from "@/hooks/blogs";
import Navbar from "@/components/navbar";
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo';

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

const Frame11 = () => {
  const [content, setContent] = useState();
  const width = useWindowSize().width;
  const [open, setOpen] = useState(false);
  const router = useRouter()
  const { mutate } = getBlogMutation(
    (res) => {
      setContent(res?.data);
    },
    (err) => {
      
    }
  );

  useEffect(() => {
    mutate(router.query.id);
  }, [router.query.id]);




  return (
    <div className="w-full relative bg-background flex flex-col items-center justify-start pt-[3rem] px-[8%] laptop:px-[120px] pb-[10rem] box-border gap-[2.75rem] leading-[normal] tracking-[normal] mq900:gap-[1.375rem]">
      <Smodal open={open} setOpen={setOpen} />
      <NextSeo
      title={content?.title}
      description={content?.mini_content}
      />

      <Navbar />
      <div className="w-full  box-border flex flex-row items-start justify-start py-0 px-[21px] max-w-full text-text2 border-0 border-l-[5px] border-solid border-secondary">
        <h1 className="m-0 flex-1 relative tex-3xl leading-[56px] font-semibold font-inherit inline-block max-w-full ">
          Blogs
        </h1>
      </div>
      {/* content */}
      <div className="w-full flex-col justify-start" >
      <h2>{content?.title}</h2>
      <img src={ width>600 ? content?.web_image : content?.mobile_image } className="w-full max-h-64" />
      <div dangerouslySetInnerHTML={{ __html: content?.content }} ></div>
      </div>
      


    </div>
  );
};

export default Frame11;
