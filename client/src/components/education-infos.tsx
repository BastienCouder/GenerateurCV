import { X } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "./ui/button";

interface EducationsInfosProps {
  form: any; // Remplacez 'any' par le type approprié si vous avez un type spécifique pour votre formulaire
  educationFields: any;
  setEducationFields: any;
}

export default function EducationsInfos({
  form,
  educationFields,
  setEducationFields,
}: EducationsInfosProps) {
  const addEducationField = () => {
    if (educationFields.length < 3) {
      setEducationFields([
        ...educationFields,
        { index: educationFields.length + 1 },
      ]);
    }
  };
  const removeExperienceField = (idToRemove: number) => {
    setEducationFields(
      educationFields.filter((field: any) => field.index !== idToRemove)
    );
  };
  const renderEducationFields = () => {
    return educationFields.map((field: any, index: number) => (
      <div key={field.id} className="flex gap-x-4  items-end">
        {educationFields.length > 1 && (
          <div
            onClick={() => removeExperienceField(field.index)}
            className="cursor-pointer"
          >
            <X size={15} />
          </div>
        )}
        <FormField
          control={form.control}
          name={`educations[${index}].diplome`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diplôme</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`educations[${index}].date`}
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
        <FormField
          control={form.control}
          name={`educations[${index}].lieu`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lieu</FormLabel>
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
        {renderEducationFields()}
        {educationFields.length < 3 && (
          <Button type="button" onClick={addEducationField}>
            Ajouter une formation
          </Button>
        )}
      </div>
    </>
  );
}
