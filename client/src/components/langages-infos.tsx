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

interface LanguagesInfosProps {
  form: any; // Remplacez 'any' par le type approprié
  languageFields: any;
  setLanguageFields: any;
}

export default function LanguagesInfos({
  form,
  languageFields,
  setLanguageFields,
}: LanguagesInfosProps) {
  const addLanguageField = () => {
    if (languageFields.length < 3) {
      setLanguageFields([
        ...languageFields,
        { index: languageFields.length + 1 },
      ]);
    }
  };

  const removeLanguageField = (idToRemove: number) => {
    setLanguageFields(
      languageFields.filter((field: any) => field.index !== idToRemove)
    );
  };

  const renderLanguageFields = () => {
    return languageFields.map((field: any, index: number) => (
      <div key={field.id} className="flex gap-x-4">
        {languageFields.length > 1 && (
          <div
            onClick={() => removeLanguageField(field.index)}
            className="cursor-pointer"
          >
            <X size={15} />
          </div>
        )}
        <FormField
          control={form.control}
          name={`languages[${index}].language`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Langue</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`languages[${index}].level`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Niveau</FormLabel>
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
      {renderLanguageFields()}
      {languageFields.length < 3 && (
        <Button type="button" onClick={addLanguageField}>
          Ajouter une langue
        </Button>
      )}
    </div>
  );
}
