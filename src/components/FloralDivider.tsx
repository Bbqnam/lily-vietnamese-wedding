import floralDivider from "@/assets/floral-divider.png";

const FloralDivider = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center py-8 ${className}`}>
    <img
      src={floralDivider}
      alt=""
      className="w-48 md:w-64 opacity-40"
      loading="lazy"
      width={1024}
      height={512}
    />
  </div>
);

export default FloralDivider;
