const LinkFunction = ({ reliability, trustOurExperienceAndSecu, imgSrc }) => {
  // const getImgObjectURL = (imgSrc) => {
  //   if (imgSrc) {
  //     return 'url(\''+imgSrc+'\')'
  //   }
  //   return `url('https://via.placeholder.com/150')`

  // }
  const imgStyle = {
    backgroundImage: "url(" + imgSrc + ")",
    backgroundSize: "cover",
    backgroundRepeat: "150%",

  };
  return (
    <div
      // style={{backgroundImage:getImgObjectURL()}}
      style={imgStyle}
      className={`w-80 h-96 tablet:w-[20vw] tablet:h-[24vw]  mw-80 h-96 p-0 bg-no-repeat flex flex-col items-center justify-center text-left text-5xl text-secondary font-body-small`}
    >
      <div
        
        className="text-left ml-4 h-[90%] w-[190%] text-5xl tablet:text-[2vw]  flex flex-col items-start justify-end gap-2 -mt-5 px-12 py-4 "
      >
        <div className="pt-8 inline-block text-white font-semibold ">
          {reliability}
        </div>
        <div className=" text-xl tablet:text-[1.5vw] text-white font-medium text-left">
          {trustOurExperienceAndSecu}
        </div>
      </div>
    </div>
  );
};

export default LinkFunction;
