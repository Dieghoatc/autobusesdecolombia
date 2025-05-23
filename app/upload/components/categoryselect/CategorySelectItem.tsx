import { SelectItem } from "@/app/components/ui/select";

interface CategorySelectItemProps {
  item: string;
}

export default function CategorySelectItem({ item }: CategorySelectItemProps) {
  return (
    <>
      <SelectItem value={item}>{item}</SelectItem>
    </>
  );
}
