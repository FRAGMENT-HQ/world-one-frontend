const LinkFunction = ({ reliability, trustOurExperienceAndSecu, imgSrc }) => {
  const imgStyle = {
    backgroundImage: "url(" + imgSrc + ")",
    backgroundSize: "cover",
    backgroundRepeat: "150%",
  };
  return (
    <div
      // style={{backgroundImage:getImgObjectURL()}}
      style={imgStyle}
      className={`w-[19rem] h-96 tablet:w-[19.5vw] tablet:h-[25vw]  mw-80 h-96 p-0 bg-no-repeat flex flex-col items-center justify-center text-left text-5xl text-secondary font-body-small  `}
    >
      <div className=" relative text-left ml-4 h-[90%] w-[90%] text-5xl tablet:text-[1.7vw] flex flex-col items-start justify-end gap-2 -mt-5  py-4 ">
        <div className="pt-8 inline-block text-white font-semibold px-3 ">
          {reliability}
        </div>
        <div className=" text-xl tablet:text-[1.2vw] text-white font-medium text-left px-3">
          {trustOurExperienceAndSecu}
        </div>
      </div>
    </div>
  );
};

export default LinkFunction;
