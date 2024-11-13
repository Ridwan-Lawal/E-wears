import PaymentForm from "@/app/_components/product-cart/PaymentForm";

export const metadata = {
  title: "Checkout Payment",
};

export default function Page() {
  return (
    <div className="w-full">
      <PaymentForm />
    </div>
  );
}
