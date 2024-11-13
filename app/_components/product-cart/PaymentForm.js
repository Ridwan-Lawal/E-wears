"use client";

import { IoCardOutline } from "react-icons/io5";

import { useFormState } from "react-dom";
import { paymentAction } from "@/app/_lib/actions";
import { useFormStatus } from "react-dom";

function PaymentForm() {
  const [state, formAction, isPending] = useFormState(paymentAction, {
    message: "",
  });

  return (
    <form action={formAction} className=" py-8 px-4">
      <legend className="text-lg font-semibold text-gray-800">
        Your card details
      </legend>

      <div className="space-y-8 mt-8">
        <div>
          <div className="payment-block">
            <IoCardOutline className="text-xl text-gray-500" />
            <input
              type="text"
              name="card-number"
              id="card-number"
              placeholder="Card Number"
              className=""
              maxLength="16"
            />
          </div>

          <div id="card-number-error" aria-live="polite" aria-atomic="true">
            {state?.["card-number"] &&
              state?.["card-number"]?.map((error) => (
                <p className="text-[11px] mt-2 text-red-600 italic" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div>
          <div className="payment-block">
            <input
              type="text"
              name="card-name"
              id="card-name"
              placeholder="Card Name"
              className=""
            />
          </div>

          <div id="card-name-error" aria-live="polite" aria-atomic="true">
            {state?.["card-name"] &&
              state?.["card-name"]?.map((error) => (
                <p className="text-[11px] mt-2 text-red-600 italic" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-[50%]">
            <div className="payment-block w-full">
              <input
                type="text"
                name="expiry-date"
                id="expiry-date"
                placeholder="Expiry Date (MM / YY)"
                maxLength="5"
                className=""
              />
            </div>

            <div id="expiry-date-error" aria-live="polite" aria-atomic="true">
              {state?.["expiry-date"] &&
                state?.["expiry-date"]?.map((error) => (
                  <p
                    className="text-[11px] mt-2 text-red-600 italic"
                    key={error}
                  >
                    {error}
                  </p>
                ))}
            </div>
          </div>

          <div className="w-[50%]">
            <div className="payment-block w-full">
              <IoCardOutline className="text-xl text-gray-500" />
              <input
                type="text"
                name="cvv"
                id="cvv"
                maxLength="3"
                placeholder="CVV"
                className="w-full"
              />
            </div>

            <div id="cvv-error" aria-live="polite" aria-atomic="true">
              {state?.["cvv"] &&
                state?.["cvv"]?.map((error) => (
                  <p
                    className="text-[11px] mt-2 text-red-600 italic"
                    key={error}
                  >
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>

      <FormButton />
    </form>
  );
}

export default PaymentForm;

export function FormButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className={` text-white font-medium text-sm py-3 px-8 w-full rounded-md mt-12 hover:bg-lightBlue transition-colors texty ${
        pending ? "bg-lightBlue" : "bg-indigo"
      } `}
    >
      {pending ? "Proceeding to pay..." : " Proceed to pay"}
    </button>
  );
}
