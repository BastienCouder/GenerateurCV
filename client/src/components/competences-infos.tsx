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

interface CompetencesInfosProps {
  form: any; // Remplacez 'any' par le type approprié
  competenceFields: any;
  setCompetenceFields: any;
}

export default function CompetencesInfos({
  form,
  competenceFields,
  setCompetenceFields,
}: CompetencesInfosProps) {
  const addCompetenceField = () => {
    if (competenceFields.length < 10) {
      setCompetenceFields([
        ...competenceFields,
        { id: competenceFields.length + 1 },
      ]);
    }
  };

  const removeCompetenceField = (idToRemove: number) => {
    setCompetenceFields(
      competenceFields.filter((field: any) => field.id !== idToRemove)
    );
  };

  const renderCompetences = () => {
    return competenceFields.map((field: any, index: number) => (
      <div key={field.id} className="flex gap-x-4  items-end">
        {competenceFields.length > 1 && (
          <div
            onClick={() => removeCompetenceField(field.id)}
            className="cursor-pointer"
          >
            <X size={15} />
          </div>
        )}
        <FormField
          control={form.control}
          name={`competences[${index}]`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Compétence</FormLabel>
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
      {renderCompetences()}
      {competenceFields.length < 10 && (
        <Button type="button" onClick={addCompetenceField}>
          Ajouter une compétence
        </Button>
      )}
    </div>
  );
}
