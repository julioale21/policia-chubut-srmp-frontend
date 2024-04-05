import React from "react";

import { useQuery } from "@tanstack/react-query";
import instance from "../../config/axios";

async function getMoviles() {
  const res = await instance.get("/moviles");
  return res.data;
}

const OtherComponent = () => {
  const { data } = useQuery({
    queryKey: ["moviles"],
    queryFn: getMoviles,
  });

  return <div>OtherComponent</div>;
};

export default OtherComponent;
