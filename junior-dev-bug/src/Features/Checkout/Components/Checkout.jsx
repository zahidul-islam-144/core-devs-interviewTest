import React from "react";
import { useForm } from "react-hook-form";
import { useGlobalCtx } from "../../../Contexts/GlobalProvider";
import Contact from "./Contact";
import Order from "./Order";

export default function Checkout() {
  const { register, handleSubmit } = useForm();
  const { getPayment, totalPrice } = useGlobalCtx();
  const onSubmit = async (data) => {
    const getPaymentUrl = await getPayment(data);

    if(await  getPaymentUrl?.data){

      console.log("💛data:",await  getPaymentUrl?.data);

      window.open(
        getPaymentUrl?.data, "_blank");
    }

  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-12 gap-x-8 py-12">
        <div className="max-sm:col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-7 ">
          <Contact register={register} />
        </div>
        <div className="max-sm:col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-5 ">
          <Order />
        </div>
      </div>
    </form>
  );
}
