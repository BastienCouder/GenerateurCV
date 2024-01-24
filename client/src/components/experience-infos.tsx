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

interface ExperiencesInfosProps {
  form: any; // Remplacez 'any' par le type approprié
  experienceFields: any;
  setExperienceFields: any;
}

export default function ExperiencesInfos({
  form,
  experienceFields,
  setExperienceFields,
}: ExperiencesInfosProps) {
  const addExperienceField = () => {
    if (experienceFields.length < 3) {
      setExperienceFields([
        ...experienceFields,
        { index: experienceFields.length + 1 },
      ]);
    }
  };

  const removeExperienceField = (idToRemove: number) => {
    setExperienceFields(
      experienceFields.filter((field: any) => field.index !== idToRemove)
    );
  };

  const renderExperienceFields = () => {
    return experienceFields.map((field: any, index: number) => (
      <div key={field.id} className="flex gap-x-4 items-end">
        {experienceFields.length > 1 && (
          <div
            onClick={() => removeExperienceField(field.index)}
            className="cursor-pointer"
          >
            <X size={15} />
          </div>
        )}
        <FormField
          control={form.control}
          name={`experiences[${index}].description`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intitulé de Poste</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`experiences[${index}].lieu`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entreprise</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`experiences[${index}].date`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
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
    <>
      <div className="space-y-4">
        {renderExperienceFields()}
        {experienceFields.length < 3 && (
          <Button type="button" onClick={addExperienceField}>
            Ajouter une expérience
          </Button>
        )}
      </div>
    </>
  );
}
