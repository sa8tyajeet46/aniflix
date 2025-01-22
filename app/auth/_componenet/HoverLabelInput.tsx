import { Input } from "@/components/ui/input";
import React from "react";

type HoverLabelInputprops = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  id?: string;
  type: string;
};
function HoverLabelInput({
  value,
  onChange,
  label,
  id,
  type,
}: HoverLabelInputprops) {
  return (
    <div className="relative">
      <Input
        id={id}
        className="peer relative h-14 !py-3 text-md  !text-lg"
        placeholder=" "
        value={value}
        onChange={onChange}
        type={type}
      />
      <label className="absolute peer-placeholder-shown:top-1/2 top-0 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:left-3 left-0 peer-placeholder-shown:scale-100 scale-[65%] duration-150 transform text-zinc-400">
        {label}
      </label>
    </div>
  );
}

export default HoverLabelInput;
