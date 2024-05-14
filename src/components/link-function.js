const LinkFunction = ({ reliability, trustOurExperienceAndSecu, imgSrc }) => {
  // const getImgObjectURL = (imgSrc) => {
  //   if (imgSrc) {
  //     return 'url(\''+imgSrc+'\')'
  //   }
  //   return `url('https://via.placeholder.com/150')`

  // }
  console.log("imgSrc", imgSrc, "url('" + imgSrc + "')");
  const imgStyle = {
    backgroundImage: "url(" + imgSrc + ")",
    backgroundSize: "cover",
    backgroundRepeat: "150%",

  };
  return (
    <div
      // style={{backgroundImage:getImgObjectURL()}}
      style={imgStyle}
      className={`  w-72 h-96 p-0 bg-no-repeat flex flex-col items-center justify-center text-left text-5xl text-secondary font-body-small`}
    >
      <div
        
        className="text-left h-[90%] w-[90%] ml-[5%] bg-cover bg-center flex flex-col items-start justify-end gap-2 -mt-5 px-5 py-4 "
      >
        <div className="pt-8 inline-block text-white font-semibold ">
          {reliability}
        </div>
        <div className=" text-xl text-white font-medium text-left">
          {trustOurExperienceAndSecu}
        </div>
      </div>
    </div>
  );
};

export default LinkFunction;
