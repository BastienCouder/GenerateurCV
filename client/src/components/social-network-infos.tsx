import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";

interface SocialNetworksInfosProps {
  form: any; // Remplacez 'any' par le type approprié
}

const initialSocialNetworks = [
  { network: "LinkedIn", value: "" },
  { network: "GitHub", value: "" },
  { network: "Instagram", value: "" },
  { network: "Website", value: "" },
];

export default function SocialNetworksInfos({
  form,
}: SocialNetworksInfosProps) {
  return (
    <div className="space-y-4 lg:w-1/2 xl:w-1/3">
      {initialSocialNetworks.map((networkField) => (
        <FormField
          key={networkField.network}
          control={form.control}
          name={`socialnetworks.${networkField.network.toLowerCase()}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{networkField.network} (optionnel)</FormLabel>
              <FormControl>
                <Input
                  placeholder={`Entre ton ${networkField.network}`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
