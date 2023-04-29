import { useRouter, useSearchParams } from "next/navigation";
import React, { FC } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const CategoryBox: FC<CategoryBoxProps> = ({ icon: Icon, label, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = () => {
    const currentQuery = params ? qs.parse(params.toString()) : {};
    const updatedQuery: any = { ...currentQuery, category: label };
    if (params?.get("category") === label) delete updatedQuery.category;
    const url = qs.stringifyUrl({ url: "/", query: updatedQuery }, { skipNull: true });
    router.push(url);
  };

  return (
    <div
      onClick={handleClick}
      className={`
      flex 
      flex-col 
      items-center
      gap-2
      p-3
      border-b-2
      hover:text-neutral-800
      transition
      cursor-pointer 
      ${selected ? "border-b-neutral-800" : "border-transparent"}
      ${selected ? "text-neutral-800" : "text-neutral-500"}
      `}>
      <Icon size='26' />
      <div className='font-medium text-sm'>{label}</div>
    </div>
  );
};

export default CategoryBox;
