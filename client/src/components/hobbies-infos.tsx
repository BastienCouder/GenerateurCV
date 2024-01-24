import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface HobbiesInfosProps {
  form: any; // Remplacez 'any' par le type approprié
  hobbiesFields: any;
  setHobbiesFields: any;
}

export default function HobbiesInfos({
  form,
  hobbiesFields,
  setHobbiesFields,
}: HobbiesInfosProps) {
  const addHobbyField = () => {
    if (hobbiesFields.length < 3) {
      setHobbiesFields([...hobbiesFields, { index: hobbiesFields.length + 1 }]);
    }
  };

  const removeHobbyField = (idToRemove: number) => {
    setHobbiesFields(
      hobbiesFields.filter((field: any) => field.index !== idToRemove)
    );
  };

  const renderHobbies = () => {
    return hobbiesFields.map((field: any, index: number) => (
      <div key={field.id} className="flex gap-x-4 items-end">
        {hobbiesFields.length > 1 && (
          <div
            onClick={() => removeHobbyField(field.index)}
            className="cursor-pointer"
          >
            <X size={15} />
          </div>
        )}
        <FormField
          control={form.control}
          name={`hobbies[${index}]`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loisir</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    ));
  };

  return (
    <div className="space-y-4">
      {renderHobbies()}
      {hobbiesFields.length < 10 && (
        <Button type="button" onClick={addHobbyField}>
          Ajouter un loisir
        </Button>
      )}
    </div>
  );
}
