import React from "react";
import Image from "next/image";

const CloudinaryExample = () => {
  return (
    <div>
      <Image
        src={"https://akbarrich.s3.eu-north-1.amazonaws.com/doc.png"}
        width={440}
        height={510}
        alt=""
      />
    </div>
  );
};

export default CloudinaryExample;
