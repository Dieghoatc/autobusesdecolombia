import { ChangeEvent } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InputFileProps {
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function InputFile({handleChange}: InputFileProps) {
  return (
    <div>
      <Label htmlFor="picture">Cargar fotografia</Label>
      <Input id="picture" type="file" onChange={handleChange} />
    </div>
  )
}
